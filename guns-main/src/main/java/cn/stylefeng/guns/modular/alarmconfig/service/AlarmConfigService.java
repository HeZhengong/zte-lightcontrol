package cn.stylefeng.guns.modular.alarmconfig.service;

import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.modular.alarm.service.AlarmService;
import cn.stylefeng.guns.modular.alarmconfig.entity.CurrentEntity;
import cn.stylefeng.guns.modular.alarmconfig.entity.ElectricityBoxEntity;
import cn.stylefeng.guns.modular.alarmconfig.entity.EquipAlarmEntity;
import cn.stylefeng.guns.modular.alarmconfig.entity.EquipTypeEntity;
import cn.stylefeng.guns.modular.alarmconfig.mapper.AlarmConfigMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author ZMJ
 * @create 2020/04/07 14:11
 * @Description 告警配置service
 */
@Service
@Transactional
public class AlarmConfigService {
    @Resource
    private AlarmConfigMapper alarmConfigMapper;

    public List<EquipAlarmEntity> selEquip(){
        return alarmConfigMapper.selEquip();
    }

    public int updStatus(EquipAlarmEntity equipAlarmEntity){
        return alarmConfigMapper.updStatus(equipAlarmEntity);
    }

    public  List<EquipTypeEntity> selEquipType(){
        return alarmConfigMapper.selEquipType();
    }

    public EquipTypeEntity selById(String id){
        return alarmConfigMapper.selById(id);
    }

    public EquipTypeEntity selById1(String id){
        return alarmConfigMapper.selById1(id);
    }

    public int updTypes(EquipTypeEntity equipTypeEntity){
        return alarmConfigMapper.updTypes(equipTypeEntity);
    }

    public int updOffLine(EquipTypeEntity equipTypeEntity){
        return alarmConfigMapper.updOffLine(equipTypeEntity);
    }

    public Page<CurrentEntity> selCurrent(){
        Page page = LayuiPageFactory.defaultPage();
        page.setRecords(alarmConfigMapper.selCurrent(page));
        return page;
    }

    public int insCurrent(CurrentEntity currentEntity){
        return alarmConfigMapper.insCurrent(currentEntity);
    }

    public int updCurrent(CurrentEntity currentEntity){
        return alarmConfigMapper.updCurrent(currentEntity);
    }

    public Page<ElectricityBoxEntity> queryBox(){
        Page page = LayuiPageFactory.defaultPage();
        page.setRecords(alarmConfigMapper.queryBox(page));
        return page;
    }

    public int insBox(ElectricityBoxEntity electricityBoxEntity){
        return alarmConfigMapper.insBox(electricityBoxEntity);
    }

    public int updBox(ElectricityBoxEntity electricityBoxEntity){
        return alarmConfigMapper.updBox(electricityBoxEntity);
    }
}
