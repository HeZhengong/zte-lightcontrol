package cn.stylefeng.guns.modular.automation.mapper;

import cn.stylefeng.guns.modular.automation.entity.AutomationEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author wujianghao
 * @Title: 自动化
 * @ProjectName guns-architecture
 * @Description:
 * @date 2020/3/5 10:02 上午
 */
@Repository
public interface AutomationMapper extends BaseMapper<AutomationEntity> {

    List<AutomationEntity> selectList(@Param("page") Page page, @Param("automation") AutomationEntity entity);

}