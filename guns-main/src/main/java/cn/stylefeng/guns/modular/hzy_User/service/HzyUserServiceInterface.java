package cn.stylefeng.guns.modular.hzy_User.service;

import cn.stylefeng.guns.base.pojo.page.LayuiPageInfo;
import cn.stylefeng.guns.modular.hzy_User.entity.HzyUser;
import cn.stylefeng.guns.modular.hzy_User.entity.HzyUserParam;
import cn.stylefeng.guns.modular.hzy_User.entity.HzyUserPos;
import cn.stylefeng.guns.modular.hzy_User.entity.HzyUserPosResult;
import cn.stylefeng.guns.sys.modular.system.model.params.UserPosParam;
import cn.stylefeng.guns.sys.modular.system.model.result.UserPosResult;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

public interface HzyUserServiceInterface extends IService<HzyUserPos> {
    /**
     * 新增
     * @Date 2019-06-28
     */
    void add(HzyUserParam user);

    /**
     * 删除
     * @Date 2019-06-28
     */
    void delete(HzyUserParam user);

    /**
     * 更新
     * @Date 2019-06-28
     */
    void update(HzyUserParam user);

    /**
     * 查询单条数据，Specification模式
     * @Date 2019-06-28
     */
    HzyUserPosResult findBySpec(HzyUserParam user);

    /**
     * 查询列表，Specification模式
     * @Date 2019-06-28
     */
    List<HzyUserPosResult> findListBySpec(HzyUserParam user);

    /**
     * 查询分页数据，Specification模式
     * @Date 2019-06-28
     */
    LayuiPageInfo findPageBySpec(HzyUserParam user);

}
