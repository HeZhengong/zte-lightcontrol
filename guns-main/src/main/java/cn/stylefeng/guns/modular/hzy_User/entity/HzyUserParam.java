package cn.stylefeng.guns.modular.hzy_User.entity;

import cn.stylefeng.roses.kernel.model.validator.BaseValidatingParam;
import lombok.Data;

import java.io.Serializable;

@Data
public class HzyUserParam implements Serializable, BaseValidatingParam {

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

    @Override
    public String checkParam() {
        return null;
    }

}