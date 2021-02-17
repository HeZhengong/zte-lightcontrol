package cn.stylefeng.guns.modular.equip.controller;

import cn.stylefeng.guns.base.auth.context.LoginContextHolder;
import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.base.pojo.page.LayuiPageInfo;
import cn.stylefeng.guns.modular.equip.entity.EquipEntity;
import cn.stylefeng.guns.modular.equip.entity.EquipLoopEntity;
import cn.stylefeng.guns.modular.equip.service.EquipLoopService;
import cn.stylefeng.guns.modular.equip.service.EquipService;
import cn.stylefeng.guns.util.ExcelExport;
import cn.stylefeng.roses.core.base.controller.BaseController;
import cn.stylefeng.roses.core.reqres.response.ResponseData;
import cn.stylefeng.roses.core.util.ToolUtil;
import cn.stylefeng.roses.kernel.model.exception.RequestEmptyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * @author wujianghao
 * @Title: 设备管理
 * @ProjectName guns-architecture
 * @Description:
 * @date 2020/3/5 10:02 上午
 */
@Controller
@RequestMapping("/equip")
public class EquipController extends BaseController {

    @Autowired
    private EquipService service;

    @Autowired
    private EquipLoopService loopService;

    /**
     * 跳转到设备管理首页
     * @Date 2018/12/23 4:56 PM
     */
    @RequestMapping("")
    public String list(HttpServletRequest request) {
        String id = request.getParameter("id");
        if(id!=null){
            request.setAttribute("id",id);
        }else {
            request.setAttribute("id","");
        }
        return "/equip/list.html";
    }

    @RequestMapping("detail")
    public String detail(@RequestParam Long id, Model model) {
        model.addAttribute("id", id);
        return "/equip/detail.html";
    }

    /**
     * 查询列表
     * @Date 2019-03-13
     */
    @ResponseBody
    @RequestMapping("/selectPage")
    public LayuiPageInfo list(EquipEntity entity) {
        Long userId= LoginContextHolder.getContext().getUser().getId();
        entity.setCreateUser(userId);
        return LayuiPageFactory.createPageInfo(service.selectPage(entity));
    }

    /**
     * 新增接口
     * @Date 2019-03-13
     */
    @RequestMapping("/add")
    @ResponseBody
    public ResponseData add(EquipEntity entity) {
        this.service.add(entity);
        return ResponseData.success();
    }

    /**
     * 编辑接口
     * @Date 2019-03-13
     */
    @RequestMapping("/edit")
    @ResponseBody
    public ResponseData edit(EquipEntity entity) {
        service.update(entity);
        return ResponseData.success();
    }

    /**
     * 删除接口
     * @Date 2019-03-13
     */
    @RequestMapping("/delete")
    @ResponseBody
    public ResponseData delete(EquipEntity entity) {
        this.service.delete(entity);
        return ResponseData.success();
    }

    /**
     * 查看详情接口
     * @Date 2019-03-13
     */
    @RequestMapping("/get")
    @ResponseBody
    public ResponseData get(EquipEntity entity) {
         entity = this.service.get(entity);
        return ResponseData.success(entity);
    }

    @RequestMapping("/exportExcel")
    public void exportExcel(EquipEntity entity,HttpServletResponse response) {
        ExcelExport.exportExcel(service.selectList(entity),"设备信息表","设备信息",EquipEntity.class,"设备信息表" +  + System.currentTimeMillis() + ".xls",response);
    }

    @ResponseBody
    @RequestMapping("/check")
    public boolean check(EquipEntity entity) {
        return service.check(entity);
    }



    /**
     * 修改回路状态
     * @Date 2019-03-13
     */
    @RequestMapping("/updateLoopStatus")
    @ResponseBody
    public ResponseData updateLoopStatus(String status,Long equipId,String id) {
        String[] ids=null;
        if(ToolUtil.isNotEmpty(id)){
           ids=id.split(",");
        }
        this.loopService.updateStatus(status,equipId,ids);
        return ResponseData.success();
    }

    //
    @ResponseBody
    @RequestMapping("/listEquipLoop")
    public List<EquipLoopEntity> listEquipLoop(Long equipId) {
        if (ToolUtil.isEmpty(equipId)) {
            throw new RequestEmptyException();
        }
        return loopService.selectList(equipId);
    }

    @ResponseBody
    @RequestMapping("/loopPage")
    public LayuiPageInfo loopPage(Long equipId) {
        LayuiPageInfo result = new LayuiPageInfo();
        result.setData(loopService.selectList(equipId));
        return result;
    }

    @RequestMapping("/editLoop")
    @ResponseBody
    public ResponseData editLoop(EquipLoopEntity entity) {
        loopService.update(entity);
        return ResponseData.success();
    }

}
