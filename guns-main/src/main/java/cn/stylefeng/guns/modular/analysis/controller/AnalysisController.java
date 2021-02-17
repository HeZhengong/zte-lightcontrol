package cn.stylefeng.guns.modular.analysis.controller;

import cn.stylefeng.guns.modular.analysis.entity.AnalysisEntity;
import cn.stylefeng.guns.modular.analysis.service.AnalysisService;
import cn.stylefeng.roses.core.base.controller.BaseController;
import cn.stylefeng.roses.core.reqres.response.ResponseData;
import cn.stylefeng.roses.core.reqres.response.SuccessResponseData;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * @Description 能耗分析 controller
 * @Author zzb
 * @Date 2020/4/3 8:51
 **/
@Controller
@RequestMapping("/energy/analysis")
public class AnalysisController /*extends BaseController*/ {

    @Autowired
    private AnalysisService service;

    private final String PREFIX = "/energy/analysis/";

    @RequestMapping("")
    public String index() {
        return PREFIX + "analysis.html";
    }

    @ResponseBody
    @RequestMapping("selectList")
    public ResponseData selectList(String startTime, String endTime) {
        List<AnalysisEntity> list = service.selectList(startTime, endTime);
        return new SuccessResponseData(
                ResponseData.DEFAULT_SUCCESS_CODE,
                ResponseData.DEFAULT_SUCCESS_MESSAGE,
                list);
    }

    @ResponseBody
    @RequestMapping("getMaxAndMinDate")
    public ResponseData getMaxAndMinDate() {

        String[] strArray = Optional.ofNullable(service.getMaxAndMinDate())
                .map(map -> {
                    //jdk 8 日期类
                    DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                    String maxTime = map.get("maxTime").toLocalDateTime().format(outputFormatter);
                    String minTime = map.get("minTime").toLocalDateTime().format(outputFormatter);
                    String[] strings = {maxTime, minTime};
                    return strings;
                }).get();

        return new SuccessResponseData(
                ResponseData.DEFAULT_SUCCESS_CODE,
                ResponseData.DEFAULT_SUCCESS_MESSAGE,
                strArray);
    }

    /*@RequestMapping("insertList")*/
    @ResponseBody
    public ResponseData insertList() {

        //jdk8 新的日期类
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime oldDate = LocalDateTime.parse("2017-04-07 00:00:00", formatter);
        LocalDateTime currentDate = LocalDateTime.parse("2020-04-09 00:00:00", formatter);
        LinkedList<AnalysisEntity> list = new LinkedList<>();

        Random random = new Random();
        while (currentDate.isAfter(oldDate)) {
            AnalysisEntity entity = new AnalysisEntity();
            /*#{analysisEntity.id},
            #{analysisEntity.theoryElectricity},
            #{analysisEntity.actualElectricity},
            #{analysisEntity.saveElectricity},
            #{analysisEntity.saveWater},
            #{analysisEntity.CO2},
            #{analysisEntity.SO2},
            #{analysisEntity.saveDerv},
            #{analysisEntity.saveCoal},*/
            entity.setId(String.valueOf(IdWorker.getId()));
            entity.setTheoryElectricity(String.valueOf((int) (random.nextDouble() * 25 + 1 + 75)));
            entity.setActualElectricity(String.valueOf((int) (random.nextDouble() * 25 + 1 + 75)));
            entity.setSaveElectricity(String.valueOf((int) (random.nextDouble() * 25 + 1 + 75)));
            entity.setSaveWater(String.valueOf((int) (random.nextDouble() * 25 + 1 + 75)));
            entity.setCO2(String.valueOf((int) (random.nextDouble() * 55 + 1 + 45)));
            entity.setSO2(String.valueOf((int) (random.nextDouble() * 55 + 1 + 45)));
            entity.setSaveCoal(String.valueOf((int) (random.nextDouble() * 55 + 1 + 45)));
            entity.setSaveDerv(String.valueOf((int) (random.nextDouble() * 55 + 1 + 45)));
            entity.setCreateTime(oldDate.format(formatter));
            /*entity.setCreateUser(null);*/
            entity.setUpdateTime(null);
            /*entity.setUpdateUser(null);*/
            entity.setDel(false);
            list.add(entity);

            oldDate = oldDate.plusDays(1);
            if (list.size() == 500) {
                service.insertList(list);
                list.clear();
            }
        }

        int number = service.insertList(list);
        return new SuccessResponseData(
                ResponseData.DEFAULT_SUCCESS_CODE,
                ResponseData.DEFAULT_SUCCESS_MESSAGE,
                number);
    }

}
