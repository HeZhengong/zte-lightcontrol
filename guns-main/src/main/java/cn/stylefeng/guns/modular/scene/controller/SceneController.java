package cn.stylefeng.guns.modular.scene.controller;

import cn.stylefeng.guns.base.auth.context.LoginContextHolder;
import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.base.pojo.page.LayuiPageInfo;
import cn.stylefeng.guns.modular.scene.entity.SceneEntity;
import cn.stylefeng.guns.modular.scene.service.SceneService;
import cn.stylefeng.roses.core.base.controller.BaseController;
import cn.stylefeng.roses.core.reqres.response.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author wujianghao
 * @Title: 场景
 * @ProjectName guns-architecture
 * @Description:
 * @date 2020/3/5 10:02 上午
 */
@Controller
@RequestMapping("/scene")
public class SceneController extends BaseController {

    @Autowired
    private SceneService service;

    @RequestMapping("")
    public String list() {
        return "/scene/list.html";
    }

    /**
     * 查询列表
     * @Date 2019-03-13
     */
    @ResponseBody
    @RequestMapping("/selectPage")
    public LayuiPageInfo list(SceneEntity entity) {
        Long userId= LoginContextHolder.getContext().getUser().getId();
        entity.setCreateUser(userId);
        return LayuiPageFactory.createPageInfo(service.selectPage(entity));
    }

    /**
     * 保存接口
     * @Date 2019-03-13
     */
    @RequestMapping("/save")
    @ResponseBody
    public ResponseData save(SceneEntity entity) {
        this.service.saveOrUpdate(entity);
        return ResponseData.success();
    }

    /**
     * 删除接口
     * @Date 2019-03-13
     */
    @RequestMapping("/delete")
    @ResponseBody
    public ResponseData delete(SceneEntity entity) {
        this.service.removeById(entity.getId());
        return ResponseData.success();
    }

    /**
     * 查看详情接口
     * @Date 2019-03-13
     */
    @RequestMapping("/get")
    @ResponseBody
    public ResponseData get(SceneEntity entity) {
         entity = this.service.getById(entity.getId());
        return ResponseData.success(entity);
    }

}
