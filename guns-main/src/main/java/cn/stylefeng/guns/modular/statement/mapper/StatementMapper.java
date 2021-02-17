package cn.stylefeng.guns.modular.statement.mapper;

import cn.stylefeng.guns.modular.analysis.entity.AnalysisEntity;
import cn.stylefeng.guns.modular.equip.entity.EquipEntity;
import cn.stylefeng.guns.modular.statement.entity.StatementAlarmEntity;
import cn.stylefeng.guns.modular.statement.entity.StatementEquipEntity;
import cn.stylefeng.guns.modular.statement.entity.StatementWorkOrderEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Description 统计报表 mapper
 * @Author zzb
 * @Date 2020/4/7 9:30
 **/
@Repository
public interface StatementMapper extends BaseMapper<Object> {

    /**
     * 根据 起始时间 来查询数据 设备报表
     * @param startTime
     * @param endTime
     * @return
     */
    List<StatementEquipEntity> selectListEquip(@Param("startTime") String startTime, @Param("endTime") String endTime);

    /**
     * 根据 起始时间 来查询数据 能耗统计
     * @param startTime
     * @param endTime
     * @return
     */
    List<AnalysisEntity> selectListEnergy(@Param("startTime") String startTime, @Param("endTime") String endTime);

    /**
     * 根据 起始时间 来查询数据 故障报表
     * @param startTime
     * @param endTime
     * @return
     */
    List<StatementAlarmEntity> selectListAlarm(@Param("startTime") String startTime, @Param("endTime") String endTime);


    /**
     * 根据 起始时间 来查询数据 工单报表
     * @param startTime
     * @param endTime
     * @return
     */
    List<StatementWorkOrderEntity> selectListWorkOrder(@Param("startTime") String startTime, @Param("endTime") String endTime);

}
