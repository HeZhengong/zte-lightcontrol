package cn.stylefeng.guns.modular.asset.controller;

import cn.stylefeng.guns.modular.asset.entity.AssetTableEntity;
import cn.stylefeng.guns.modular.asset.entity.GroupEntity;
import cn.stylefeng.guns.modular.asset.service.AssetTableService;
import cn.stylefeng.guns.modular.asset.service.GroupService;
import cn.stylefeng.roses.core.reqres.response.ResponseData;
import cn.stylefeng.roses.core.reqres.response.SuccessResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;

/**
 * @Description 资产管理 controller
 * @Author zzb
 * @Date 2020/4/13 17:43
 **/
@Controller
@RequestMapping("/asset")
public class AssetController {

    @Autowired
    private GroupService service;

    @Autowired
    private AssetTableService tableService;

    private final String PREFIX = "/assetmanager/";

    @RequestMapping("")
    public String index() {
        return PREFIX + "assetmanager.html";
    }

    /**
     * 分组 初始化
     */
    @ResponseBody
    @RequestMapping("/selectList/group")
    public ResponseData selectListGroup() {
        return new SuccessResponseData(
                ResponseData.DEFAULT_SUCCESS_CODE,
                ResponseData.DEFAULT_SUCCESS_MESSAGE,
                service.selectList());
    }


    /**
     * 添加 组 记录
     * @param entity
     * @return
     */
    @ResponseBody
    @RequestMapping("/add/group")
    public ResponseData addGroup(GroupEntity entity) {
        return new SuccessResponseData(
                ResponseData.DEFAULT_SUCCESS_CODE,
                ResponseData.DEFAULT_SUCCESS_MESSAGE,
                service.insertOne(entity));
    }

    /**
     * 根据 id 查询 当前 组的信息
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping("/selectGroupById/group")
    public ResponseData selectGroupById(@RequestParam("id") String id) {
        return new SuccessResponseData(
                ResponseData.DEFAULT_SUCCESS_CODE,
                ResponseData.DEFAULT_SUCCESS_MESSAGE,
                service.selectOne(id));
    }

    /**
     * 根据 id 查询 更新 组的信息
     * @param entity
     * @return
     */
    @ResponseBody
    @RequestMapping("/updateGroupById/group")
    public ResponseData updateGroupById(GroupEntity entity) {
        return new SuccessResponseData(
                ResponseData.DEFAULT_SUCCESS_CODE,
                ResponseData.DEFAULT_SUCCESS_MESSAGE,
                service.updateOne(entity));
    }


    /**
     * 根据 id 删除组 和 组的 子级
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping("/delGroupById/group")
    public ResponseData delGroupById(@RequestParam("id") String id) {

        return new SuccessResponseData(
                ResponseData.DEFAULT_SUCCESS_CODE,
                ResponseData.DEFAULT_SUCCESS_MESSAGE,
                service.delGroupById(id));
    }


    /**
     * 得到 默认的组 id 规则是 最开始 建 table 的那组 是默认组
     * @return
     */
    @ResponseBody
    @RequestMapping("/defaultTableId/group")
    public ResponseData defaultTableId() {
        return new SuccessResponseData(
                ResponseData.DEFAULT_SUCCESS_CODE,
                ResponseData.DEFAULT_SUCCESS_MESSAGE,
                tableService.defaultTableId());
    }

    /**
     * 添加 表格数据
     * @param entity
     * @return
     */
    @ResponseBody
    @RequestMapping("/add/table")
    public ResponseData addTable(AssetTableEntity entity) {

        return new SuccessResponseData(
                ResponseData.DEFAULT_SUCCESS_CODE,
                ResponseData.DEFAULT_SUCCESS_MESSAGE,
                tableService.insertOne(entity));
    }


    /**
     * 根据 具体的 组 id 得到 该组所有的 table 数据
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping("/selectList/table")
    public ResponseData selectListTable(@RequestParam("id") String id) {
        AssetTableEntity assetTableEntity = Optional.of(id).map((str) -> {
            AssetTableEntity entity = new AssetTableEntity();
            entity.setId(str);
            return entity;
        }).get();

        return new SuccessResponseData(
                ResponseData.DEFAULT_SUCCESS_CODE,
                ResponseData.DEFAULT_SUCCESS_MESSAGE,
                tableService.selectList(assetTableEntity));
    }

}
