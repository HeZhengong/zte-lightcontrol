package cn.stylefeng.guns.modular.equip.mapper;

import cn.stylefeng.guns.modular.equip.entity.EquipGroupEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author wujianghao
 * @Title: 设备分组管理
 * @ProjectName guns-architecture
 * @Description:
 * @date 2020/3/5 10:02 上午
 */
@Repository
public interface EquipGroupMapper extends BaseMapper<EquipGroupEntity> {

    List<EquipGroupEntity> selectList(EquipGroupEntity entity);

}