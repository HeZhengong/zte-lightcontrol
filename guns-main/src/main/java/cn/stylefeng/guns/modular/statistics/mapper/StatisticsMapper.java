package cn.stylefeng.guns.modular.statistics.mapper;

import cn.stylefeng.guns.modular.analysis.entity.AnalysisEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Description ${}
 * @Author StatisticsMapper
 * @Date 2020/4/9 13:53
 **/
@Repository
public interface StatisticsMapper {


    /**
     * 根据 起始结束 时间 查询
     * @param startTime
     * @param endTime
     * @return
     */
    List<AnalysisEntity> selectList(@Param("startTime") String startTime, @Param("endTime") String endTime);

    List<AnalysisEntity> selectListGroupByMonth(@Param("startTime") String startTime, @Param("endTime") String endTime);

    List<AnalysisEntity> selectListGroupByYear(@Param("startTime") String startTime, @Param("endTime") String endTime);
}
