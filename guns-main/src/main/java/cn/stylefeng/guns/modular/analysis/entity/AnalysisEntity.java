package cn.stylefeng.guns.modular.analysis.entity;

import cn.afterturn.easypoi.excel.annotation.Excel;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * @Description 能耗表实体类
 * @Author zzb
 * @Date 2020/4/8 9:07
 **/
/*@TableName("z_energy")*/
public class AnalysisEntity {

    /*@TableId(value = "id", type = IdType.ID_WORKER)*/
    private String id;

    /**
     * 理论用电
     */
    /*@TableField(value = "theory_electricity")*/
    @Excel(name = "理论用电", needMerge = true, orderNum = "1")
    private String theoryElectricity;

    /**
     * 实际用电 actual_electricity
     */
    /*@TableField(value = "actual_electricity")*/
    @Excel(name = "实际用电", needMerge = true, orderNum = "2")
    private String actualElectricity;

    /**
     * 节省用电 save_electricity
     */
    /*@TableField(value = "save_electricity")*/
    @Excel(name = "节省用电", needMerge = true, orderNum = "3")
    private String saveElectricity;

    /**
     * 节省用水 save_water
     */
    /*@TableField(value = "save_water")*/
    @Excel(name = "节省用水", needMerge = true, orderNum = "4")
    private String saveWater;

    /**
     * CO2减排
     */
    /*@TableField(value = "CO2")*/
    @Excel(name = "CO2减排", needMerge = true, orderNum = "5")
    private String CO2;

    /**
     * 二氧化硫减排 SO2
     */
    /*@TableField(value = "SO2")*/
    @Excel(name = "SO2减排", needMerge = true, orderNum = "6")
    private String SO2;

    /**
     * 节省柴油 save_derv
     */
    /*@TableField(value = "save_derv")*/
    @Excel(name = "节省柴油", needMerge = true, orderNum = "7")
    private String saveDerv;

    /**
     * 节省标准煤 save_coal
     */
    /*@TableField(value = "save_coal")*/
    @Excel(name = "节省标准煤", needMerge = true, orderNum = "8")
    private String saveCoal;

    /**
     * 创建时间 create_time
     */
    /*@TableField(value = "create_time")*/
    private String createTime;

    /**
     * 创建人id create_user
     */
    /*@TableField(value = "create_user")*/
    /*private String createUser;*/

    /**
     * 更新时间 update_time
     */
    /*@TableField(value = "update_time")*/
    private String updateTime;

    /**
     * 更新人 id update_user
     */
    /*@TableField(value = "update_user")*/
    /*private String updateUser;*/

    /**
     * 逻辑删除符 逻辑删除符 0 --> 未删除 1 --> 已删除
     */
    /*@TableField(value = "del")*/
    private boolean del;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTheoryElectricity() {
        return theoryElectricity;
    }

    public void setTheoryElectricity(String theoryElectricity) {
        this.theoryElectricity = theoryElectricity;
    }

    public String getActualElectricity() {
        return actualElectricity;
    }

    public void setActualElectricity(String actualElectricity) {
        this.actualElectricity = actualElectricity;
    }

    public String getSaveElectricity() {
        return saveElectricity;
    }

    public void setSaveElectricity(String saveElectricity) {
        this.saveElectricity = saveElectricity;
    }

    public String getSaveWater() {
        return saveWater;
    }

    public void setSaveWater(String saveWater) {
        this.saveWater = saveWater;
    }

    public String getCO2() {
        return CO2;
    }

    public void setCO2(String CO2) {
        this.CO2 = CO2;
    }

    public String getSO2() {
        return SO2;
    }

    public void setSO2(String SO2) {
        this.SO2 = SO2;
    }

    public String getSaveDerv() {
        return saveDerv;
    }

    public void setSaveDerv(String saveDerv) {
        this.saveDerv = saveDerv;
    }

    public String getSaveCoal() {
        return saveCoal;
    }

    public void setSaveCoal(String saveCoal) {
        this.saveCoal = saveCoal;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    /*public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }*/

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    /*public String getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(String updateUser) {
        this.updateUser = updateUser;
    }*/

    public boolean isDel() {
        return del;
    }

    public void setDel(boolean del) {
        this.del = del;
    }

    @Override
    public String toString() {
        return "AnalysisEntity{" +
                "id=" + id +
                ", theoryElectricity='" + theoryElectricity + '\'' +
                ", actualElectricity='" + actualElectricity + '\'' +
                ", saveElectricity='" + saveElectricity + '\'' +
                ", saveWater='" + saveWater + '\'' +
                ", CO2='" + CO2 + '\'' +
                ", SO2='" + SO2 + '\'' +
                ", saveDerv='" + saveDerv + '\'' +
                ", saveCoal='" + saveCoal + '\'' +
                ", createTime='" + createTime + '\'' +
                /*", createUser='" + createUser + '\'' +
                ", updateTime='" + updateTime + '\'' +
                ", updateUser='" + updateUser + '\'' +*/
                ", del=" + del +
                '}';
    }
}
