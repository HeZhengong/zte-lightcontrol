package cn.stylefeng.guns.modular.alarm.service;

import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.modular.alarm.mapper.AlarmMapper;
import cn.stylefeng.guns.modular.alarm.entity.AlarmEntity;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author ZMJ
 * @create 2020/03/23 15:16
 * @Description 告警service
 */
@Service
@Transactional
public class AlarmService {
    @Resource
    private AlarmMapper alarmMapper;

    /**
     * @author zmj
     * @date 2020-03-23 15:18:29
     * @Description  查询所有未处理且未删除未转工单的告警信息
     * @param alarmEntity
     * @return List<AlarmEntity>
     **/
    public Page<AlarmEntity> findList(AlarmEntity alarmEntity){
        Page page = LayuiPageFactory.defaultPage();
        page.setRecords(alarmMapper.findList(page,alarmEntity));
        return  page;
    }

    /**
     * @author zmj
     * @date 2020-03-23 16:34:53
     * @Description  查询所有已处理且未删除未转工单的告警信息
     * @param alarmEntity
     * @return List<AlarmEntity>
     **/
    public Page<AlarmEntity> findDispose(AlarmEntity alarmEntity){
        Page page = LayuiPageFactory.defaultPage();
        page.setRecords(alarmMapper.findDispose(page,alarmEntity));
        return  page;
    }

    /**
     * @author zmj
     * @date 2020-03-23 16:37:23
     * @Description   查询所有已删除但未转工单的告警信息(包括已处理和未处理)
     * @param alarmEntity
     * @return List<AlarmEntity>
     **/
    public Page<AlarmEntity> findDeleted(AlarmEntity alarmEntity){
        Page page = LayuiPageFactory.defaultPage();
        List<AlarmEntity> deleted = alarmMapper.findDeleted(page, alarmEntity);
        for (AlarmEntity entity : deleted) {
            if (entity.getAlarmCause().equals("")||entity.getAlarmCause()==null){
                entity.setAlarmCause("未处理");
            }
        }
        page.setRecords(deleted);
        return  page;
    }

    /**
     * @author zmj
     * @date 2020-03-24 10:25:26
     * @Description  根据id删除告警信息
     * @param id
     * @return int
     **/
    public int delAlarm(String id){
        return alarmMapper.delAlarm(id);
    }

    /**
     * @author zmj
     * @date 2020-03-24 10:26:12
     * @Description  根据id从回收站还原告警信息
     * @param id
     * @return int
     **/
    public int restoreAlarm(String id){
        return  alarmMapper.restoreAlarm(id);
    }

    /**
     * @author zmj
     * @date 2020-03-24 11:13:08
     * @Description  处理告警信息
     * @param alarmEntity
     * @return int
     **/
    public int disposeAlarm(AlarmEntity alarmEntity){
        return  alarmMapper.disposeAlarm(alarmEntity);
    }

    public int switchWork(String switchId){
        return alarmMapper.switchWork(switchId);
    }
}
