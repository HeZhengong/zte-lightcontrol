package cn.stylefeng.guns.modular.equip.service;

import cn.stylefeng.guns.modular.equip.entity.EquipCurrentEntity;
import cn.stylefeng.guns.modular.equip.mapper.EquipCurrentMapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * @author wujianghao
 * @Title: 设备三相电流
 * @ProjectName guns-architecture
 * @Description:
 * @date 2020/3/5 10:02 上午
 */
@Service
public class EquipCurrentService extends ServiceImpl<EquipCurrentMapper, EquipCurrentEntity> {

    public EquipCurrentEntity get(EquipCurrentEntity entity) {
        entity=this.getById(entity);
        return entity;
    }


}
