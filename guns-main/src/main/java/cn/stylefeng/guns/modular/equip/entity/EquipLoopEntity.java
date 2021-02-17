package cn.stylefeng.guns.modular.equip.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * @author wujianghao
 * @Title: 设备回路管理
 * @ProjectName guns-architecture
 * @Description:
 * @date 2020/3/5 10:02 上午
 */
@Data
@TableName("t_equip_loop")
public class EquipLoopEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.ID_WORKER)
    private Long id;

    @TableField("equipId")
    private Long equipId;

    @TableField("name")
    private String name;

    @TableField("no")
    private String no;

    @TableField(value="status",fill=FieldFill.DEFAULT)
    private String status;

    @TableField(value="groupId",fill=FieldFill.DEFAULT)
    private Long groupId;

    @TableField(value = "createTime", fill = FieldFill.INSERT)
    private Date createTime;

    @TableField(value = "updateTime", fill = FieldFill.UPDATE)
    private Date updateTime;

    @TableField(value = "createUser", fill = FieldFill.INSERT)
    private Long createUser;

    @TableField(value = "updateUser", fill = FieldFill.UPDATE)
    private Long updateUser;

    @TableField(exist = false)
    private EquipEntity equip;

}
