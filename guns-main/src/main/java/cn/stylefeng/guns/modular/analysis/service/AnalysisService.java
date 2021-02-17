package cn.stylefeng.guns.modular.analysis.service;

import cn.stylefeng.guns.modular.analysis.entity.AnalysisEntity;
import cn.stylefeng.guns.modular.analysis.mapper.AnalysisMapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

/**
 * @Description 能耗分析 service
 * @Author zzb
 * @Date 2020/4/8 9:46
 **/
@Service
@RequestMapping
public class AnalysisService {

    @Autowired
    private AnalysisMapper mapper;

    public List<AnalysisEntity> selectList(String startTime, String endTime) {
        return mapper.selectList(startTime, endTime);
    }

    public int insertList(List<AnalysisEntity> list) {
        return mapper.insertList(list);
    }

    public Map<String, Timestamp> getMaxAndMinDate() {
        Map<String, Timestamp> map = mapper.getMaxAndMinDate();
        Timestamp maxTime = map.get("maxTime");
        return map;
    }
}
