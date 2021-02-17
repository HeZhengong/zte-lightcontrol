package cn.stylefeng.guns.modular.statistics.service;

import cn.stylefeng.guns.modular.analysis.entity.AnalysisEntity;
import cn.stylefeng.guns.modular.statistics.mapper.StatisticsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Description 能耗统计service
 * @Author zzb
 * @Date 2020/4/9 13:57
 **/
@Service
public class StatisticsService {

    @Autowired
    private StatisticsMapper mapper;


    public List<AnalysisEntity> selectList(String startTime, String endTime) {
        return mapper.selectList(startTime, endTime);
    }

    public List<AnalysisEntity> selectListGroupByMonth(String startTime, String endTime) {
        return mapper.selectListGroupByMonth(startTime, endTime);
    }

    public List<AnalysisEntity> selectListGroupByYear(String startTime, String endTime) {
        return mapper.selectListGroupByYear(startTime, endTime);
    }



}
