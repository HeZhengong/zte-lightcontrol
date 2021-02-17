package cn.stylefeng.guns.modular.hzy_User.mapper;

import cn.stylefeng.guns.modular.hzy_User.entity.HzyUser;
import cn.stylefeng.guns.modular.hzy_User.entity.HzyUserParam;
import cn.stylefeng.roses.core.datascope.DataScope;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 管理员表 Mapper 接口
 * </p>
 2018-12-07Pos
 */
public interface HzyUserMapper extends BaseMapper<HzyUser> {

    /**
     * 修改用户状态
     */
    int setStatus(@Param("userId") Long userId, @Param("status") String status);

    /**
     * 修改密码
     */
    int changePwd(@Param("userId") Long userId, @Param("pwd") String pwd);

    /**
     * 根据条件查询用户列表
     */
    Page<Map<String, Object>> selectUsers(@Param("page") Page page,
                                          @Param("dataScope") DataScope dataScope,
                                          @Param("name") String name,
                                          @Param("beginTime") String beginTime,
                                          @Param("endTime") String endTime,
                                          @Param("deptId") Long deptId);

    /**
     * 根据条件查询用户列表 多条件查询
     */
    Page<Map<String, Object>> selectUsers2(@Param("page") Page page,
                                           @Param("dataScope") DataScope dataScope,
                                           @Param("name") String name,
                                           @Param("beginTime") String beginTime,
                                           @Param("endTime") String endTime,
                                           @Param("deptId") Long deptId,
                                           @Param("account") String account,
                                           @Param("phone") String phone,
                                           @Param("roleId") Long roleId);

    /**
     * 根据条件查询用户列表 不分页
     */
    List<HzyUser> selectUsers3(
            @Param("account") String account,
            @Param("phone") String phone,
            @Param("roleId") Long roleId);

    /**
     * 根据条件查询用户列表（根据角色）
     */
    Page<Map<String, Object>> selectUsersByRole(@Param("page") Page page,
                                                @Param("name") String name,
                                                @Param("beginTime") String beginTime,
                                                @Param("endTime") String endTime,
                                                @Param("roleId") String roleId);

    /**
     * 设置用户的角色
     */
    int setRoles(@Param("userId") Long userId, @Param("roleIds") String roleIds);

    /**
     * 通过账号获取用户
     */
    HzyUser getByAccount(@Param("account") String account);

    /**
     * 选择办理人
     */
    IPage<Map<String, Object>> listUserAndRoleExpectAdmin(Page page);

    List<Map<String, Object>> listRole();

    IPage customPageList(Page pageContext, HzyUserParam hzyUser);
}
