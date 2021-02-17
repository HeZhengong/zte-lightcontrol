package cn.stylefeng.guns.modular.equip.service;

import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.modular.equip.entity.EquipEntity;
import cn.stylefeng.guns.modular.equip.entity.EquipLoopEntity;
import cn.stylefeng.guns.modular.equip.mapper.EquipMapper;
import cn.stylefeng.roses.core.util.ToolUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
public class EquipService extends ServiceImpl<EquipMapper, EquipEntity> {

    @Autowired
    private EquipMapper mapper;

    @Autowired
    private EquipLoopService loopService;

    @Autowired
    private EquipCurrentService currentService;

    @Transactional(rollbackFor = Exception.class)
    public void add(EquipEntity entity) {
        this.save(entity);
        loopService.add(entity.getId(),entity.getLoopCount());
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(EquipEntity entity) {
         this.removeById(entity.getId());
         loopService.delete(entity.getId());
    }

    @Transactional(rollbackFor = Exception.class)
    public void update(EquipEntity entity) {
        EquipEntity oldEntity = getById(entity.getId());
        ToolUtil.copyProperties(entity, oldEntity);
         this.updateById(oldEntity);
         //先关闭
         loopService.setClose(oldEntity.getId());
         //再禁用
         if(ToolUtil.isNotEmpty(entity.getLoops())){
             String[] arr=entity.getLoops().split(",");
             loopService.setDisabled(arr);
         }
    }

    public EquipEntity get(EquipEntity entity) {
        entity=this.getById(entity);
        StringBuilder sb=new StringBuilder();
        for (EquipLoopEntity loop:loopService.selectList(entity.getId())){
            if("3".equals(loop.getStatus())){
                sb.append(loop.getId()).append(",");
            }
        }
        entity.setLoops(sb.toString());
        entity.setEquipCurrent(currentService.getById(entity.getNo()));
        return entity;
    }

    public List<EquipEntity> selectList(EquipEntity entity) {
        return mapper.selectList(new Page(),entity);
    }

    public Page selectPage(EquipEntity entity) {
        Page page = LayuiPageFactory.defaultPage();
        page.setRecords(mapper.selectList(page,entity));
        return page;
    }

    //统计在线数量
    public int count(){
       return mapper.count();
    }

    //统计设备类型以及数量
    public List<Map> countType(){
        return mapper.countType();
    }

    //验证字段是否重复
    public boolean check(EquipEntity entity) {
        int count = mapper.check(entity);
        return ToolUtil.isEmpty(entity.getId()) && count == 0 || ToolUtil.isNotEmpty(entity.getId()) && count <= 1;
    }
}
