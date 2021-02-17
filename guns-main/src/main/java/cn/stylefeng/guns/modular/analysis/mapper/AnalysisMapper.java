package cn.stylefeng.guns.modular.analysis.mapper;

import cn.stylefeng.guns.modular.analysis.entity.AnalysisEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

/**
 * @Description ${}
 * @Author AnalysisMapper
 * @Date 2020/4/8 9:22
 **/
@Repository
public interface AnalysisMapper {

    /**
     * 根据 起始结束 时间 查询
     * @param startTime
     * @param endTime
     * @return
     */
    List<AnalysisEntity> selectList(@Param("startTime") String startTime, @Param("endTime") String endTime);


    int insertList(@Param("list") List<AnalysisEntity> list);

    Map<String, Timestamp> getMaxAndMinDate();
}
