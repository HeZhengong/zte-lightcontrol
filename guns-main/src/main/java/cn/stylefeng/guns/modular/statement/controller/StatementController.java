package cn.stylefeng.guns.modular.statement.controller;

import cn.stylefeng.guns.modular.analysis.entity.AnalysisEntity;
import cn.stylefeng.guns.modular.equip.entity.EquipEntity;
import cn.stylefeng.guns.modular.statement.entity.StatementAlarmEntity;
import cn.stylefeng.guns.modular.statement.entity.StatementEquipEntity;
import cn.stylefeng.guns.modular.statement.entity.StatementWorkOrderEntity;
import cn.stylefeng.guns.modular.statement.service.StatementService;
import cn.stylefeng.guns.util.ExcelExport;
import cn.stylefeng.roses.core.base.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

/**
 * @Description 统计报表 controller，设备报表 故障报表 工单报表 能耗报表 数据导出
 * @Author zzb
 * @Date 2020/4/3 14:17
 **/
@Controller
@RequestMapping("/statement")
public class StatementController extends BaseController {

    @Autowired
    private StatementService service;

    private final String PREFIX = "/statement/";

    @RequestMapping("")
    public String index() {
        return PREFIX + "statement.html";
    }

    /**
     * 设备报表 数据导出
     */
    @RequestMapping("/equip")
    public void exportEquip(@RequestParam(value = "exportTime") String timeLimit, HttpServletResponse response) {
        //创建一个不为空的 非空值容器， ifPresent(Consumer consumer) 如果值为空则抛出异常 主动抛异常
        Optional<String[]> optional =
                Optional.ofNullable(timeLimit)
                .filter((str) -> !("".equals(str)))
                .map(str -> str.replaceAll("\\s+", ""))
                .map(str -> str.split("至"));
        //如果存在 就消费这个 optional 容器
        optional.ifPresent((strings) -> {
            String startTime = strings[0];
            String endTime = strings[1];
            ExcelExport.exportExcel(service.selectListEquip(startTime, endTime),"XXX项目设备报表","设备信息",StatementEquipEntity.class,"设备信息表" + System.currentTimeMillis() + ".xls",response);
        });
    }

    /**
     * 能耗统计 数据导出
     */
    @RequestMapping("/energy")
    public void exportEnergy(@RequestParam(value = "exportTime") String timeLimit, HttpServletResponse response) {
        //创建一个不为空的 非空值容器， ifPresent(Consumer consumer) 如果值为空则抛出异常 主动抛异常
        Optional<String[]> optional =
                Optional.ofNullable(timeLimit)
                        .filter((str) -> !("".equals(str)))
                        .map(str -> str.replaceAll("\\s+", ""))
                        .map(str -> str.split("至"));
        //如果存在 就消费这个 optional 容器
        optional.ifPresent((strings) -> {
            String startTime = strings[0];
            String endTime = strings[1];
            ExcelExport.exportExcel(service.selectListEnergy(startTime, endTime),"能耗信息表","能耗信息",AnalysisEntity.class,"能耗信息表" + System.currentTimeMillis() + ".xls",response);
        });
    }

    /**
     * 故障报表 数据导出
     */
    @RequestMapping("/alarm")
    public void exportAlarm(@RequestParam(value = "exportTime") String timeLimit, HttpServletResponse response) {
        //创建一个不为空的 非空值容器， ifPresent(Consumer consumer) 如果值为空则抛出异常 主动抛异常
        Optional<String[]> optional =
                Optional.ofNullable(timeLimit)
                        .filter((str) -> !("".equals(str)))
                        .map(str -> str.replaceAll("\\s+", ""))
                        .map(str -> str.split("至"));
        //如果存在 就消费这个 optional 容器
        optional.ifPresent((strings) -> {
            String startTime = strings[0];
            String endTime = strings[1];
            ExcelExport.exportExcel(service.selectListAlarm(startTime, endTime),"故障报表表","故障报表",StatementAlarmEntity.class,"故障报表表" + System.currentTimeMillis() + ".xls",response);
        });
    }

    /**
     * 工单报表 数据导出
     */
    @RequestMapping("/workOrder")
    public void exportWorkOrder(@RequestParam(value = "exportTime") String timeLimit, HttpServletResponse response) {
        //创建一个不为空的 非空值容器， ifPresent(Consumer consumer) 如果值为空则抛出异常 主动抛异常
        Optional<String[]> optional =
                Optional.ofNullable(timeLimit)
                        .filter((str) -> !("".equals(str)))
                        .map(str -> str.replaceAll("\\s+", ""))
                        .map(str -> str.split("至"));
        //如果存在 就消费这个 optional 容器
        optional.ifPresent((strings) -> {
            String startTime = strings[0];
            String endTime = strings[1];
            ExcelExport.exportExcel(service.selectListWorkOrder(startTime, endTime),"工单报表表","工单报表",StatementWorkOrderEntity.class,"工单报表表" + System.currentTimeMillis() + ".xls",response);
        });
    }

}
