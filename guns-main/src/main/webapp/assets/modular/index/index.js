layui.use(['layer', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var func = layui.func;
    var hostname = location.hostname;
    var port = location.port;
    /**
     * @author zmj
     * @date 2020-03-20 14:56:16
     * @Description 附带参数到首页控制器
     *              用于指定跳转
     * @param null
     * @return 
     **/
    $(".index-item").on('click',function () {
        var id =$(this).attr("id");
        window.location.href="/indexS/"+id;
    })
})