package cn.stylefeng.guns.modular.group.controller;

import cn.stylefeng.roses.core.base.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author wujianghao
 * @Title: Group
 * @ProjectName guns-architecture
 * @Description: TODO
 * @date 2020/3/5 10:02 上午
 */
@Controller
@RequestMapping("/group/groupinfo")
public class Group  extends BaseController {

    private String PREFIX = "/groupmanage";
    @RequestMapping("")
    public String index() {
        return PREFIX + "/groupmanage.html";
    }
}
