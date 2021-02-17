package cn.stylefeng.guns.modular.statistics.controller;

import cn.stylefeng.guns.modular.analysis.entity.AnalysisEntity;
import cn.stylefeng.guns.modular.statistics.service.StatisticsService;
import cn.stylefeng.roses.core.base.controller.BaseController;
import cn.stylefeng.roses.core.reqres.response.ResponseData;
import cn.stylefeng.roses.core.reqres.response.SuccessResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @Description energy statistics 能耗统计 statisticsController
 * @Author zzb
 * @Date 2020/3/31 10:35
 **/
@Controller
@RequestMapping("/energy/statistics")
public class StatisticsController extends BaseController {

    @Autowired
    private StatisticsService service;

    private String PREFIX = "/energy/statistics/";

    @RequestMapping("")
    public String index() {
        return PREFIX + "statistics.html";
    }

    /**
     * 查询范围
     * @param startTime
     * @param endTime
     * @return
     */
    @ResponseBody
    @RequestMapping("selectList")
    public ResponseData selectList(String startTime, String endTime) {
        List<AnalysisEntity> list = service.selectList(startTime, endTime);
        return new SuccessResponseData(
                ResponseData.DEFAULT_SUCCESS_CODE,
                ResponseData.DEFAULT_SUCCESS_MESSAGE,
                list);
    }

    /**
     * 查询范围  根据 group by 月
     * @param startTime
     * @param endTime
     * @return
     */
    @ResponseBody
    @RequestMapping("selectListGroupByMonth")
    public ResponseData selectListGroupByMonth(String startTime, String endTime) {
        List<AnalysisEntity> list = service.selectListGroupByMonth(startTime, endTime);
        return new SuccessResponseData(
                ResponseData.DEFAULT_SUCCESS_CODE,
                ResponseData.DEFAULT_SUCCESS_MESSAGE,
                list);
    }

    /**
     * 查询范围  根据 group by 年
     * @param startTime
     * @param endTime
     * @return
     */
    @ResponseBody
    @RequestMapping("selectListGroupByYear")
    public ResponseData selectListGroupByYear(String startTime, String endTime) {
        List<AnalysisEntity> list = service.selectListGroupByYear(startTime, endTime);
        return new SuccessResponseData(
                ResponseData.DEFAULT_SUCCESS_CODE,
                ResponseData.DEFAULT_SUCCESS_MESSAGE,
                list);
    }
}
