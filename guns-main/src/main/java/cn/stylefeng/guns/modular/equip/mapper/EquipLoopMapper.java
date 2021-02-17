package cn.stylefeng.guns.modular.equip.mapper;

import cn.stylefeng.guns.modular.equip.entity.EquipLoopEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author wujianghao
 * @Title: 设备回路管理
 * @ProjectName guns-architecture
 * @Description:
 * @date 2020/3/5 10:02 上午
 */
@Repository
public interface EquipLoopMapper extends BaseMapper<EquipLoopEntity> {

    List<EquipLoopEntity> selectList(@Param("equipId")Long equipId);

    void updateStatus(@Param("status")String status,@Param("equipId")Long equipId,@Param("id")String[] id);

    void setClose(@Param("equipId")Long equipId);

    void setDisabled(String[] ids);

    List<EquipLoopEntity> queryList(@Param("page")Page page, @Param("equipLoop")EquipLoopEntity entity);

}