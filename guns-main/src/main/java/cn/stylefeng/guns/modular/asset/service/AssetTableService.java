package cn.stylefeng.guns.modular.asset.service;

import cn.stylefeng.guns.base.auth.context.LoginContextHolder;
import cn.stylefeng.guns.modular.asset.entity.AssetTableEntity;
import cn.stylefeng.guns.modular.asset.mapper.AssetTableMapper;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * @Description 资产表 实体类
 * @Author zzb
 * @Date 2020/4/15 15:38
 **/
@Service
public class AssetTableService {


    @Autowired
    private AssetTableMapper mapper;

    /**
     * 根据 具体的 组 id 得到 该组所有的 table 数据
     * @param entity
     * @return
     */
    public HashMap<String, ArrayList<AssetTableEntity>> selectList(AssetTableEntity entity) {
        HashMap<String, ArrayList<AssetTableEntity>> reduce = mapper.selectList(entity)
                .stream()
                .reduce(new HashMap<String, ArrayList<AssetTableEntity>>(),
                        (hashMap, assetTableEntity) -> {
                            String key = assetTableEntity.getTop();
                            if (hashMap.containsKey(key))
                                hashMap.get(key).add(assetTableEntity);
                            else {
                                ArrayList<AssetTableEntity> list = new ArrayList<>();
                                list.add(assetTableEntity);
                                hashMap.put(key, list);
                            }
                            return hashMap;
                        },
                        (hashMap1, hashMap2) -> {
                            return hashMap1;
                        });

        return reduce;
    }

    /**
     * 插入一条数据并得到该数据的实体类
     * @param entity
     * @return
     */
    public AssetTableEntity insertOne(AssetTableEntity entity) {
        //id
        entity.setId(IdWorker.getIdStr());
        // create_user
        String createUser = String.valueOf(LoginContextHolder.getContext().getUserId());
        entity.setCreateUser(createUser);
        int number = mapper.insertOne(entity);
        return number != 0 ? mapper.selectOne(entity.getId()) : null;
    }

    /**
     * 得到 默认的组 id 规则是 最开始 建 table 的那组 是默认组
     * @return
     */
    public String defaultTableId() {
        return mapper.defaultTableId();
    }
}
