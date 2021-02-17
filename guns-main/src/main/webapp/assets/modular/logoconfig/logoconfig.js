layui.use(['layer', 'admin', 'ax', 'func', 'upload'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var func = layui.func;
    var upload = layui.upload;

    /**
     * upload 文件上传
     */
    var uploadLogo = upload.render({
        elem: '#logo' //绑定元素
        ,url: '/home/config/upload' //上传接口
        ,done: function(res){
            //上传完毕回调
            $("#logo").attr("src", Feng.ctxPath + '/home/config/seeImg/' + res.data.uploadResult.fileId);
            $("#logo").attr("alt", Feng.ctxPath + '/home/config/seeImg/' + res.data.uploadResult.finalName);
            $('input[name="logoPath"]').val(res.data.uploadResult.fileId);
        }
        ,error: function(){
            //请求异常回调
        }
    });

    /**
     * upload 文件上传
     * 更新 background 图片
     */
    var uploadBg = upload.render({
        elem: '#bg' //绑定元素
        ,url: '/home/config/upload' //上传接口
        ,done: function(res){
            //上传完毕回调
            $("#bg").attr("src", Feng.ctxPath + '/home/config/seeImg/' + res.data.uploadResult.fileId);
            $("#bg").attr("alt", Feng.ctxPath + '/home/config/seeImg/' + res.data.uploadResult.finalName);
            $('input[name="backgroundPath"]').val(res.data.uploadResult.fileId);
        }
        ,error: function(){
            //请求异常回调
        }
    });

    /**
     * @Author zzb
     * @Description 首页配置
     * @Date 2020/3/24 9:55
     * @Param
     * @return
     **/
     window.homeInfoObj = {

     };

    /**
     * 保存当前信息
     */
    homeInfoObj.saveInfo = function() {
        var ajax = new $ax(Feng.ctxPath + '/home/config/save', function (data) {
            homeInfoObj.index();
            Feng.success("更新成功!");
        }, function () {
            Feng.error("更新失败!" + data.responseJSON.message + "!");
        });
        ajax.set("targetId", $('.btn-save').val());
        ajax.set("projectName", $('input[name="projectName"]').val());
        ajax.set("logoPath", $('input[name="logoPath"]').val());
        ajax.set("backgroundPath", $('input[name="backgroundPath"]').val());
        ajax.set("copyright", $('input[name="copyright"]').val());
        ajax.start();
    };


    /**
     * 页面初始化
     */
    homeInfoObj.index = function () {
        $('.modal').hide();
        homeInfoObj.clearInput();
        var ajax = new $ax(Feng.ctxPath + '/home/config/detail', function (data) {
            var tempData = data.data;
        //<img id="equipImg" src="/assets/img/add.png" alt="" class="fm-sm-img">
            $('input[name="projectName"]').val(tempData.project_name);

            $('input[name="copyright"]').val(tempData.copyright);

            if (typeof (tempData.logo_path) == 'undefined' || tempData.logo_path == null || tempData.logo_path == "") {
                $('input[name="logoPath"]').val("");
                $("#logo").attr('src', "/assets/img/add.png");
            } else {
                $('input[name="logoPath"]').val(tempData.logo_path);
                $("#logo").attr('src', Feng.ctxPath + '/home/config/seeImg/' + tempData.logo_path);
            }

            if (typeof (tempData.background_path) == 'undefined' || tempData.background_path == null || tempData.background_path == "") {
                $('input[name="backgroundPath"]').val("");
                $("#bg").attr('src', "/assets/img/add.png");
            } else {
                $('input[name="backgroundPath"]').val(tempData.background_path);
                $("#bg").attr('src', Feng.ctxPath + '/home/config/seeImg/' + tempData.background_path);
            }

            $('.btn-save').val(tempData.target_id);
        }, function (data) {

        });
        ajax.start();
     };


     homeInfoObj.clearInput = function () {
         $('input[name="projectName"]').val("");
         $('input[name="logoPath"]').val("");
         $('#logo').attr("str", "");
         $('input[name="backgroundPath"]').val("");
         $('#bg').attr("str", "");
         $('input[name="copyright"]').val("");

         $('.btn-save').val("");
     };

    homeInfoObj.index();
});

