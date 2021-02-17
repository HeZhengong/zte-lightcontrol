package cn.stylefeng.guns.modular.equip.entity;

import cn.afterturn.easypoi.excel.annotation.Excel;
import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @author wujianghao
 * @Title: 设备管理
 * @ProjectName guns-architecture
 * @Description:
 * @date 2020/3/5 10:02 上午
 */
@Data
@TableName("t_equip")
public class EquipEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.ID_WORKER)
    private Long id;

    @Excel(name = "编号", needMerge = true, orderNum = "1")
    @TableField("no")
    private String no;

    @Excel(name = "名称", needMerge = true, orderNum = "2")
    @TableField("name")
    private String name;

    @Excel(name = "类型", needMerge = true, orderNum = "3",replace = {"配电_1"})
    @TableField("type")
    private String type;

    @Excel(name = "mac地址", needMerge = true, orderNum = "4")
    @TableField("mac")
    private String mac;

    @Excel(name = "配电箱", needMerge = true, orderNum = "5")
    @TableField("distributionBox")
    private String distributionBox;

    @Excel(name = "箱内状态", needMerge = true, orderNum = "6",replace = {"关闭_0","打开_1"})
    @TableField(value="boxStatus",fill=FieldFill.DEFAULT)
    private String boxStatus;

    @Excel(name = "物联网卡号", needMerge = true, orderNum = "7")
    @TableField("internetCard")
    private String internetCard;

    @Excel(name = "经度", needMerge = true, orderNum = "8")
    @TableField("latitude")
    private String latitude;

    @Excel(name = "纬度", needMerge = true, orderNum = "9")
    @TableField("longitude")
    private String longitude;

    @Excel(name = "设备状态", needMerge = true, orderNum = "10",replace = {"离线_0","在线_1"})
    @TableField(value="status",fill=FieldFill.DEFAULT)
    private String status;

    @Excel(name = "回路数", needMerge = true, orderNum = "11")
    @TableField("loopCount")
    private int loopCount;

    @Excel(name = "型号", needMerge = true, orderNum = "12")
    @TableField("model")
    private String model;

    @TableField("path")
    private String path;

    @TableField(value = "createTime", fill = FieldFill.INSERT)
    private Date createTime;

    @TableField(value = "updateTime", fill = FieldFill.UPDATE)
    private Date updateTime;

    @TableField(value = "createUser", fill = FieldFill.INSERT)
    private Long createUser;

    @TableField(value = "updateUser", fill = FieldFill.UPDATE)
    private Long updateUser;

    @TableField(exist = false)
    private String loops;

    @TableField(exist = false)
    private EquipCurrentEntity equipCurrent;
}
