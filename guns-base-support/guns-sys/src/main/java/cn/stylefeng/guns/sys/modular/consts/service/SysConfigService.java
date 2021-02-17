package cn.stylefeng.guns.sys.modular.consts.service;

import cn.stylefeng.guns.base.pojo.page.LayuiPageInfo;
import cn.stylefeng.guns.sys.modular.consts.entity.SysConfig;
import cn.stylefeng.guns.sys.modular.consts.model.params.SysConfigParam;
import cn.stylefeng.guns.sys.modular.consts.model.result.SysConfigResult;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 参数配置 服务类
 * </p>
 2019-06-20
 */
public interface SysConfigService extends IService<SysConfig> {

    /**
     * 新增
      * @Date 2019-06-20
     */
    void add(SysConfigParam param);

    /**
     * 删除
      * @Date 2019-06-20
     */
    void delete(SysConfigParam param);

    /**
     * 更新
      * @Date 2019-06-20
     */
    void update(SysConfigParam param);

    /**
     * 查询单条数据，Specification模式
      * @Date 2019-06-20
     */
    SysConfigResult findBySpec(SysConfigParam param);

    /**
     * 查询列表，Specification模式
      * @Date 2019-06-20
     */
    List<SysConfigResult> findListBySpec(SysConfigParam param);

    /**
     * 查询分页数据，Specification模式
      * @Date 2019-06-20
     */
    LayuiPageInfo findPageBySpec(SysConfigParam param);

}
