layui.use(['layer', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var func = layui.func;

    /**
     * @Author wujianghao
     * @Description 菜单初始化
     * @Date 10:31 上午 2020/3/13
     * @Param
     * @return
     **/
    $(function(){
//        //获取菜单
//        var ajax = new $ax(Feng.ctxPath + "/menu/listByLight", function (data) {
//
//            //一级菜单
//            var mapOne = new Map();
//            //二级菜单
//            var mapTwo = new Map();
//            //三级菜单
//            var mapThree = new Map();
//
//
//            for(var i=0; i<data.length; i++){
//                var code = data[i].code;
//                var levels = data[i].levels;
//                var pcode = data[i].pcode;
//
//                if(code != "lightControl"){
//                    if(mapOne.containsKey(code) && pcode == "lightControl"){
//
//                    }else{
//
//                    }
//                }
//                $("#menu_div_id").append();
//            }
//        }, function (data) {
//
//        });
//        ajax.set("menuId", '1239469993431744513');
//        ajax.start();
//
//        //加载页面
//        $(".r-iframe").attr("src","/user/userinfo")

        //从首页控制器传来的参数，用户选择iframe初始化时显示的页面
        var id=$("#menu_id_zmj").val();
        /**
         *  选择iframe初始化页面 以及菜单的展开
         */
        switch (id) {
            case "zhkb":
                $(".r-iframe").attr("src","/board");
                break;
            case "znkz":
                $("#znkz1").siblings(".menu-iul").show();
                $("#znkz2").siblings(".menu-iul").show();
                $(".r-iframe").attr("src","/equip")
                break;
            case "wbgl":
                $("#wbgl1").siblings(".menu-iul").show();
                $("#wbgl2").siblings(".menu-iul").show();
                $(".r-iframe").attr("src","/alarm/alarmInfo")
                break;
            case "nhgl":
                $("#nhgl1").siblings(".menu-iul").show();
                $(".r-iframe").attr("src","/energy/statistics")
                break;
            case "dtyd":
                $("#dtyd1").siblings(".menu-iul").show();
                $(".r-iframe").attr("src","/map")
                break;
            case "tjbb":
                $(".r-iframe").attr("src","/statement")
                break;
            case "zcgl":
                $(".r-iframe").attr("src","/asset")
                break;
            case "jkgl":
                $("#jkgl1").siblings(".menu-iul").show();
                $("#jkgl2").siblings(".menu-iul").show();
                $(".r-iframe").attr("src","/recordTrack")
                break;
        }
    });

    $("#rollbackindex").on("click",function () {
        window.location.href="/"
    })
    /**
     * @Author wujianghao
     * @Description
     * @Date 10:31 上午 2020/3/13
     * @Param
     * @return
     **/
    index_page_Obj.setIframe = function(html){
        $(".r-iframe").attr("src",html)
    }

    /**
     * @Author wujianghao
     * @Description 菜单收缩
     * @Date 10:32 上午 2020/3/13
     * @Param
     * @return
     **/
    $(".menu-icnt").on("click",function(){
        $(this).siblings(".menu-iul").toggle()
    })
});

/**
 * @Author wujianghao
 * @Description 主界面对象，用于对象闭包
 * @Date 10:30 上午 2020/3/13
 * @Param
 * @return
 **/
var index_page_Obj = {

}