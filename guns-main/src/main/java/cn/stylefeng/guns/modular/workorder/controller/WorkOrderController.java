package cn.stylefeng.guns.modular.workorder.controller;

import cn.stylefeng.guns.base.auth.context.LoginContext;
import cn.stylefeng.guns.base.auth.context.LoginContextHolder;
import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.base.pojo.page.LayuiPageInfo;
import cn.stylefeng.guns.modular.alarm.service.AlarmService;
import cn.stylefeng.guns.modular.workorder.entity.WorkOrderEntity;
import cn.stylefeng.guns.modular.workorder.service.WorkOrderService;
import cn.stylefeng.guns.sys.modular.system.model.UserDto;
import cn.stylefeng.guns.sys.modular.system.service.UserService;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author ZMJ
 * @create 2020/03/31 16:39
 * @Description 工单管理controller
 */
@Controller
@RequestMapping("/workOrder")
public class WorkOrderController {


    @Resource
    private WorkOrderService workOrderService;

    @Resource
    private UserService userService;

    @RequestMapping("")
    public  String index(Model model, HttpServletRequest request){
        Long userId = LoginContextHolder.getContext().getUserId();
        model.addAttribute("userId",userId);
        List<UserDto> userDtos = userService.selectUsers3(null, null, null);
        request.setAttribute("users",userDtos);
        return "/workorder/workorder.html";
    }

    @RequestMapping("/workOrderList")
    @ResponseBody
    public LayuiPageInfo findList(WorkOrderEntity workOrderEntity){
        Long userId = LoginContextHolder.getContext().getUserId();
        HashMap<String, Object> map = new HashMap<>();
        map.put("userId",userId);
        map.put("workOrderEntity",workOrderEntity);
        return LayuiPageFactory.createPageInfo(workOrderService.findList(map));
    }

    @RequestMapping("/findDispose")
    @ResponseBody
    public LayuiPageInfo findDispose(@RequestParam HashMap<String,Object> map){
        String userId = String.valueOf(LoginContextHolder.getContext().getUserId());
        map.put("userId",userId);
        return LayuiPageFactory.createPageInfo(workOrderService.findDispose(map));
    }


    @RequestMapping("/findDeleted")
    @ResponseBody
    public LayuiPageInfo findDeleted(@RequestParam HashMap<String,Object> map){
        Long userId = LoginContextHolder.getContext().getUserId();
        map.put("userId",userId);
        return LayuiPageFactory.createPageInfo(workOrderService.findDeleted(map));
    }

    @RequestMapping("/delWorkOrder")
    @ResponseBody
    public int delWorkOrder(String id){
        return workOrderService.delWorkOrder(id);
    }

    @RequestMapping("/restoreWorkOrder")
    @ResponseBody
    public int restoreWorkOrder(String id){
        return workOrderService.restoreWorkOrder(id);
    }

    @RequestMapping("/selById")
    @ResponseBody
    public WorkOrderEntity selById(String id){
        return workOrderService.selById(id);
    }


    @RequestMapping("/insWorkOder")
    @ResponseBody
    public int insWorkOder(WorkOrderEntity workOrderEntity){
        String userId = String.valueOf(LoginContextHolder.getContext().getUserId());
        workOrderEntity.setCreatId(userId);
        workOrderEntity.setId(IdWorker.getIdStr());
        return workOrderService.insWorkOrder(workOrderEntity);
    }

    @RequestMapping("/editWorkOder")
    @ResponseBody
    public int editWorkOrder(WorkOrderEntity workOrderEntity){
        return workOrderService.editWorkOrder(workOrderEntity);
    }

    @RequestMapping("/clWorkOder")
    @ResponseBody
    public int clWorkOder(WorkOrderEntity workOrderEntity){
        return workOrderService.clWorkOder(workOrderEntity);
    }
}
