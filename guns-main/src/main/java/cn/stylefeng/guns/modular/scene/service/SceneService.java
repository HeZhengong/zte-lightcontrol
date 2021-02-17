package cn.stylefeng.guns.modular.scene.service;

import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.modular.scene.entity.SceneEntity;
import cn.stylefeng.guns.modular.scene.mapper.SceneMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author wujianghao
 * @Title: 场景
 * @ProjectName guns-architecture
 * @Description:
 * @date 2020/3/5 10:02 上午
 */
@Service
public class SceneService extends ServiceImpl<SceneMapper, SceneEntity> {

    @Autowired
    private SceneMapper mapper;

    public Page selectPage(SceneEntity entity) {
        Page page = LayuiPageFactory.defaultPage();
        page.setRecords(mapper.selectList(page,entity));
        return page;
    }

}
