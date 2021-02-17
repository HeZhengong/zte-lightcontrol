package cn.stylefeng.guns.modular.scene.mapper;

import cn.stylefeng.guns.modular.scene.entity.SceneEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author wujianghao
 * @Title: 场景
 * @ProjectName guns-architecture
 * @Description:
 * @date 2020/3/5 10:02 上午
 */
@Repository
public interface SceneMapper extends BaseMapper<SceneEntity> {

    List<SceneEntity> selectList(@Param("page") Page page, @Param("scene") SceneEntity entity);

}