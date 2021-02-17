package cn.stylefeng.guns.modular.hzy_User.service;

//import cn.stylefeng.guns.modular.hzy_User.entity.HzyUser;
//import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Map;
//
//
//public interface HzyUserService {
//    public List<HzyUser> findAll();
//    public void EditUser(HzyUser User);
//
//    public void AddUser(HzyUser newUser);
//    public void DeleteUser(HzyUser AbandonedUser);
//
//    Page<Map<String, Object>> selectUsers2(Object o, String name, String beginTime, String endTime, Long deptId, String account, String phone, Long roleId);
//}


import cn.afterturn.easypoi.excel.ExcelExportUtil;
import cn.afterturn.easypoi.excel.entity.ExportParams;
import cn.hutool.core.collection.CollectionUtil;
import cn.stylefeng.guns.base.auth.context.LoginContextHolder;
import cn.stylefeng.guns.base.auth.model.LoginUser;
import cn.stylefeng.guns.base.pojo.node.MenuNode;
import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.modular.hzy_User.entity.HzyUser;
import cn.stylefeng.guns.modular.hzy_User.entity.HzyUserDto;
import cn.stylefeng.guns.modular.hzy_User.entity.HzyUserPos;
import cn.stylefeng.guns.modular.hzy_User.factory.HzyUserFactory;
import cn.stylefeng.guns.modular.hzy_User.mapper.HzyPosMapper;
import cn.stylefeng.guns.modular.hzy_User.mapper.HzyUserMapper;
import cn.stylefeng.guns.sys.core.constant.Const;
import cn.stylefeng.guns.sys.core.constant.factory.ConstantFactory;
import cn.stylefeng.guns.sys.core.constant.state.ManagerStatus;
import cn.stylefeng.guns.sys.core.exception.enums.BizExceptionEnum;
import cn.stylefeng.guns.sys.core.util.DefaultImages;
import cn.stylefeng.guns.sys.core.util.SaltUtil;
import cn.stylefeng.guns.sys.modular.system.entity.User;
import cn.stylefeng.guns.sys.modular.system.entity.UserPos;
import cn.stylefeng.guns.sys.modular.system.factory.UserFactory;
import cn.stylefeng.guns.sys.modular.system.mapper.UserMapper;
import cn.stylefeng.guns.sys.modular.system.model.UserDto;
import cn.stylefeng.guns.sys.modular.system.service.MenuService;
import cn.stylefeng.guns.sys.modular.system.service.UserPosService;
import cn.stylefeng.roses.core.datascope.DataScope;
import cn.stylefeng.roses.core.util.ToolUtil;
import cn.stylefeng.roses.kernel.model.exception.ServiceException;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 管理员表 服务实现类
 * </p>
 2018-12-07
 */
@Service
public class HzyUserService extends ServiceImpl<HzyUserMapper, HzyUser> {

    @Autowired
    private MenuService menuService;

    @Autowired
    private HzyUserServiceInterface hzyUserServiceInterface;

    /**
     * 添加用戶
     * @Date 2018/12/24 22:51
     */
    @Transactional(rollbackFor = Exception.class)
    public void addUser(HzyUserDto hzyUser) {

        // 判断账号是否重复
        HzyUser theUser = this.getByAccount(hzyUser.getAccount());
        if (theUser != null) {

            throw new ServiceException(BizExceptionEnum.USER_ALREADY_REG);
        }

        // 完善账号信息
        String salt = SaltUtil.getRandomSalt();
        String password = SaltUtil.md5Encrypt(hzyUser.getPassword(), salt);

        HzyUser newUser = HzyUserFactory.createUser(hzyUser, password, salt);
        this.save(newUser);

        //添加职位关联
        addPosition(hzyUser.getPosition(), newUser.getUserId());
    }

    /**
     * 修改用户
     * @Date 2018/12/24 22:53
     */
    @Transactional(rollbackFor = Exception.class)
    public void editUser(HzyUserDto user) {
        HzyUser oldUser = this.getById(user.getUserId());

        if (LoginContextHolder.getContext().hasRole(Const.ADMIN_NAME)) {
            HzyUser user1 = HzyUserFactory.editUser(user, oldUser);
            this.updateById(user1);
        } else {
            this.assertAuth(user.getUserId());
            LoginUser shiroUser = LoginContextHolder.getContext().getUser();
            if (shiroUser.getId().equals(user.getUserId())) {
                this.updateById(HzyUserFactory.editUser(user, oldUser));
            } else {
                throw new ServiceException(BizExceptionEnum.NO_PERMITION);
            }
        }

        //删除职位关联
        hzyUserServiceInterface.remove(new QueryWrapper<HzyUserPos>().eq("user_id", user.getUserId()));

        //添加职位关联
        addPosition(user.getPosition(), user.getUserId());
    }

    /**
     * 删除用户
     * @Date 2018/12/24 22:54
     */
    @Transactional(rollbackFor = Exception.class)
    public  void deleteUser(Long userId) {

        //不能删除超级管理员
        if (userId.equals(Const.ADMIN_ID)) {
            throw new ServiceException(BizExceptionEnum.CANT_DELETE_ADMIN);
        }
        this.assertAuth(userId);
        this.setStatus(userId, ManagerStatus.DELETED.getCode());

        //删除职位关联
        hzyUserServiceInterface.remove(new QueryWrapper<HzyUserPos>().eq("user_id", userId));
    }

    /**
     * 修改用户状态
     * @Date 2018/12/24 22:45
     */
    public int setStatus(Long userId, String status) {
        return this.baseMapper.setStatus(userId, status);
    }

    /**
     * 修改密码
     * @Date 2018/12/24 22:45
     */
    public void changePwd(String oldPassword, String newPassword) {
        Long userId = LoginContextHolder.getContext().getUser().getId();
        HzyUser user = this.getById(userId);

        String oldMd5 = SaltUtil.md5Encrypt(oldPassword, user.getSalt());

        if (user.getPassword().equals(oldMd5)) {
            String newMd5 = SaltUtil.md5Encrypt(newPassword, user.getSalt());
            user.setPassword(newMd5);
            this.updateById(user);
        } else {
            throw new ServiceException(BizExceptionEnum.OLD_PWD_NOT_RIGHT);
        }
    }

    /**
     * 初始化密码
     * @Date 2020/3/22 21:25
     * @param userId 当前用户 id
     * @param initPwd 初始密码
     */
    public void initPwd(Long userId, String initPwd) {
        HzyUser user = this.getById(userId);
        String initPwdMd5 = SaltUtil.md5Encrypt(initPwd, user.getSalt());
        user.setPassword(initPwdMd5);
        this.updateById(user);
    }

    public List<Map<String, Object>> listRole() {
        return this.baseMapper.listRole();
    }
    /**
     * 根据条件查询用户列表
     * @Date 2018/12/24 22:45
     */
    public Page<Map<String, Object>> selectUsers(DataScope dataScope, String name, String beginTime, String endTime, Long deptId) {
        Page page = LayuiPageFactory.defaultPage();
        return this.baseMapper.selectUsers(page, dataScope, name, beginTime, endTime, deptId);
    }

    /**
     * 根据条件查询用户列表 多条件查询
     * @Date 2018/12/24 22:45
     */
    public Page<Map<String, Object>> selectUsers2(DataScope dataScope, String name, String beginTime, String endTime, Long deptId, String account, String phone, Long roleId) {
        Page page = LayuiPageFactory.defaultPage();
        return this.baseMapper.selectUsers2(page, dataScope, name, beginTime, endTime, deptId, account, phone, roleId);
    }

    /**
     * 根据条件查询用户列表 多条件查询 ----> 不分页
     * @Date 2018/12/24 22:45
     */
    public List<HzyUser> selectUsers3(String account, String phone, Long roleId) {
        return this.baseMapper.selectUsers3(account, phone, roleId);
    }


    /**
     * 设置用户的角色
     * @Date 2018/12/24 22:45
     */
    public int setRoles(Long userId, String roleIds) {
        return this.baseMapper.setRoles(userId, roleIds);
    }

    /**
     * 通过账号获取用户
     * @Date 2018/12/24 22:46
     */
    public HzyUser getByAccount(String account) {
        return this.baseMapper.getByAccount(account);
    }

    /**
     * 获取用户菜单列表
     * @Date 2018/12/24 22:46
     */
    public List<Map<String, Object>> getUserMenuNodes(List<Long> roleList) {
        if (roleList == null || roleList.size() == 0) {
            return new ArrayList<>();
        } else {
            List<MenuNode> menus = menuService.getMenusByRoleIds(roleList);

            //定义不同系统分类的菜单集合
            ArrayList<Map<String, Object>> lists = new ArrayList<>();

            //根据当前用户包含的系统类型，分类出不同的菜单
            List<Map<String, Object>> systemTypes = LoginContextHolder.getContext().getUser().getSystemTypes();
            for (Map<String, Object> systemType : systemTypes) {

                //当前遍历系统分类code
                String systemCode = (String) systemType.get("code");

                //获取当前系统分类下菜单集合
                ArrayList<MenuNode> originSystemTypeMenus = new ArrayList<>();
                for (MenuNode menu : menus) {
                    if (menu.getSystemType().equals(systemCode)) {
                        originSystemTypeMenus.add(menu);
                    }
                }

                //拼接存放key为系统分类编码，value为该分类下菜单集合的map
                HashMap<String, Object> map = new HashMap<>();
                List<MenuNode> treeSystemTypeMenus = MenuNode.buildTitle(originSystemTypeMenus);
                map.put("systemType", systemCode);
                map.put("menus", treeSystemTypeMenus);
                lists.add(map);
            }

            return lists;
        }
    }

    /**
     * 判断当前登录的用户是否有操作这个用户的权限
     * @Date 2018/12/24 22:44
     */
    public void assertAuth(Long userId) {
        if (LoginContextHolder.getContext().isAdmin()) {
            return;
        }
        List<Long> deptDataScope = LoginContextHolder.getContext().getDeptDataScope();
        HzyUser user = this.getById(userId);
        Long deptId = user.getDeptId();
        if (deptDataScope.contains(deptId)) {
            return;
        } else {
            throw new ServiceException(BizExceptionEnum.NO_PERMITION);
        }
    }

    /**
     * 刷新当前登录用户的信息
     * @Date 2019/1/19 5:59 PM
     */
    public void refreshCurrentUser() {
        //TODO 刷新
    }

    /**
     * 获取用户的基本信息
     * @Date 2019-05-04 17:12
     */
    public Map<String, Object> getUserInfo(Long userId) {
        HzyUser user = this.getById(userId);
        Map<String, Object> map = HzyUserFactory.removeUnSafeFields(user);

        HashMap<String, Object> hashMap = CollectionUtil.newHashMap();
        hashMap.putAll(map);
        hashMap.put("roleName", ConstantFactory.me().getRoleName(user.getRoleId()));
        hashMap.put("deptName", ConstantFactory.me().getDeptName(user.getDeptId()));

        return hashMap;
    }

    /**
     * 获取用户首页信息
     * @Date 2019/10/17 16:18
     */
    public Map<String, Object> getUserIndexInfo() {

        //获取当前用户角色列表
        LoginUser user = LoginContextHolder.getContext().getUser();
        List<Long> roleList = user.getRoleList();

        //用户没有角色无法显示首页信息
        if (roleList == null || roleList.size() == 0) {
            return null;
        }

        List<Map<String, Object>> menus = this.getUserMenuNodes(roleList);

        HashMap<String, Object> result = new HashMap<>();
        result.put("menus", menus);
        result.put("avatar", DefaultImages.defaultAvatarUrl());
        result.put("name", user.getName());

        return result;
    }

    /**
     * 添加职位关联
     * @Date 2019-06-28 13:35
     */
    private void addPosition(String positions, Long userId) {
        if (ToolUtil.isNotEmpty(positions)) {
            String[] position = positions.split(",");
            for (String item : position) {

                HzyUserPos entity = new HzyUserPos();
                entity.setUserId(userId);
                entity.setPosId(Long.valueOf(item));

                hzyUserServiceInterface.save(entity);
            }
        }
    }

    /**
     * 选择办理人
     * @Date 2019-08-27 19:07
     */
    public IPage listUserAndRoleExpectAdmin(Page pageContext) {
        return baseMapper.listUserAndRoleExpectAdmin(pageContext);
    }

}
