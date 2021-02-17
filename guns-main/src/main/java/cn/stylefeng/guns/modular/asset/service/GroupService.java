package cn.stylefeng.guns.modular.asset.service;

import cn.stylefeng.guns.base.auth.context.LoginContextHolder;
import cn.stylefeng.guns.modular.asset.entity.AssetTableEntity;
import cn.stylefeng.guns.modular.asset.entity.GroupEntity;
import cn.stylefeng.guns.modular.asset.mapper.GroupMapper;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

/**
 * @Description 分组 管理 service
 * @Author zzb
 * @Date 2020/4/14 17:31
 **/
@Service
public class GroupService {

    @Autowired
    private GroupMapper mapper;

    /**
     * 将查询到的所有的信息 进行分类， parent 作为 key, 同一个 parent 的实体类 作为一个 List 组合成一个 HashMap
     * @return
     */
    public HashMap<String, ArrayList<GroupEntity>> selectList() {
        HashMap<String, ArrayList<GroupEntity>> reduce =
                mapper.selectList()
                        .stream()
                        .reduce(
                                //T
                                new HashMap<String, ArrayList<GroupEntity>>(),
                                //new BiFunction<T, U, T>//第三个参数为返回值类型
                                (hashMap, entity) -> {
                                    String key = entity.getParent();
                                    if (hashMap.containsKey(key)) {
                                        hashMap.get(key).add(entity);
                                    } else {
                                        ArrayList<GroupEntity> list = new ArrayList<>();
                                        list.add(entity);
                                        hashMap.put(key, list);
                                    }
                                    return hashMap;
                                },
                                //BinaryFunction<T, T, T>//第三个参数为返回值类型
                                (hashMap1, hashMap2) -> {
                                    return hashMap1;
                                }
                        );

        return reduce;
    }

    /**
     * 插入一条数据
     * @param entity
     * @return
     */
    public GroupEntity insertOne(GroupEntity entity) {
        //id
        entity.setId(IdWorker.getIdStr());
        // create_user
        String createUser = String.valueOf(LoginContextHolder.getContext().getUserId());
        entity.setCreateUser(createUser);
        int number = mapper.insertOne(entity);
        return number != 0 ? mapper.selectOne(entity.getId()) : null;
    }

    /**
     * 根据 id 查询信息
     * @param id
     * @return
     */
    public GroupEntity selectOne(String id) {
        return mapper.selectOne(id);
    }

    /**
     * 根据 id 更新 组信息
     * @param entity
     * @return
     */
    public int updateOne(GroupEntity entity) {
        String updateUser = String.valueOf(LoginContextHolder.getContext().getUserId());
        entity.setUpdateUser(updateUser);
        return mapper.updateOne(entity);
    }

    /**
     * 根据 id 删除组 和 组的 子级 删除之前，要看看 父级 和 子级 有没有对应的 table， 有，不能删， 没有，可以删
     * @param id
     * @return
     */
    public boolean delGroupById(String id) {
        //同步

        boolean flag = false;

        synchronized (this) {
            //找到 所有的 id （包括 父级 和 子级）
            List<String> idList = mapper.selectAllChildOfParentId(id);
            idList.add(id);
            //判断 这些 组 的 id 有没有 table 中的 有数据对应，， 有，不能删， 没有，可以删
            List<AssetTableEntity> assetList = mapper.ifPresentOfTable(idList);
            if (assetList == null || assetList.size() == 0) {
                mapper.delOneOfChild(idList);
                flag = true;
            }
        }
        return flag;
    }

}
