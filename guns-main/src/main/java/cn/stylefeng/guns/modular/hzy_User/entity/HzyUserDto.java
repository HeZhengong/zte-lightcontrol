package cn.stylefeng.guns.modular.hzy_User.entity;

import cn.afterturn.easypoi.excel.annotation.Excel;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
@Data
public class HzyUserDto {
    private Long userId;

    @Excel(name = "用户名", needMerge = true, orderNum = "1")
    private String account;

    private String password;

    @Excel(name = "昵称", needMerge = true, orderNum = "2")
    private String name;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birthday;

    private String sex;

    @Excel(name = "邮箱", needMerge = true, orderNum = "4")
    private String email;

    @Excel(name = "手机号", needMerge = true, orderNum = "3")
    private String phone;

    private String roleId;

    @Excel(name = "角色", needMerge = true, orderNum = "5")
    private String roleName;

    private Long deptId;

    private String status;

    private String avatar;

    private String position;

    @Excel(name = "备注", needMerge = true, orderNum = "6")
    private String remark;

}
