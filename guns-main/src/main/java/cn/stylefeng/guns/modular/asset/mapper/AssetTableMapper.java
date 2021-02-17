package cn.stylefeng.guns.modular.asset.mapper;

import cn.stylefeng.guns.modular.asset.entity.AssetTableEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Description 资产表 mapper
 * @Author zzb
 * @Date 2020/4/15 15:29
 **/
@Repository
public interface AssetTableMapper {


    List<AssetTableEntity> selectList(@Param("entity") AssetTableEntity entity);

    int insertOne(@Param("entity") AssetTableEntity entity);


    AssetTableEntity selectOne(@Param("id") String id);

    String defaultTableId();
}
