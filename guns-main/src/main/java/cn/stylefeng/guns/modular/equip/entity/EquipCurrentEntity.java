package cn.stylefeng.guns.modular.equip.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * @author wujianghao
 * @Title: 设备三相电流
 * @ProjectName guns-architecture
 * @Description:
 * @date 2020/3/5 10:02 上午
 */
@Data
@TableName("t_equip_current")
public class EquipCurrentEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id")
    private String id;

    @TableField("voltageA")
    private String voltageA;

    @TableField("voltageB")
    private String voltageB;

    @TableField("voltageC")
    private String voltageC;

    @TableField("currentA")
    private String currentA;

    @TableField("currentB")
    private String currentB;

    @TableField("currentC")
    private String currentC;

    @TableField(value="powerA")
    private String powerA;

    @TableField(value="powerB")
    private String powerB;

    @TableField(value="powerC")
    private String powerC;

    @TableField(value = "createTime", fill = FieldFill.INSERT)
    private Date createTime;

    @TableField(value = "updateTime", fill = FieldFill.UPDATE)
    private Date updateTime;

    @TableField(value = "createUser", fill = FieldFill.INSERT)
    private Long createUser;

    @TableField(value = "updateUser", fill = FieldFill.UPDATE)
    private Long updateUser;

}
