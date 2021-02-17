package cn.stylefeng.guns.modular.alarm.mapper;

import cn.stylefeng.guns.modular.alarm.entity.AlarmEntity;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author ZMJ
 * @create 2020/03/23 15:08
 * @Description 告警dao
 */
public interface AlarmMapper {
    /**
     * @author zmj
     * @date 2020-03-23 15:15:35
     * @Description  查询所有未处理且未删除未转工单的告警信息
     * @param alarmEntity
     * @return List<AlarmEntity>
     **/
    List<AlarmEntity> findList(@Param("page") Page page,@Param("alarmEntity") AlarmEntity alarmEntity);

    /**
     * @author zmj
     * @date 2020-03-23 16:34:53
     * @Description  查询所有已处理且未删除未转工单的告警信息
     * @param alarmEntity
     * @return List<AlarmEntity>
     **/
    List<AlarmEntity> findDispose(@Param("page") Page page,@Param("alarmEntity") AlarmEntity alarmEntity);

    /**
     * @author zmj
     * @date 2020-03-23 16:37:23
     * @Description   查询所有已删除但未转工单的告警信息(包括已处理和未处理)
     * @param alarmEntity
     * @return List<AlarmEntity>
     **/
    List<AlarmEntity> findDeleted(@Param("page") Page page,@Param("alarmEntity") AlarmEntity alarmEntity);

    /**
     * @author zmj
     * @date 2020-03-24 10:23:21
     * @Description  根据id删除告警信息
     * @param id
     * @return int
     **/
    int delAlarm(String id);

    /**
     * @author zmj
     * @date 2020-03-24 10:24:03
     * @Description  根据id从回收站还原告警信息
     * @param id
     * @return int
     **/
    int restoreAlarm(String id);

    /**
     * @author zmj
     * @date 2020-03-24 11:11:53
     * @Description  处理告警信息
     * @param alarmEntity
     * @return int
     **/
    int disposeAlarm(AlarmEntity alarmEntity);

    int switchWork(String switchId);
}
