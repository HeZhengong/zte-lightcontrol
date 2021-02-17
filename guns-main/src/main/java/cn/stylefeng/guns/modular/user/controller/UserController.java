package cn.stylefeng.guns.modular.user.controller;

import cn.stylefeng.guns.base.auth.context.LoginContextHolder;
import cn.stylefeng.guns.base.log.BussinessLog;
import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.sys.core.constant.dictmap.UserDict;
import cn.stylefeng.guns.sys.core.exception.enums.BizExceptionEnum;
import cn.stylefeng.guns.sys.modular.system.model.UserDto;
import cn.stylefeng.guns.sys.modular.system.service.UserService;
import cn.stylefeng.guns.sys.modular.system.warpper.UserWrapper;
import cn.stylefeng.guns.util.ExcelExport;
import cn.stylefeng.roses.core.base.controller.BaseController;
import cn.stylefeng.roses.core.datascope.DataScope;
import cn.stylefeng.roses.core.reqres.response.ResponseData;
import cn.stylefeng.roses.core.reqres.response.SuccessResponseData;
import cn.stylefeng.roses.core.util.ToolUtil;
import cn.stylefeng.roses.kernel.model.exception.ServiceException;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * @author wujianghao
 * @Title: UserController
 * @ProjectName guns-architecture
 * @Description: TODO
 * @date 2020/3/5 9:06 上午
 */
@Controller
@RequestMapping("/user/userinfo")
public class UserController extends BaseController {

    @Autowired
    private UserService userService;

    private String PREFIX = "/user";
    @RequestMapping("")
    public String index() {
        return PREFIX + "/user.html";
    }



    /***
     * @Author wujianghao
     * @Description 用户查询
     * @Date 10:45 上午 2020/3/14
     * @Param [name, timeLimit, deptId]
     * @return java.lang.Object
     **/
    @RequestMapping("/list")
    @ResponseBody
    public Object list(@RequestParam(required = false) String name,
                       @RequestParam(required = false) String timeLimit,
                       @RequestParam(required = false) Long deptId,
                       @RequestParam(required = false, value = "account") String account,
                       @RequestParam(required = false, value = "phone") String phone,
                       @RequestParam(required = false, value = "roleId") Long roleId) {

        //拼接查询条件
        String beginTime = "";
        String endTime = "";

        if (ToolUtil.isNotEmpty(timeLimit)) {
            String[] split = timeLimit.split(" - ");
            beginTime = split[0];
            endTime = split[1];
        }

        if (LoginContextHolder.getContext().isAdmin()) {
            Page<Map<String, Object>> users = userService.selectUsers2(null, name, beginTime, endTime, deptId, account, phone, roleId);
            Page wrapped = new UserWrapper(users).wrap();
            return LayuiPageFactory.createPageInfo(wrapped);
        } else {
            DataScope dataScope = new DataScope(LoginContextHolder.getContext().getDeptDataScope());
            Page<Map<String, Object>> users = userService.selectUsers2(dataScope, name, beginTime, endTime, deptId, account, phone, roleId);
            Page wrapped = new UserWrapper(users).wrap();
            return LayuiPageFactory.createPageInfo(wrapped);
        }
    }


    @ResponseBody
    @RequestMapping("/delete")
    @BussinessLog(value = "删除用户", key = "userId", dict = UserDict.class)
    public ResponseData delete(@RequestParam Long userId) {
        if (ToolUtil.isEmpty(userId)) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        userService.deleteUser(userId);
        return SUCCESS_TIP;
    }

    /**
     * 初始化 密码
     * @param userId
     * @return
     */
    @ResponseBody
    @RequestMapping("/initPassword")
    @BussinessLog(value = "初始化密码", key = "userId", dict = UserDict.class)
    public ResponseData initPassword(@RequestParam Long userId) {
        String newPassword = "123456";
        userService.initPwd(userId, newPassword);
        return SUCCESS_TIP;
    }

    /**
     * 根据 用户 userId 查询个人信息
     * @param userId
     * @return
     */
    @ResponseBody
    @RequestMapping("/queryOneUserInfo")
    public ResponseData getUserInfoById(@RequestParam Long userId) {
        if (ToolUtil.isEmpty(userId)) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        Map<String, Object> map = userService.getUserInfo(userId);
        map.put("listRole", userService.listRole());
        return new SuccessResponseData(
                SuccessResponseData.DEFAULT_SUCCESS_CODE,
                SuccessResponseData.DEFAULT_SUCCESS_MESSAGE,
                map);
    }

    /**
     *
     * @return
     */
    @ResponseBody
    @RequestMapping("/listRole")
    public ResponseData listRole() {
        return new SuccessResponseData(
                SuccessResponseData.DEFAULT_SUCCESS_CODE,
                SuccessResponseData.DEFAULT_SUCCESS_MESSAGE,
                userService.listRole());
    }

    /**
     * 添加或者编辑 如果 userDto.getUserId() 为空 或者 为空字符串，就是新增，否则是编辑
     * @param userDto
     * @return
     */
    @ResponseBody
    @RequestMapping("/addOrEditUser")
    public ResponseData addOrEditUser(UserDto userDto) {
        if (null == userDto.getUserId() || "".equals(userDto.getUserId())) {
            userService.addUser(userDto);
            return new SuccessResponseData(
                    SuccessResponseData.DEFAULT_SUCCESS_CODE,
                    "新建成功",
                    userService.listRole());
        }
        else {
            userService.editUser(userDto);
            return new SuccessResponseData(
                    SuccessResponseData.DEFAULT_SUCCESS_CODE,
                    "编辑成功",
                    userService.listRole());
        }
    }


    @RequestMapping("/exportExcel")
    public void exportExcel(@RequestParam(required = false, value = "account") String account,
                            @RequestParam(required = false, value = "phone") String phone,
                            @RequestParam(required = false, value = "roleId") Long roleId,
                            HttpServletResponse response) {
        List<UserDto> list = userService.selectUsers3(account, phone, roleId);

        ExcelExport.exportExcel(list, "设备信息表", "用户信息表", UserDto.class, "用户信息表" + System.currentTimeMillis() + ".xls",response);
    }
}
