package cn.stylefeng.guns.modular.hzy_User.service;

import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.base.pojo.page.LayuiPageInfo;
import cn.stylefeng.guns.modular.hzy_User.entity.HzyUserParam;
import cn.stylefeng.guns.modular.hzy_User.entity.HzyUserPos;
import cn.stylefeng.guns.modular.hzy_User.entity.HzyUserPosResult;
import cn.stylefeng.guns.modular.hzy_User.mapper.HzyPosMapper;
import cn.stylefeng.guns.sys.modular.system.entity.UserPos;
import cn.stylefeng.guns.sys.modular.system.mapper.UserPosMapper;
import cn.stylefeng.guns.sys.modular.system.model.params.UserPosParam;
import cn.stylefeng.guns.sys.modular.system.model.result.UserPosResult;
import cn.stylefeng.guns.sys.modular.system.service.UserPosService;
import cn.stylefeng.roses.core.util.ToolUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;

@Service
public class HzyUserPosServiceImpl extends ServiceImpl<HzyPosMapper, HzyUserPos> implements HzyUserServiceInterface {

    @Override
    public void add(HzyUserParam hzyUserParam){
        HzyUserPos entity = getEntity(hzyUserParam);
        this.save(entity);
    }

    @Override
    public void delete(HzyUserParam hzyUserParam){
        this.removeById(getKey(hzyUserParam));
    }

    @Override
    public void update(HzyUserParam hzyUserParam){
        HzyUserPos oldEntity = getOldEntity(hzyUserParam);
        HzyUserPos newEntity = getEntity(hzyUserParam);
        ToolUtil.copyProperties(newEntity, oldEntity);
        this.updateById(newEntity);
    }

    @Override
    public HzyUserPosResult findBySpec(HzyUserParam hzyUserParam){
        return null;
    }

    @Override
    public List<HzyUserPosResult> findListBySpec(HzyUserParam hzyUserParam){
        return null;
    }

    @Override
    public LayuiPageInfo findPageBySpec(HzyUserParam hzyUserParam){
        Page pageContext = getPageContext();
        IPage page = this.baseMapper.HzyCustomPageList(pageContext, hzyUserParam);
        return LayuiPageFactory.createPageInfo(page);
    }

    private Serializable getKey(HzyUserParam hzyUserParam){
        return hzyUserParam.getUserPosId();
    }

    private Page getPageContext() {
        return LayuiPageFactory.defaultPage();
    }

    private HzyUserPos getOldEntity(HzyUserParam hzyUserParam) {
        return this.getById(getKey(hzyUserParam));
    }

    private HzyUserPos getEntity(HzyUserParam hzyUserParam) {
        HzyUserPos entity = new HzyUserPos();
        ToolUtil.copyProperties(hzyUserParam, entity);
        return entity;
    }

}
