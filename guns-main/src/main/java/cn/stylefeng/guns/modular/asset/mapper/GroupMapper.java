package cn.stylefeng.guns.modular.asset.mapper;

import cn.stylefeng.guns.modular.asset.entity.AssetTableEntity;
import cn.stylefeng.guns.modular.asset.entity.GroupEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Description 分组 管理 mapper
 * @Author GroupMapper
 * @Date 2020/4/14 17:21
 **/
@Repository
public interface GroupMapper {

    List<GroupEntity> selectList();

    GroupEntity selectOne(@Param("id") String id);

    int insertOne(@Param("entity") GroupEntity entity);

    int updateOne(@Param("entity") GroupEntity entity);

    /**
     * 根据 多个 id 删除 父级 组 和 子级 组
     * @param ids
     * @return
     */
    int delOneOfChild(@Param("myArray") List<String> ids);

    /**
     * 根据 id 删除 组
     * @param id
     * @return
     */
    int delOneOfParent(@Param("id") String id);

    /**
     * 根据 父级 id 找到所有 子级 id
     * @param id
     * @return
     */
    List<String> selectAllChildOfParentId(@Param("id") String id);

    /**
     * 判断 这些 组 的 id 有没有 table 中的 有数据对应，
     * @param id
     * @return
     */
    List<AssetTableEntity> ifPresentOfTable(@Param("myArray") List<String> id);
}
