package cn.stylefeng.guns.modular.alarmconfig.entity;

import lombok.Data;

/**
 * @author ZMJ
 * @create 2020/04/07 14:05
 * @Description 设备告警
 */
@Data
public class EquipAlarmEntity {
    private String id;
    private String name;
    /**
     * 离线告警  0-告警 1-不告警
     */
    private String offLine;
    /**
     * 三箱电告警  0-告警 1-不告警
     */
    private String electricityBox;
    /**
     * 异常开关告警  0-告警  1-不告警
     */
    private String abnormalSwitch;
    /**
     * 回路电流告警  0-告警  1-不告警
     */
    private String loopCurrent;
}
