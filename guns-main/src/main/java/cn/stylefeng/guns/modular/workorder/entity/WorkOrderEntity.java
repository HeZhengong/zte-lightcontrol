package cn.stylefeng.guns.modular.workorder.entity;

import java.util.Date;

/**
 * @author ZMJ
 * @create 2020/03/31 10:42
 * @Description 工单管理实体类
 */
public class WorkOrderEntity {
    private String id;
    /**
     * 详细地址
     */
    private String address;
    /**
     * 故障描述
     */
    private String describe;
    /**
     * 需要完成时间
     */
    private Date completionTime;
    /**
     * 派发方式
     */
    private String manner;
    /**
     * 派发人id
     */
    private String handingId;
    /**
     * 故障图片路径
     */
    private String faultPath;
    /**
     * 工单创建人id
     */
    private String creatId;
    /**
     * 故障原因
     */
    private String faultCause;
    /**
     * 解决方法
     */
    private String solution;
    /**
     *处理结果
     */
    private String disposeResult;
    /**
     * 处理图片路径
     */
    private String disposePath;
    /**
     * 0-未删除 1-已删除
     */
    private String del;
    /**
     * 0-未处理 1-已处理
     */
    private String disposeStatus;

    /**
     * 工单创建时间
     */
    private Date createDate;


    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getId() {
        return id;
    }

    public String getAddress() {
        return address;
    }

    public String getDescribe() {
        return describe;
    }

    public Date getCompletionTime() {
        return completionTime;
    }

    public String getManner() {
        return manner;
    }

    public String getHandingId() {
        return handingId;
    }

    public String getFaultPath() {
        return faultPath;
    }

    public String getCreatId() {
        return creatId;
    }

    public String getFaultCause() {
        return faultCause;
    }

    public String getSolution() {
        return solution;
    }

    public String getDisposeResult() {
        return disposeResult;
    }

    public String getDisposePath() {
        return disposePath;
    }

    public String getDel() {
        return del;
    }

    public String getDisposeStatus() {
        return disposeStatus;
    }


    public void setId(String id) {
        this.id = id;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public void setCompletionTime(Date completionTime) {
        this.completionTime = completionTime;
    }

    public void setManner(String manner) {
        this.manner = manner;
    }

    public void setHandingId(String handingId) {
        this.handingId = handingId;
    }

    public void setFaultPath(String faultPath) {
        this.faultPath = faultPath;
    }

    public void setCreatId(String creatId) {
        this.creatId = creatId;
    }

    public void setFaultCause(String faultCause) {
        this.faultCause = faultCause;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public void setDisposeResult(String disposeResult) {
        this.disposeResult = disposeResult;
    }

    public void setDisposePath(String disposePath) {
        this.disposePath = disposePath;
    }

    public void setDel(String del) {
        this.del = del;
    }

    public void setDisposeStatus(String disposeStatus) {
        this.disposeStatus = disposeStatus;
    }
}
