package cn.stylefeng.guns.modular.workorder.mapper;

import cn.stylefeng.guns.modular.workorder.entity.WorkOrderEntity;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.HashMap;
import java.util.List;

/**
 * @author ZMJ
 * @create 2020/03/31 14:05
 * @Description 工单管理mapper
 */
public interface WorkOrderMapper {
    int insWorkOrder(WorkOrderEntity workOrderEntity);

    List<WorkOrderEntity> findList(@Param("page") Page page,@Param("map") HashMap<String, Object> map);

    List<WorkOrderEntity> findDispose(@Param("page") Page page,@Param("map") HashMap<String,Object> map);

    List<WorkOrderEntity> findDeleted(@Param("page") Page page,@Param("map") HashMap<String,Object> map);

    int delWorkOrder(String id);

    int restoreWorkOrder(String id);

    WorkOrderEntity selById(String id);

    int editWorkOrder(WorkOrderEntity workOrderEntity);

    int clWorkOder(WorkOrderEntity workOrderEntity);
}
