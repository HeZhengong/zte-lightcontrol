package cn.stylefeng.guns.modular.automation.service;

import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.modular.automation.entity.AutomationEntity;
import cn.stylefeng.guns.modular.automation.mapper.AutomationMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author wujianghao
 * @Title: 自动化
 * @ProjectName guns-architecture
 * @Description:
 * @date 2020/3/5 10:02 上午
 */
@Service
public class AutomationService extends ServiceImpl<AutomationMapper,AutomationEntity> {

    @Autowired
    private AutomationMapper mapper;

    public Page selectPage(AutomationEntity entity) {
        Page page = LayuiPageFactory.defaultPage();
        page.setRecords(mapper.selectList(page,entity));
        return page;
    }

}
