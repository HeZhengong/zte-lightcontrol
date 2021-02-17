package cn.stylefeng.guns.modular.equip.mapper;

import cn.stylefeng.guns.modular.equip.entity.EquipEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author wujianghao
 * @Title: 设备管理
 * @ProjectName guns-architecture
 * @Description:
 * @date 2020/3/5 10:02 上午
 */
@Repository
public interface EquipMapper extends BaseMapper<EquipEntity> {

    List<EquipEntity> selectList(@Param("page") Page page, @Param("equip") EquipEntity entity);

    void updateStatus(EquipEntity entity);

    int count();

    List<Map> countType();

    int check(EquipEntity entity);
}