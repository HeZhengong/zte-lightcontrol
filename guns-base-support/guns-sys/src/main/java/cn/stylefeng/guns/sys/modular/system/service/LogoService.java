package cn.stylefeng.guns.sys.modular.system.service;

import cn.stylefeng.guns.sys.modular.system.entity.FileInfo;
import cn.stylefeng.guns.sys.modular.system.mapper.LogoMapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * @Description 首页配置 service
 * @Author zzb
 * @Date 2020/3/24 11:14
 **/
@Service
public class LogoService extends ServiceImpl<LogoMapper, Object> {

    @Autowired(required = false)
    private LogoMapper logoMapper;

    /**
     * 根据当前 id 在 logo_config 表中找到对应的 唯一数据
     * @param targetId
     * @return
     */
    public Map<String, String> queryOneById(String targetId) {
        return logoMapper.queryOneById(targetId);
    }

    /**
     * 保存 当前 target_id　的数据
     * @param map
     * @return
     */
    public int saveOne(Map<String, String> map) {
        return logoMapper.saveOne(map);
    }

    /**
     * 更新 当前 target_id 数据
     * @param map
     * @return
     */
    public int updateOne(Map<String, String> map) {
        return logoMapper.updateOne(map);
    }

    /**
     * 找到对应文件的具体信息
     * @param fileId
     * @return
     */
    public FileInfo findFileInfo(String fileId) {
        return logoMapper.findFileInfo(fileId);
    }

}
