package cn.stylefeng.guns.modular.alarmconfig.mapper;

import cn.stylefeng.guns.modular.alarmconfig.entity.CurrentEntity;
import cn.stylefeng.guns.modular.alarmconfig.entity.ElectricityBoxEntity;
import cn.stylefeng.guns.modular.alarmconfig.entity.EquipAlarmEntity;
import cn.stylefeng.guns.modular.alarmconfig.entity.EquipTypeEntity;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author ZMJ
 * @create 2020/04/07 13:57
 * @Description 告警配置mapper
 */
public interface AlarmConfigMapper {
    List<EquipAlarmEntity> selEquip();

    int updStatus(EquipAlarmEntity equipAlarmEntity);

    List<EquipTypeEntity> selEquipType();

    EquipTypeEntity selById(String id);

    EquipTypeEntity selById1(String id);

    int updTypes(EquipTypeEntity equipTypeEntity);

    int updOffLine(EquipTypeEntity equipTypeEntity);

    List<CurrentEntity> selCurrent(@Param("page") Page page);

    int insCurrent(CurrentEntity currentEntity);

    int updCurrent(CurrentEntity currentEntity);

    List<ElectricityBoxEntity> queryBox(@Param("page") Page page);

    int insBox(ElectricityBoxEntity electricityBoxEntity);

    int updBox(ElectricityBoxEntity electricityBoxEntity);
}
