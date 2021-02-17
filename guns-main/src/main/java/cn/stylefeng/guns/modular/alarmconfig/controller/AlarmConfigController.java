package cn.stylefeng.guns.modular.alarmconfig.controller;

import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.base.pojo.page.LayuiPageInfo;
import cn.stylefeng.guns.modular.alarmconfig.entity.CurrentEntity;
import cn.stylefeng.guns.modular.alarmconfig.entity.ElectricityBoxEntity;
import cn.stylefeng.guns.modular.alarmconfig.entity.EquipAlarmEntity;
import cn.stylefeng.guns.modular.alarmconfig.entity.EquipTypeEntity;
import cn.stylefeng.guns.modular.alarmconfig.service.AlarmConfigService;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author ZMJ
 * @create 2020/04/07 9:02
 * @Description 告警配置控制器
 */
@Controller
@RequestMapping("/alarmConfig")
public class AlarmConfigController {

    @Resource
    private AlarmConfigService alarmConfigService;

    @RequestMapping("")
    public String index(Model model){
        List<EquipTypeEntity> list = alarmConfigService.selEquipType();
        for (EquipTypeEntity equipTypeEntity : list) {
            switch (equipTypeEntity.getName()){
                case "设备离线":
                    model.addAttribute("sblxId",equipTypeEntity.getId());
                    break;
                case "三相电告警":
                    model.addAttribute("sxdId",equipTypeEntity.getId());
                    break;
                case "异常开关告警":
                    model.addAttribute("yckgId",equipTypeEntity.getId());
                    break;
                case "回路电流告警":
                    model.addAttribute("hldlId",equipTypeEntity.getId());
                    break;
            }
        }
        return "/alarmconfig/alarmconfig.html";
    }

    @RequestMapping("/selEquip")
    @ResponseBody
    public List<EquipAlarmEntity> selEquip(){
        return  alarmConfigService.selEquip();
    }

    @RequestMapping("/updStatus")
    @ResponseBody
    public int updStatus(EquipAlarmEntity equipAlarmEntity){
        return alarmConfigService.updStatus(equipAlarmEntity);
    }

    @RequestMapping("/initOffLine")
    @ResponseBody
    public EquipTypeEntity selById(String id){
        return alarmConfigService.selById(id);
    }

    @RequestMapping("/init")
    @ResponseBody
    public EquipTypeEntity selById1(String id){
        return alarmConfigService.selById1(id);
    }

    @RequestMapping("/upd")
    @ResponseBody
    public int upd(EquipTypeEntity equipTypeEntity){
        int i=0;
        i+=alarmConfigService.updTypes(equipTypeEntity);
        return i;
    }

    @RequestMapping("/updOffLineConfig")
    @ResponseBody
    public int updTypes(EquipTypeEntity equipTypeEntity){
        int i=0;
        i+=alarmConfigService.updTypes(equipTypeEntity);
        i+=alarmConfigService.updOffLine(equipTypeEntity);
        return i;
    }

    @RequestMapping("/queryCurrent")
    @ResponseBody
    public LayuiPageInfo selCurrent(){
        return LayuiPageFactory.createPageInfo(alarmConfigService.selCurrent());
    }


    @RequestMapping("/saveCurrent")
    @ResponseBody
    public int saveCurrent(CurrentEntity currentEntity){
        int i=0;
        if(currentEntity.getId()==null || currentEntity.getId().equals("")){
           currentEntity.setId(IdWorker.getIdStr());
           i+=alarmConfigService.insCurrent(currentEntity);
        }else {
            i+=alarmConfigService.updCurrent(currentEntity);
        }
        return i;
    }

    @RequestMapping("/queryBox")
    @ResponseBody
    public LayuiPageInfo queryBox(){
        return LayuiPageFactory.createPageInfo(alarmConfigService.queryBox());
    }

    @RequestMapping("/saveBox")
    @ResponseBody
    public int saveBox(ElectricityBoxEntity electricityBoxEntity){
        int i=0;
        if (electricityBoxEntity.getId()==null ||electricityBoxEntity.getId().equals("")){
            electricityBoxEntity.setId(IdWorker.getIdStr());
            i+=alarmConfigService.insBox(electricityBoxEntity);
        }else {
            i+=alarmConfigService.updBox(electricityBoxEntity);
        }
        return i;
    }
}
