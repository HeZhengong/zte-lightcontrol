package cn.stylefeng.guns.modular.alarmconfig.entity;

import lombok.Data;

/**
 * @author ZMJ
 * @create 2020/04/08 9:48
 * @Description 设备类型
 */
@Data
public class EquipTypeEntity {
    private String id;
    private String name;
    private String inform;
    private String alarmSwitch;
    private String offLineDays;
}
