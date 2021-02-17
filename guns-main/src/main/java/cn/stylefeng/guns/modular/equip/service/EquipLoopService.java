package cn.stylefeng.guns.modular.equip.service;

import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.modular.equip.entity.EquipLoopEntity;
import cn.stylefeng.guns.modular.equip.mapper.EquipLoopMapper;
import cn.stylefeng.roses.core.util.ToolUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author wujianghao
 * @Title: 设备管理
 * @ProjectName guns-architecture
 * @Description:
 * @date 2020/3/5 10:02 上午
 */
@Service
public class EquipLoopService extends ServiceImpl<EquipLoopMapper, EquipLoopEntity> {

    @Autowired
    private EquipLoopMapper mapper;

    @Transactional(rollbackFor = Exception.class)
    public void add(Long equipId,int loopCount) {
        List<EquipLoopEntity> list=new ArrayList<>();
        for(int i=1;i<=loopCount;i++){
            EquipLoopEntity entity=new EquipLoopEntity();
            entity.setEquipId(equipId);
            entity.setNo(String.valueOf(i));
            entity.setName("回路"+i);
            list.add(entity);
        }
        this.saveBatch(list);
    }

    public void delete(Long equipId) {
        Map<String, Object> columnMap=new HashMap<>();
        columnMap.put("equipId",equipId);
         this.removeByMap(columnMap);
    }

    @Transactional(rollbackFor = Exception.class)
    public void update(EquipLoopEntity entity) {
        EquipLoopEntity oldEntity = getById(entity.getId());
        ToolUtil.copyProperties(entity, oldEntity);
        this.updateById(oldEntity);
    }

    public List<EquipLoopEntity> selectList(Long equipId) {
        return mapper.selectList(equipId);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateStatus(String status,Long equipId,String[] id){
        mapper.updateStatus(status,equipId,id);
        //todo 需调接口，把命令下发给设备的回路

    }

    @Transactional(rollbackFor = Exception.class)
    public void setClose(Long equipId){
        mapper.setClose(equipId);
    }

    @Transactional(rollbackFor = Exception.class)
    public void setDisabled(String[] ids){
        mapper.setDisabled(ids);
    }

    public List<EquipLoopEntity> queryList(EquipLoopEntity entity) {
        return mapper.queryList(new Page(),entity);
    }

    public Page queryPage(EquipLoopEntity entity) {
        Page page = LayuiPageFactory.defaultPage();
        page.setRecords(mapper.queryList(page,entity));
        return page;
    }

}
