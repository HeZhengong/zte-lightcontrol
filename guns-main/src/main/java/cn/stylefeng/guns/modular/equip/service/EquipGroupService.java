package cn.stylefeng.guns.modular.equip.service;

import cn.stylefeng.guns.modular.equip.entity.EquipGroupEntity;
import cn.stylefeng.guns.modular.equip.mapper.EquipGroupMapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author wujianghao
 * @Title: 设备管理
 * @ProjectName guns-architecture
 * @Description:
 * @date 2020/3/5 10:02 上午
 */
@Service
public class EquipGroupService extends ServiceImpl<EquipGroupMapper, EquipGroupEntity> {

    @Autowired
    private EquipGroupMapper mapper;

    public List<EquipGroupEntity> selectList(EquipGroupEntity entity){
        return mapper.selectList(entity);
    }

}
