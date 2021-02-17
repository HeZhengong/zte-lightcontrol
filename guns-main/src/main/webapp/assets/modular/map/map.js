layui.use(['layer', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var func = layui.func;
    var form = layui.form;

    //保存临时的 infoBox 变量信息
    var infoBoxVar = null;

    var equipData = null;

    var map;
// 百度地图API功能
    map =  new BMap.Map("map");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(115.996333, 28.695937), 14);  // 初始化地图,设置中心点坐标和地图级别
    map.setCurrentCity("南昌");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.setMapStyleV2({styleJson:mapcolorjson});

    /**
     * @Author wujianghao
     * @Description 创建对象
     * @Date 2:20 下午 2020/3/16
     * @Param 
     * @return 
     **/
    window.mapObj = {
        map : null,

    };

    /**
     * 监听地图搜索 搜索景点
     */
    $('#map_search').on('click', function (e) {
        var value = $('#map_search_input').val();
        var local = new BMap.LocalSearch(
            map,
            {
                renderOptions: {
                    map: map,
                    // panel : "resultDiv"
                },
                onSearchComplete: function (results) {
                    var result = results;
                    var totalPages = result.getNumPages();
                }
            });

        local.search(value);
    });

    /**
     * 监听 select 被选中事件，重新定位中心点
     */
    form.on('select(equip_filter)', function(data){
        var lat = $(data.elem).find("option:selected").attr("data-lat");
        var lng = $(data.elem).find("option:selected").attr("data-lng");
        map.centerAndZoom(new BMap.Point(lng, lat), 14);  // 初始化地图,设置中心点坐标和地图级别
    });

    /**
     * 初始化下拉列表框，初始化 设备 标注
     */
    mapObj.initSelect = function() {
        var ajax = new $ax(Feng.ctxPath + '/map/getEquip', function (data) {
            //隐藏百度地图默认标注
            var tempData = equipData = data.data;
            for (var i = 0; i < tempData.length; i++) {

                var point = new BMap.Point(tempData[i].longitude, tempData[i].latitude);

                //assets/img/icon-true.png  绿色图标 --- 在线
                //assets/img/icon-false.png 红色图标 --- 离线
                var myIcon;
                switch (tempData[i].status) {
                    case "0": myIcon = new BMap.Icon('/assets/img/icon-false.png', new BMap.Size(20, 30)); break;
                    case "1": myIcon = new BMap.Icon('/assets/img/icon-true.png', new BMap.Size(20, 30)); break;
                }
                //命名空间BMap是使用所有类的前提，别忘了。
                /*myIcon = new BMap.Icon('http://t.uysly.com/res/images/hotel/local_icon'+(i+1)+'.png', new BMap.Size(40, 40));*/
                var marker = new BMap.Marker(point, {icon: myIcon});                // 创建标注
                map.addOverlay(marker);
                //监听事件，被点击了
                marker.addEventListener("click", function(e){

                    var id, model, no, name, distributionBox;

                    for (var j = 0; j < equipData.length; j++) {
                        if (parseFloat(equipData[j].latitude) === e.target.point.lat
                            && parseFloat(equipData[j].longitude) === e.target.point.lng) {
                            id = equipData[j].id;
                            model = equipData[j].model;
                            no = equipData[j].no;
                            name = equipData[j].name;
                            distributionBox = equipData[j].distributionBox;
                        }
                    }

                    var html = [
                    '<div class="cj-li-box cj-lg-box">' +
                        '<div class="cj-img-box"><img src="img/login-logo.png" alt="" class=""></div>' +
                        '<div class="cj-info ">' +
                            '<div class="cj-span">设备型号：' + model + '</div>' +
                            '<div class="cj-span">设备编号：' + no + '</div>' +
                            '<div class="cj-span">设备名称：' + name + '</div>' +
                            '<div class="cj-span">配电箱：' + distributionBox + '</div>' +
                        '</div>' +
                        '<div class="cj-btn-box flex flex-c-c flex-r-b">' +
                            '<button class="btn-wy" style="width: 100%;" onclick="mapObj.equipDetail(\'' + id + '\')">设备详情</button>' +
                            /*'<button class="btn-wy">编辑</button>' +
                            '<select name="" id="" class="btn-wy">更多</select>' +*/
                        '</div>' +
                    '</div>'];
                    var infoBox = new BMapLib.InfoBox(map,html.join(""),{
                        boxStyle:{
                            background:"url('tipbox.gif') no-repeat center top"
                            ,width: "220px"
                            ,height: "350px"
                        }
                        ,closeIconUrl: "/assets/img/close.png"
                        ,closeIconMargin: "1px 1px 0 0"
                        ,enableAutoPan: true
                        ,align: INFOBOX_AT_BOTTOM
                        // 第一个参数 left， 第二个参数是 top，在原有的点上进行偏移
                        ,offset: new BMap.Size(123, -16)
                    });

                    //用一个变量保存起来，手动 hide()，然后让新 new 出来的 show() 出来，然后释放掉
                    if (infoBoxVar != null) {
                        infoBoxVar.hide();
                        infoBoxVar = null;
                    }

                    //1、这种方法，得到的中心点是默认的地图中心点，所以始终会在地图中心位置
                    /*infoBox.open(marker);*/
                    //2、这种方法，得到的是 当前标注的 中心点
                    infoBox.open(e.target.point);
                    infoBoxVar = infoBox;
                }); // 将标注添加到地图中
            }
        }, function () {

        });
        ajax.start();
    };

    mapObj.equipDetail = function(id) {
        window.event? window.event.cancelBubble = true : e.stopPropagation();
        window.location.href="/equip?id="+id;
    };

    $("#qpImg").on("click", function () {
       /*alert("点击了全屏按钮！！");*/
        var html = $(window.parent.document).find("body");
        /*html = html[0];*/
        var flag = html.hasClass("qp");
        //存在就移除
        flag ? html.removeClass("qp") : html.addClass("qp");
    });

    $(function(){
        mapObj.initSelect();
        /*$("#map_button").trigger("click");*/
    });
});

/*$("#map_button").click(function(){
        // 百度地图API功能
        mapObj.map = map =  new BMap.Map("map");    // 创建Map实例
        mapObj.map.centerAndZoom(new BMap.Point(115.852512,28.694018), 11);  // 初始化地图,设置中心点坐标和地图级别
        mapObj.map.setCurrentCity("南昌");          // 设置地图显示的城市 此项是必须设置的
        mapObj.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        mapObj.map.setMapStyleV2({styleJson:mapcolorjson});
    });

    $("#3dmap_button").click(function(){
        mapObj.map = map =  new BMapGL.Map("map");    // 创建Map实例
        mapObj.map.centerAndZoom(new BMapGL.Point(115.852512,28.694018), 19);  // 初始化地图,设置中心点坐标和地图级别
        mapObj.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        mapObj.map.setHeading(64.5);
        mapObj.map.setTilt(73);
    });*/