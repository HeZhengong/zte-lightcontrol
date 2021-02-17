package cn.stylefeng.guns.modular.alarmconfig.entity;

import lombok.Data;

/**
 * @author ZMJ
 * @create 2020/04/09 9:28
 * @Description 三箱电告警
 */
@Data
public class ElectricityBoxEntity {
    private String id;
    private String aVoltageMin;
    private String aVoltageMax;
    private String bVoltageMin;
    private String bVoltageMax;
    private String cVoltageMin;
    private String cVoltageMax;
    private String aElectricityMin;
    private String aElectricityMax;
    private String bElectricityMin;
    private String bElectricityMax;
    private String cElectricityMin;
    private String cElectricityMax;
    private String equipId;
    private String typeId;
    private String equipName;
}
