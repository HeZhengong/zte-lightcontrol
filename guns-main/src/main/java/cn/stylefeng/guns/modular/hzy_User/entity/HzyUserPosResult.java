package cn.stylefeng.guns.modular.hzy_User.entity;

import lombok.Data;

import java.io.Serializable;

/**
 * <p>
 * 用户职位关联表
 * </p>
 2019-06-28
 */
@Data
public class HzyUserPosResult implements Serializable {

    private static final long serialVersionUID = 1L;


    /**
     * 主键id
     */
    private Long userPosId;

    /**
     * 用户id
     */
    private Long userId;

    /**
     * 职位id
     */
    private Long posId;

}
