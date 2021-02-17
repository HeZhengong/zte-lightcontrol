package cn.stylefeng.guns.modular.equip.controller;

import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.base.pojo.page.LayuiPageInfo;
import cn.stylefeng.guns.modular.equip.entity.EquipGroupEntity;
import cn.stylefeng.guns.modular.equip.entity.EquipLoopEntity;
import cn.stylefeng.guns.modular.equip.service.EquipGroupService;
import cn.stylefeng.guns.modular.equip.service.EquipLoopService;
import cn.stylefeng.roses.core.base.controller.BaseController;
import cn.stylefeng.roses.core.reqres.response.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @author wujianghao
 * @Title: 设备管理
 * @ProjectName guns-architecture
 * @Description:
 * @date 2020/3/5 10:02 上午
 */
@Controller
@RequestMapping("/equipGroup")
public class EquipGroupController extends BaseController {

    @Autowired
    private EquipGroupService service;

    @Autowired
    private EquipLoopService loopService;

    /**
     * 跳转到设备分组管理首页
     * @Date 2018/12/23 4:56 PM
     */
    @RequestMapping("")
    public String list() {
        return "/equip/group.html";
    }

    @ResponseBody
    @RequestMapping("/selectList")
    public List<EquipGroupEntity> selectList(EquipGroupEntity entity) {
        return service.selectList(entity);
    }

    /**
     * 保存接口
     * @Date 2019-03-13
     */
    @RequestMapping("/save")
    @ResponseBody
    public ResponseData save(EquipGroupEntity entity) {
        service.saveOrUpdate(entity);
        return ResponseData.success();
    }

    /**
     * 删除接口
     * @Date 2019-03-13
     */
    @RequestMapping("/delete")
    @ResponseBody
    public ResponseData delete(EquipGroupEntity entity) {
        EquipLoopEntity loop=new EquipLoopEntity();
        loop.setGroupId(entity.getId());
        List<EquipLoopEntity> list=loopService.queryList(loop);
        if(list.size()>0){
            return ResponseData.success(500, "分组中存在数据,删除失败", "");
        }else{
            this.service.removeById(entity);
            return ResponseData.success(200, "删除成功", "");
        }
    }

    @RequestMapping("/get")
    @ResponseBody
    public ResponseData get(EquipGroupEntity entity) {
        return ResponseData.success(service.getById(entity));
    }

    @ResponseBody
    @RequestMapping("/loopPage")
    public LayuiPageInfo loopPage(EquipLoopEntity entity) {
        return LayuiPageFactory.createPageInfo(loopService.queryPage(entity));
    }

    /**
     * 移出
     * @Date 2019-03-13
     */
    @RequestMapping("/remove")
    @ResponseBody
    public ResponseData remove(EquipLoopEntity entity) {
        entity.setGroupId(1L);
        this.loopService.update(entity);
        return ResponseData.success();
    }

    @RequestMapping("/editLoopGroup")
    @ResponseBody
    public ResponseData editLoopGroup(EquipLoopEntity entity) {
        loopService.update(entity);
        return ResponseData.success();
    }
}
