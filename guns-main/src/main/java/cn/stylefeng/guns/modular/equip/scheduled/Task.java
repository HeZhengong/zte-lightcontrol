package cn.stylefeng.guns.modular.equip.scheduled;

import cn.stylefeng.guns.modular.equip.entity.EquipEntity;
import cn.stylefeng.guns.modular.equip.mapper.EquipMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true, rollbackFor = Exception.class)
public class Task {

    @Autowired
    private EquipMapper mapper;

    @Scheduled(cron = "0 */5 * * * ?")
    @Transactional(rollbackFor = Exception.class)
    public void equipTask() {
        EquipEntity entity=new EquipEntity();
        //todo 需调接口，修改设备的状态以及电箱的状态
        mapper.updateStatus(entity);
        //todo 设备回路的状态，待定

    }
}
