package cn.stylefeng.guns.modular.equip.entity;

import cn.afterturn.easypoi.excel.annotation.Excel;
import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * @author wujianghao
 * @Title: 设备分组管理
 * @ProjectName guns-architecture
 * @Description:
 * @date 2020/3/5 10:02 上午
 */
@Data
@TableName("t_equip_group")
public class EquipGroupEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.ID_WORKER)
    private Long id;

    @Excel(name = "名称", needMerge = true, orderNum = "2")
    @TableField("name")
    private String name;

    @TableField(value = "createTime", fill = FieldFill.INSERT)
    private Date createTime;

    @TableField(value = "updateTime", fill = FieldFill.UPDATE)
    private Date updateTime;

    @TableField(value = "createUser", fill = FieldFill.INSERT)
    private Long createUser;

    @TableField(value = "updateUser", fill = FieldFill.UPDATE)
    private Long updateUser;

}
