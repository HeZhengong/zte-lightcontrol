layui.use(['layer', 'admin', 'ax','form','func','laydate','table'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var func = layui.func;
    var laydate = layui.laydate;
    var table = layui.table;
    var form = layui.form;

    window.mapObj = {
        map : null,

    }
    /**
     * @author zmj
     * @date 2020-03-31 15:48:04
     * @Description  全屏操作
     **/
    $("#qpImg").on("click", function () {
        var html = $(window.parent.document).find("body");
        var flag = html.hasClass("qp");
        flag ? html.removeClass("qp") : html.addClass("qp");
    });

    /**
     * @author zmj
     * @date 2020-03-27 16:18:29
     * @Description  初始化地图标注以及点击弹出
     **/
    mapObj.initMap =function(){
        var ajax = new $ax(Feng.ctxPath + '/map/getEquip', function (data) {
            //隐藏百度地图默认标注
            var tempData  =equipData= data.data;
            for (var i = 0; i < tempData.length; i++) {
                var point = new BMap.Point(tempData[i].longitude, tempData[i].latitude);

                if (i==1){
                    mapObj.map.centerAndZoom(point, 15);  // 初始化地图,设置中心点坐标和地图级别
                    $("#equip_select").val(tempData[i].id);
                    form.render('select','equip_select');
                    var ajax1=new  $ax(Feng.ctxPath + "/board/selScene", function (msg){
                        $("#sceneText").text("当前场景："+msg.name);
                        $("#scene").attr("src", Feng.ctxPath+'/home/config/seeImg/'+msg.path);
                    });
                    ajax1.set("id",tempData[i].id);
                    ajax1.start();
                }
                //命名空间BMap是使用所有类的前提，别忘了。
                var myIcon;
                switch (tempData[i].status) {
                    case "0": myIcon = new BMap.Icon('/assets/img/icon-false.png', new BMap.Size(20, 30)); break;
                    case "1": myIcon = new BMap.Icon('/assets/img/icon-true.png', new BMap.Size(20, 30)); break;
                }
                var marker = new BMap.Marker(point, {icon: myIcon});
                mapObj.map.addOverlay(marker); // 创建标注
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
                    var html =[
                        '<div class="cj-li-box cj-lg-box">' +
                        '<div class="cj-img-box"><img src="img/login-logo.png" alt="" class=""></div>' +
                        '<div class="cj-info ">' +
                        '<div class="cj-span">设备型号：' + model + '</div>' +
                        '<div class="cj-span">设备编号：' + no + '</div>' +
                        '<div class="cj-span">设备名称：' + name + '</div>' +
                        '<div class="cj-span">配电箱：' + distributionBox + '</div>' +
                        '</div>' +
                        '<div class="cj-btn-box flex flex-c-c flex-r-b">' +
                        '<button class="btn-wy" style="width: 100%" onclick="mapObj.showEquip(\''+id+'\')">设备详情</button>' +
                        '</div>' +
                        '</div>'
                    ];
                    var infoBox = new BMapLib.InfoBox(mapObj.map,html.join(""),{
                        boxStyle:{
                            width: "220px"
                            ,height: "350px"
                        }
                        ,enableAutoPan: true
                        ,closeIconUrl:"/assets/img/close.png"
                        ,align: INFOBOX_AT_BOTTOM
                        // 第一个参数 是纬度， 第二个参数是 经度
                        ,offset: new BMap.Size(123, -10)
                    });
                    //用一个变量保存起来，手动 hide()，然后让新 new 出来的 show() 出来，然后释放掉
                    if (infoBoxVar != null) {
                        infoBoxVar.hide();
                        infoBoxVar = null;
                    }
                    //1、这种方法，得到的中心点是默认的地图中心点
                    /*infoBox.open(marker);*/
                    //2、这种方法，得到的是 当前标注的 中心点
                    infoBox.open(e.target.point);
                    infoBoxVar = infoBox;
                });
            }
        }, function () {

        });
        ajax.start();
    };

    /**
     * @author zmj
     * @date 2020-03-30 11:48:17
     * @Description  设备详细跳转
     **/
    mapObj.showEquip=function(id){
        window.event? window.event.cancelBubble = true : e.stopPropagation();
        window.location.href="/equip?id="+id;
    }

    /**
     * @author zmj
     * @date 2020-03-27 16:19:06
     * @Description  下拉框选择定位
     **/
    form.on('select(equip_filter)', function(data){
        var lat = $(data.elem).find("option:selected").attr("data-lat");
        var lng = $(data.elem).find("option:selected").attr("data-lng");
        mapObj.map.centerAndZoom(new BMap.Point(lng, lat), 15);  // 初始化地图,设置中心点坐标和地图级别
        var ajax=new  $ax(Feng.ctxPath + "/board/selScene", function (msg){
            $("#sceneText").text("当前场景："+msg.name);
            $("#scene").attr("src", Feng.ctxPath+'/home/config/seeImg/'+msg.path);
        });
        ajax.set("id",data.value);
        ajax.start();
    });


    /**
     * @author zmj
     * @date 2020-03-26 11:25:10
     * @Description  初始化告警列表
     **/
    mapObj.queryAlarmList=function(){
        $("#queryAlarmList").empty();
        var ajax = new $ax(Feng.ctxPath + "/alarm/alarmList", function (msg){
                var data=msg.data;
                for (var i = 0; i <data.length; i++) {
                    var alarmInfo = data[i];
                    var id=alarmInfo.id;
                    var alarmDate=alarmInfo.alarmDate;
                    var describe=alarmInfo.describe;
                    var div="<div class='map-p-info1' style='height: 2rem'>"+
                        "<span>"+alarmDate+"</span>"+"&nbsp;&nbsp"+
                        "<span>未处理</span>"+"&nbsp;&nbsp"+
                        "<span>"+describe+"</span>"+"&nbsp;&nbsp"+
                        "<button class='btn-g' onclick='mapObj.showDispose("+id+")'>立即处理</button>"+
                        "</div>"
                    $("#queryAlarmList").append(div)
                }
        }, function (data) {
        });
        ajax.start();
    }
    mapObj.queryAlarmList();

    /**
     * @author zmj
     * @date 2020-03-26 11:42:58
     * @Description 立即处理跳转
     **/
    mapObj.showDispose=function(id){
        window.event? window.event.cancelBubble = true : e.stopPropagation();
        window.location.href="/alarm/alarmInfo?id="+id;
    }

    /**
     * @author zmj
     * @date 2020-03-27 08:50:55
     * @Description  设备类型统计
     **/
    mapObj.countType=function(){
        var dom3 = document.getElementById("countType");
        var myChart=echarts.init(dom3);
        $.get("/board/countType",function (data) {
            var datas=[];
            var serie={};
            var count=0;
            for (var i=0;i<data.length;i++){
                count+=data[i]["countType"]
                serie={
                    value:data[i]["countType"], name:data[i]["type"]
                }
                datas.push(serie);
            }
            myChart.setOption({
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                graphic:{       //图形中间文字
                    type:"text",
                    left:"center",
                    top:"center",
                    style:{
                        text:"设备类型："+count,
                        textAlign:"center",
                        fill:"#fff",
                        fontSize:15
                    }
                },
                series:[
                    {
                        name:"设备类型统计",
                        type:'pie',
                        data:datas,
                        radius: ['70%', '90%']
                    }
                ]
            })
        },"json")
    }
    mapObj.countType();

   /**
    * @author zmj
    * @date 2020-03-27 09:34:46
    * @Description 设备在线率统计
    **/
   mapObj.count=function(){
       $.get("/board/count",function (data) {
           var num = data['count'];
           var all = data['countAll'];
           var circle = document.querySelectorAll("circle")[1];
           var percent = num / all, perimeter = Math.PI * 2 * 45;
           var onlineRate=(percent*100).toFixed(1)+"%"
           $("#onlineRate").text(onlineRate);
           circle.setAttribute('stroke-dasharray', perimeter * percent + " " + perimeter * (1- percent));
       })
    }
    mapObj.count();

   /**
    * @author zmj
    * @date 2020-03-27 11:41:46
    * @Description  耗能统计
    **/
   mapObj.energy=function(){
       option = {
           backgroundColor:'rgba(255,255,255,0)',
           xAxis: {
               type: 'category',
               name:'日',
               nameLocation:'end',
               nameTextStyle:{
                 color: '#fff'
               },
               axisTick:{
                   show:false,
               },
               boundaryGap: false,
               axisTick:{
                   show:false,
               },
               axisLabel:{
                   color:'#fff'
               },
               axisLine:{
                   lineStyle:{
                       color:'rgba(12,102,173,.5)',
                       width:2,
                   }
               },
           },
           yAxis: {
               type: 'value',
               axisTick:{
                   show:false,//不显示刻度线
               },
               axisLabel:{
                   color:'#fff'  //y轴上的字体颜色
               },
               axisLine:{
                   lineStyle:{
                       width:2,
                       color:'rgba(12,102,173,.5)',//y轴的轴线的宽度和颜色
                   }
               },
               splitLine: {
                   show: false
               }
           },
           series: [
               {
                   type:'line',
                   symbol: 'none',
                   smooth:true,
                   itemStyle: {
                       normal: {
                           color: '#09b0f5',
                       }
                   },
                   areaStyle: {
                       normal: {
                           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                               offset: 0,
                               color: '#09b0f5'
                           }, {
                               offset: 1,
                               color: 'rgba(12,102,173,.5)'
                           }])
                       }
                   },
               }
           ]
       };
       option.xAxis.data = ['01','02','03','04','05','06','07','08','09','10','11','12 (月)'];
       option.series[0].data = [21,25,27,12,22,21,25,27,12,22,42,32];
       var chart3 = echarts.init(document.getElementById('energy'));
       chart3.setOption(option);
   }
    mapObj.energy();

    $("#map_button").click(function(){

        $(this).addClass("btn-g");
        $("#3dmap_button").removeClass("btn-g")
        // 百度地图API功能
        mapObj.map = new BMap.Map("map");    // 创建Map实例
        mapObj.initMap();
        mapObj.map.setCurrentCity("南昌");          // 设置地图显示的城市 此项是必须设置的
        mapObj.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        mapObj.map.setMapStyleV2({styleJson:mapcolorjson});
    });

    $("#3dmap_button").click(function(){
        $(this).addClass("btn-g");
        $("#map_button").removeClass("btn-g")
        mapObj.map = new BMapGL.Map("map");    // 创建Map实例
        mapObj.map.centerAndZoom(new BMapGL.Point(115.852512,28.694018), 19);  // 初始化地图,设置中心点坐标和地图级别
        mapObj.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        mapObj.map.setHeading(64.5);
        mapObj.map.setTilt(73);
    });
    $(function(){
        $("#map_button").trigger("click");
    });

})
var infoBoxVar = null;
var equipData = null;