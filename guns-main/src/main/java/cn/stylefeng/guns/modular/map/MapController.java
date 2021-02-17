package cn.stylefeng.guns.modular.map;

import cn.stylefeng.guns.modular.equip.entity.EquipEntity;
import cn.stylefeng.guns.modular.equip.service.EquipService;
import cn.stylefeng.roses.core.base.controller.BaseController;
import cn.stylefeng.roses.core.reqres.response.ResponseData;
import cn.stylefeng.roses.core.reqres.response.SuccessResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @author wujianghao
 * @Title: MapController
 * @ProjectName guns-architecture
 * @Description: TODO
 * @date 2020/3/16 2:12 下午
 */
@Controller
@RequestMapping("/map")
public class MapController extends BaseController {

    @Autowired
    private EquipService equipService;

    private static String PREFIX = "/map";

    /**
     * @Author wujianghao
     * @Description 地图页面跳转
     * @Date 4:04 下午 2020/3/16
     * @Param []
     * @return java.lang.String
     **/
    @RequestMapping("")
    public String index(Model model) {
        List<EquipEntity> list = equipService.selectList(new EquipEntity());
        model.addAttribute("list", list);
        return PREFIX + "/map.html";
    }


    @ResponseBody
    @RequestMapping("/getEquip")
    public ResponseData getEquip() {
        List<EquipEntity> list = equipService.selectList(new EquipEntity());
        return new SuccessResponseData(
                ResponseData.DEFAULT_SUCCESS_CODE,
                ResponseData.DEFAULT_SUCCESS_MESSAGE,
                list);
    }

}
