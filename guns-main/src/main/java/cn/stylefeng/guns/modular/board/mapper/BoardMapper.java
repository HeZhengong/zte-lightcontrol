package cn.stylefeng.guns.modular.board.mapper;

import cn.stylefeng.guns.modular.scene.entity.SceneEntity;
import org.apache.ibatis.annotations.Select;

/**
 * @author ZMJ
 * @create 2020/04/13 8:53
 * @Description
 */
public interface BoardMapper {
    @Select("select * from t_scene where id=#{id}")
    SceneEntity selById(String id);
}
