package cn.stylefeng.guns.modular.index.controller;

import cn.stylefeng.guns.base.auth.context.LoginContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * @author ZMJ
 * @create 2020/03/20 9:32
 * @Description 首页控制器
 */
@Controller
public class IndexController {
    /**
     * @author zmj
     * @date 2020-03-20 14:52:00
     * @Description 首页跳转模块
     * @param id
     * @param request
     * @return java.lang.String
     **/
    @RequestMapping("/indexS/{id}")
    public String index(@PathVariable String id, HttpServletRequest request){
        request.setAttribute("indexid",id);
     return "/index_page.html";
    }
}
