package cn.stylefeng.guns.modular.asset.entity;

import lombok.Data;

/**
 * @Description 资产表 实体类
 * @Author zzb
 * @Date 2020/4/15 15:26
 **/
@Data
public class AssetTableEntity {

    /**
     * id
     */
    private String id;
    
    /**
     * type 类型 0 ---> 行表头 1 ---> 列表头 2 ---> 表格中的数据
     */
    private String type;
    
    /**
     * left 左下标
     */
    private String left;
    
    /**
     * top 上下标
     */
    private String top;
    
    /**
     * label 标签内容
     */
    private String label;

    /**
     * parent 属于哪个分组的数据 ---> 分组 id
     */
    private String parent;

    
    /**
     * create_time
     */
    private String createTime;
    
    /**
     * create_user
     */
    private String createUser;
    
    /**
     * update_time
     */
    private String updateTime;
    
    /**
     * update_user
     */
    private String updateUser;
    
    /**
     * del 逻辑删除符 0 ---> 未删除 1 ---> 已删除
     */
    private boolean del;

    @Override
    public String toString() {
        return "AssetTableEntity{" +
                "id='" + id + '\'' +
                ", type='" + type + '\'' +
                ", left='" + left + '\'' +
                ", top='" + top + '\'' +
                ", label='" + label + '\'' +
                ", parent='" + parent + '\'' +
                ", createTime='" + createTime + '\'' +
                ", createUser='" + createUser + '\'' +
                ", updateTime='" + updateTime + '\'' +
                ", updateUser='" + updateUser + '\'' +
                ", del=" + del +
                '}';
    }
}
