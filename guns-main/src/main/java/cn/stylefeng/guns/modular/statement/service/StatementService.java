package cn.stylefeng.guns.modular.statement.service;

import cn.stylefeng.guns.modular.analysis.entity.AnalysisEntity;
import cn.stylefeng.guns.modular.equip.entity.EquipEntity;
import cn.stylefeng.guns.modular.statement.entity.StatementAlarmEntity;
import cn.stylefeng.guns.modular.statement.entity.StatementEquipEntity;
import cn.stylefeng.guns.modular.statement.entity.StatementWorkOrderEntity;
import cn.stylefeng.guns.modular.statement.mapper.StatementMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Description 统计报表service 设备导出，故障报表导出，工单报表，能耗报表
 * @Author zzb
 * @Date 2020/4/7 9:28
 **/
@Service
public class StatementService {

    @Autowired
    private StatementMapper mapper;

    /**
     * 根据 起始时间 查询出所有符合条件的 设备报表
     * @param startTime
     * @param endTime
     * @return
     */
    public List<StatementEquipEntity> selectListEquip(String startTime, String endTime) {
        return mapper.selectListEquip(startTime, endTime);
    }

    /**
     * 根据 起始时间 查询出所有符合条件的 能耗统计
     * @param startTime
     * @param endTime
     * @return
     */
    public List<AnalysisEntity> selectListEnergy(String startTime, String endTime) {
        return mapper.selectListEnergy(startTime, endTime);
    }


    /**
     * 根据 起始时间 查询出所有符合条件的 故障列表
     * @param startTime
     * @param endTime
     * @return
     */
    public List<StatementAlarmEntity> selectListAlarm(String startTime, String endTime) {
        return mapper.selectListAlarm(startTime, endTime);
    }

    /**
     * 根据 起始时间 查询出所有符合条件的 工单报表
     * @param startTime
     * @param endTime
     * @return
     */
    public List<StatementWorkOrderEntity> selectListWorkOrder(String startTime, String endTime) {
        return mapper.selectListWorkOrder(startTime, endTime);
    }




}
