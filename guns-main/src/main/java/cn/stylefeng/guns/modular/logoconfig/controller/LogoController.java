package cn.stylefeng.guns.modular.logoconfig.controller;

import cn.stylefeng.guns.base.auth.context.LoginContextHolder;
import cn.stylefeng.guns.base.consts.ConstantsContext;
import cn.stylefeng.guns.sys.core.auth.cache.SessionManager;
import cn.stylefeng.guns.sys.modular.system.entity.FileInfo;
import cn.stylefeng.guns.sys.modular.system.entity.User;
import cn.stylefeng.guns.sys.modular.system.model.UploadResult;
import cn.stylefeng.guns.sys.modular.system.service.FileInfoService;
import cn.stylefeng.guns.sys.modular.system.service.LogoService;
import cn.stylefeng.guns.sys.modular.system.service.UserService;
import cn.stylefeng.roses.core.base.controller.BaseController;
import cn.stylefeng.roses.core.reqres.response.ErrorResponseData;
import cn.stylefeng.roses.core.reqres.response.ResponseData;
import cn.stylefeng.roses.core.reqres.response.SuccessResponseData;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * @Description 首页配置 controller
 * @Author zzb
 * @Date 2020/3/24 9:08
 **/
@Controller
@RequestMapping("/home/config")
public class LogoController extends BaseController {

    @Autowired
    private FileInfoService fileInfoService;

    @Autowired
    private LogoService logoService;

    @Autowired
    private UserService userService;

    private String PREFIX = "/logoconfig";

    @RequestMapping("")
    public String index() {
        return PREFIX + "/logoconfig.html";
    }

    /**
     * 得到当前用户配置信息
     * @return
     */
    @ResponseBody
    @RequestMapping("/detail")
    public ResponseData list() {
        //获取当前用户的 id
        Long userId = LoginContextHolder.getContext().getUserId();
        Long deptId = userService.getById(userId).getDeptId();
        Map<String, String> map = logoService.queryOneById(deptId.toString());

        if (map.size() == 0) {
            //返回一个默认图片
            return new ErrorResponseData(
                    404,
                    "返回默认logo、background图片",
                    null);
        } else {
            return new SuccessResponseData(
                    ResponseData.DEFAULT_SUCCESS_CODE,
                    ResponseData.DEFAULT_SUCCESS_MESSAGE,
                    map);
        }
    }

    /**
     * 图片上传
     * @param request
     * @param response
     * @return
     */
    @ResponseBody
    @RequestMapping("/upload")
    public ResponseData upload(HttpServletRequest request, HttpServletResponse response) {
        MultipartHttpServletRequest files = (MultipartHttpServletRequest) request;

        MultipartFile file = files.getFile("file");

        //系统默认路径 长这样  /**/**/**/\ 多出了一个 "\"
        String fileSavePath = ConstantsContext.getFileUploadPath();
        //路径 /**/**/**/
        fileSavePath = fileSavePath.substring(0, fileSavePath.length() - 1);

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        String todayDate = format.format(new Date());
        fileSavePath = fileSavePath + "image/" + todayDate + "/";

        File targetDir = new File(fileSavePath);
        if (!targetDir.exists())
            targetDir.mkdirs();

        //系统的的自带 文件 业务类 保存 和 移动文件夹
        UploadResult uploadResult = fileInfoService.uploadFile(file, fileSavePath);

        HashMap<String, Object> map = new HashMap<>();
        map.put("uploadResult", uploadResult);
        return new SuccessResponseData(
                SuccessResponseData.DEFAULT_SUCCESS_CODE,
                SuccessResponseData.DEFAULT_SUCCESS_MESSAGE,
                map
        );
    }

    /**
     * 通过 response.getOutputStream() 的方式把 图片 回显出去
     * @param imgPath
     * @param response
     */
    @ResponseBody
    @RequestMapping("/seeImg/{imgPath}")
    public void seeImg(@PathVariable(value = "imgPath") String imgPath, HttpServletResponse response) {
        //创建一个不为空的 非空值容器， ifPresent(Consumer consumer) 如果值为空则抛出异常 等价于 imgPath != null 主动抛异常
        Optional<String> optional = Optional.ofNullable(imgPath);
        optional.ifPresent((string) -> {
            FileInfo fileInfo = logoService.findFileInfo(string);

            File file = new File(fileInfo.getFilePath());

            try (
                    BufferedInputStream bufferedInputStream = new BufferedInputStream(new FileInputStream(file));
                    OutputStream outputStream = response.getOutputStream();
            ) {
                byte[] bytes = new byte[1024];
                int len = -1;
                while ((len = bufferedInputStream.read(bytes)) != -1) {
                    outputStream.write(bytes, 0, len);
                }
                outputStream.flush();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

    @ResponseBody
    @RequestMapping("/save")
    public ResponseData save(@RequestParam Map<String, String> map) {
        Long userId = LoginContextHolder.getContext().getUserId();
        User user = userService.getById(userId);
        String targetId = String.valueOf(user.getDeptId());
        map.put("targetId", targetId);
        Map<String, String> logoMap = logoService.queryOneById(targetId);
        map.put("id", IdWorker.getIdStr());

        if (logoMap == null || logoMap.size() == 0) {
            logoService.saveOne(map);
        }
        else
            logoService.updateOne(map);
        return new SuccessResponseData(
                SuccessResponseData.DEFAULT_SUCCESS_CODE,
                SuccessResponseData.DEFAULT_SUCCESS_MESSAGE,
                map
        );
    }
}
