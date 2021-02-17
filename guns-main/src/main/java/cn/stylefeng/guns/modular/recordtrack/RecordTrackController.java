package cn.stylefeng.guns.modular.recordtrack;

import cn.stylefeng.roses.core.base.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author wujianghao
 * @Title: RecordTrackController
 * @ProjectName guns-architecture
 * @Description: 监控管理，登入记录，操作记录
 * @date 2020/3/16 10:37 上午
 */
@Controller
@RequestMapping("/recordTrack")
public class RecordTrackController extends BaseController {


    /***
     * @Author wujianghao
     * @Description 页面路径
     * @Date 10:39 上午 2020/3/16
     * @Param 
     * @return 
     **/
    private static String PREFIX = "/recordtracking";

    
    /***
     * @Author wujianghao
     * @Description 页面默认请求跳转
     * @Date 10:39 上午 2020/3/16
     * @Param []
     * @return java.lang.String
     **/
    @RequestMapping("")
    public String index() {
        return PREFIX + "/recordtrack.html";
    }


}
