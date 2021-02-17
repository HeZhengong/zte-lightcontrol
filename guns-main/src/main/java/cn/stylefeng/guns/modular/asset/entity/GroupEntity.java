package cn.stylefeng.guns.modular.asset.entity;

import lombok.Data;

/**
 * @Description 资产管理 分组 实体类
 * @Author zzb
 * @Date 2020/4/14 17:15
 **/
@Data
public class GroupEntity {
    
    /**
     * id
     */
    private String id;
    
    /**
     * no 项目类型编号
     */
    private String no;
    

    /**
     * type 分组类型 0 ---> 父级 1 ---> 子级
     */
    private String type;
    
    /**
     * label 标签说明文本
     */
    private String label;
    
    /**
     * parent 父级 id 如果本身就是 父级 parent = 0, 本身是 子级 parent = parent.id
     */
    private String parent;

    /**
     * weight 排序
     */
    private String weight;


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
        return "GroupEntity{" +
                "id='" + id + '\'' +
                ", type='" + type + '\'' +
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
