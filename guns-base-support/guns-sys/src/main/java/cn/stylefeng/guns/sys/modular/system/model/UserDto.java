/**
 * Copyright 2018-2020 stylefeng & fengshuonan (https://gitee.com/stylefeng)
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package cn.stylefeng.guns.sys.modular.system.model;

import cn.afterturn.easypoi.excel.annotation.Excel;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * 用户传输bean
 *
 * @Date 2017/5/5 22:40
 */
@Data
public class UserDto {

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
