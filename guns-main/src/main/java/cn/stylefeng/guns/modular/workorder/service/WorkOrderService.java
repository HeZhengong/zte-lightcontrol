package cn.stylefeng.guns.modular.workorder.service;

import cn.stylefeng.guns.base.pojo.page.LayuiPageFactory;
import cn.stylefeng.guns.modular.workorder.entity.WorkOrderEntity;
import cn.stylefeng.guns.modular.workorder.mapper.WorkOrderMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

/**
 * @author ZMJ
 * @create 2020/03/31 14:14
 * @Description 工单管理service
 */
@Service
@Transactional
public class WorkOrderService {
    @Resource
    private WorkOrderMapper workOrderMapper;

    public int insWorkOrder(WorkOrderEntity workOrderEntity){
        return workOrderMapper.insWorkOrder(workOrderEntity);
    }


    public Page<WorkOrderEntity> findList(HashMap<String,Object> map){
        Page page = LayuiPageFactory.defaultPage();
        page.setRecords(workOrderMapper.findList(page,map));
        return page;
    }

    public Page<WorkOrderEntity> findDispose(HashMap<String,Object> map){
        Page page = LayuiPageFactory.defaultPage();
        page.setRecords(workOrderMapper.findDispose(page,map));
        return  page;
    }

    public Page<WorkOrderEntity> findDeleted(HashMap<String,Object> map){
        Page page = LayuiPageFactory.defaultPage();
        page.setRecords(workOrderMapper.findDeleted(page,map));
        return  page;
    }

    public int delWorkOrder(String id){
        return workOrderMapper.delWorkOrder(id);
    }

    public int restoreWorkOrder(String id){
        return workOrderMapper.restoreWorkOrder(id);
    }

    public WorkOrderEntity selById(String id){
        return workOrderMapper.selById(id);
    }

    public int editWorkOrder(WorkOrderEntity workOrderEntity){
        return workOrderMapper.editWorkOrder(workOrderEntity);
    }

    public int clWorkOder(WorkOrderEntity workOrderEntity){
        return workOrderMapper.clWorkOder(workOrderEntity);
    }
}
