package cn.stylefeng.guns.modular.board.controller;

import cn.stylefeng.guns.modular.board.mapper.BoardMapper;
import cn.stylefeng.guns.modular.board.service.BoardService;
import cn.stylefeng.guns.modular.equip.entity.EquipEntity;
import cn.stylefeng.guns.modular.equip.service.EquipService;
import cn.stylefeng.guns.modular.scene.entity.SceneEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author ZMJ
 * @create 2020/03/26 9:28
 * @Description 综合看板控制器
 */
@Controller
@RequestMapping("/board")
public class BoardController {
    @Autowired
    private EquipService equipService;

    @Resource
    private BoardService boardService;
    @RequestMapping("")
    /**
     * @author zmj
     * @date 2020-03-26 09:32:50
     * @Description 综合看板页面跳转
     * @return java.lang.String
     **/
    public String list(Model model){
        List<EquipEntity> list = equipService.selectList(new EquipEntity());
        model.addAttribute("list", list);
        return "/board/board.html";
    }

    @RequestMapping("/count")
    @ResponseBody
    /**
     * @author zmj
     * @date 2020-03-26 16:42:29
     * @Description  获取在线设备数量以及设备总数量
     * @return int
     **/
    public Map count(){
        int count = equipService.count();
        List<EquipEntity> equipEntities = equipService.selectList(new EquipEntity());
        int countAll = equipEntities.size();
        HashMap<String, Object> map = new HashMap<>();
        map.put("count",count);
        map.put("countAll",countAll);
        return map;
    }

    @RequestMapping("/countType")
    @ResponseBody
    /**
     * @author zmj
     * @date 2020-03-26 17:09:02
     * @Description 获取设备类型以及数量
     * @return java.util.List<java.util.Map>
     **/
    public List<Map> countType(){
        return equipService.countType();
    }

    @RequestMapping("/selScene")
    @ResponseBody
    public SceneEntity selById(String id){
        return boardService.selById(id);
    }

}
