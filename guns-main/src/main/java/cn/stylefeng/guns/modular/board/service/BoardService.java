package cn.stylefeng.guns.modular.board.service;

import cn.stylefeng.guns.modular.board.mapper.BoardMapper;
import cn.stylefeng.guns.modular.scene.entity.SceneEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * @author ZMJ
 * @create 2020/04/13 8:56
 * @Description
 */
@Service
@Transactional
public class BoardService {
    @Resource
    private BoardMapper boardMapper;

    public SceneEntity selById(String id){
        return boardMapper.selById(id);
    }

}
