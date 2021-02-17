package cn.stylefeng.guns.modular.alarm.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @author ZMJ
 * @create 2020/03/23 14:50
 * @Description 告警实体类
 */
public class AlarmEntity {
    /**
     * 主键
     */
    private String id;

    /**
     * 告警时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date alarmDate;

    /**
     * 告警类型
     */
    private String alarmCategory;

    /**
     * 告警设备名称
     */
    private String deviceName;

    /**
     * 描述
     */
    private String describe;

    /**
     * 通知方式
     */
    private String infrom;

    /**
     * 告警原因
     */
    private String alarmCause;

    /**
     * 处理时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date disposeDate;

    /**
     * 处理状态 0-未处理 1-已处理
     */
    private String disposeStatus;

    /**
     * 转工单状态 0-未转 1-已转
     */
    private String swirchWork;
    /**
     * 删除状态 0-未删除 1-已删除
     */
    private String del;

    public String getId() {
        return id;
    }

    public Date getAlarmDate() {
        return alarmDate;
    }

    public String getAlarmCategory() {
        return alarmCategory;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public String getDescribe() {
        return describe;
    }

    public String getInfrom() {
        return infrom;
    }

    public String getAlarmCause() {
        return alarmCause;
    }

    public Date getDisposeDate() {
        return disposeDate;
    }

    public String getDisposeStatus() {
        return disposeStatus;
    }

    public String getSwirchWork() {
        return swirchWork;
    }

    public String getDel() {
        return del;
    }






    public void setId(String id) {
        this.id = id;
    }

    public void setAlarmDate(Date alarmDate) {
        this.alarmDate = alarmDate;
    }

    public void setAlarmCategory(String alarmCategory) {
        this.alarmCategory = alarmCategory;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public void setInfrom(String infrom) {
        this.infrom = infrom;
    }

    public void setAlarmCause(String alarmCause) {
        this.alarmCause = alarmCause;
    }

    public void setDisposeDate(Date disposeDate) {
        this.disposeDate = disposeDate;
    }

    public void setDisposeStatus(String disposeStatus) {
        this.disposeStatus = disposeStatus;
    }

    public void setSwirchWork(String swirchWork) {
        this.swirchWork = swirchWork;
    }

    public void setDel(String del) {
        this.del = del;
    }
}
