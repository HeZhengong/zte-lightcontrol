package cn.stylefeng.guns.modular.alarm.comtroller;

import cn.stylefeng.guns.base.auth.context.LoginContext;
import cn.stylefeng.guns.base.auth.context.LoginContextHolder;
import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.base.pojo.page.LayuiPageInfo;
import cn.stylefeng.guns.modular.alarm.entity.AlarmEntity;
import cn.stylefeng.guns.modular.alarm.service.AlarmService;
import cn.stylefeng.guns.modular.workorder.entity.WorkOrderEntity;
import cn.stylefeng.guns.modular.workorder.service.WorkOrderService;
import cn.stylefeng.guns.sys.modular.system.model.UserDto;
import cn.stylefeng.guns.sys.modular.system.service.UserService;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author ZMJ
 * @create 2020/03/23 10:02
 * @Description 告警列表控制器
 */
@Controller
@RequestMapping("/alarm")
public class AlarmController {
    @Resource
    private AlarmService alarmService;

    @Resource
    private UserService userService;

    @Resource
    private WorkOrderService workOrderService;
    @RequestMapping("/alarmInfo")
    public String alarmInfo(HttpServletRequest request){
        String id = request.getParameter("id");
        if(id!=null){
            request.setAttribute("id",id);
        }else {
            request.setAttribute("id","");
        }
        List<UserDto> userDtos = userService.selectUsers3(null, null, null);
        request.setAttribute("users",userDtos);
        return "/alarm/alarm.html";
    }


    @RequestMapping("/alarmList")
    @ResponseBody
    /**
     * @author zmj
     * @date 2020-03-23 16:56:59
     * @Description  查询所有未处理且未删除未转工单的告警信息
     * @param alarmEntity
     * @return java.util.List<cn.stylefeng.guns.modular.alarm.entity.AlarmEntity>
     **/
    public LayuiPageInfo findList(AlarmEntity alarmEntity){
        return LayuiPageFactory.createPageInfo(alarmService.findList(alarmEntity));
    }

    @RequestMapping("/findDispose")
    @ResponseBody
    /**
     * @author zmj
     * @date 2020-03-23 16:59:16
     * @Description  查询所有已处理且未删除未转工单的告警信息
     * @param alarmEntity
     * @return java.util.List<cn.stylefeng.guns.modular.alarm.entity.AlarmEntity>
     **/
    public LayuiPageInfo findDispose(AlarmEntity alarmEntity){
        return LayuiPageFactory.createPageInfo(alarmService.findDispose(alarmEntity));
    }


    @RequestMapping("/findDeleted")
    @ResponseBody
    /**
     * @author zmj
     * @date 2020-03-23 17:02:07
     * @Description 查询所有已删除但未转工单的告警信息(包括已处理和未处理)
     * @param alarmEntity
     * @return java.util.List<cn.stylefeng.guns.modular.alarm.entity.AlarmEntity>
     **/
    public LayuiPageInfo findDeleted(AlarmEntity alarmEntity){
        return LayuiPageFactory.createPageInfo( alarmService.findDeleted(alarmEntity));
    }


    @RequestMapping("/delAlarm")
    @ResponseBody
    /**
     * @author zmj
     * @date 2020-03-24 10:29:16
     * @Description  根据id删除告警信息
     * @param id
     * @return int
     **/
    public int delAlarm(String id){
        return alarmService.delAlarm(id);
    }

    @RequestMapping("/restoreAlarm")
    @ResponseBody
    /**
     * @author zmj
     * @date 2020-03-24 10:31:17
     * @Description  根据id从回收站还原告警信息
     * @param id
     * @return int
     **/
    public int restoreAlarm(String id){
        return  alarmService.restoreAlarm(id);
    }

    @RequestMapping("/disposeAlarm")
    @ResponseBody
    /**
     * @author zmj
     * @date 2020-03-24 11:15:17
     * @Description 处理告警信息
     * @param alarmEntity
     * @return int
     **/
    public int disposeAlarm(AlarmEntity alarmEntity){
        return alarmService.disposeAlarm(alarmEntity);
    }

    @RequestMapping("/switchWork")
    @ResponseBody
    /**
     * @author zmj
     * @date 2020-03-31 14:20:23
     * @Description  转工单
     * @param switchId
     * @param workOrderEntity
     * @return int
     **/
    public  int switchWork(String switchId,WorkOrderEntity workOrderEntity){
        int i=0;
        LoginContext context = LoginContextHolder.getContext();
        String userId = String.valueOf(context.getUserId());
        workOrderEntity.setCreatId(userId);
        workOrderEntity.setId(IdWorker.getIdStr());
        i=alarmService.switchWork(switchId);
        i+=workOrderService.insWorkOrder(workOrderEntity);
        return i;
    }
}
