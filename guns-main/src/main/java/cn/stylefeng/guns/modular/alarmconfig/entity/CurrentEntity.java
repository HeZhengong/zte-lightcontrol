package cn.stylefeng.guns.modular.alarmconfig.entity;

import lombok.Data;

/**
 * @author ZMJ
 * @create 2020/04/08 15:13
 * @Description 回路电流配置实体类
 */
@Data
public class CurrentEntity {
    private String id;
    private String currentMin;
    private String currentMax;
    private String equipId;
    private String typeId;
    private String equipName;
    private String loopName;
    private String loopId;
}
