package cn.stylefeng.guns.modular.hzy_User.mapper;

import cn.stylefeng.guns.modular.hzy_User.entity.HzyUser;
import cn.stylefeng.guns.modular.hzy_User.entity.HzyUserParam;
import cn.stylefeng.guns.modular.hzy_User.entity.HzyUserPos;
import cn.stylefeng.guns.modular.hzy_User.entity.HzyUserPosResult;
import cn.stylefeng.guns.sys.modular.system.model.params.UserPosParam;
import cn.stylefeng.guns.sys.modular.system.model.result.UserPosResult;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface HzyPosMapper extends BaseMapper<HzyUserPos> {
    List<HzyUserPosResult> HzyCustomList(@Param("hzyCondition") HzyUserParam hzyCondition);

    /**
     * 获取map列表
     * @Date 2019-06-28
     */
    List<Map<String, Object>> HzyCustomMapList(@Param("hzyCondition") HzyUserParam hzyCondition);

    /**
     * 获取分页实体列表
     * @Date 2019-06-28
     */
    Page<HzyUserPosResult> HzyCustomPageList(@Param("page") Page page, @Param("hzyCondition") HzyUserParam hzyCondition);

    /**
     * 获取分页map列表
     * @Date 2019-06-28
     */
    Page<Map<String, Object>> HzyCustomPageMapList(@Param("page") Page page, @Param("hzyCondition") HzyUserParam hzyCondition);


}
