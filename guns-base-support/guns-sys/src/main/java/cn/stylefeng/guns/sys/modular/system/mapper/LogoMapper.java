package cn.stylefeng.guns.sys.modular.system.mapper;

import cn.stylefeng.guns.sys.modular.system.entity.FileInfo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.Map;

/**
 * @Description 首页配置 mapper
 * @Author LogoMapper
 * @Date 2020/3/24 10:41
 **/
public interface LogoMapper extends BaseMapper<Object> {

    Map<String, String> queryOneById(String targetId);

    int saveOne(Map<String, String> map);

    int updateOne(Map<String, String> map);

    FileInfo findFileInfo(String fileId);
}
