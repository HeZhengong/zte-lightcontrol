layui.use(['transfer','form','admin', 'ax', 'func','table'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var func = layui.func;
    var table = layui.table;
    var transfer=layui.transfer;
    var form=layui.form;
    window.alarmConfigInfo={

    };

    $(function () {
        $("#gjlx").val("sblx");
    })

    /**
     * @author zmj
     * @date 2020-04-09 09:51:33
     * @Description  初始化三箱电告警列表
     **/
    alarmConfigInfo.initColumnBox= function () {
        return [[
            {field: 'id',hide: true, sort: true, title: '配置id'},
            {field: 'equipId',hide: true, sort: true, title: '设备id'},
            {field: 'typeId',hide: true, sort: true, title: '配置类型id'},
            {rowspan:2,title: '序号', sort: true, align: "center",templet: function(d){
                    return d.LAY_TABLE_INDEX+1;
                }
            },
            {rowspan:2,field: 'equipName', align: "center", sort: true, title: '设备名称'},
            {colspan:3,align: "center", sort: true, title: '电压阈值(V)'},
            {colspan:3,align: "center", sort: true, title: '电流阈值(A)'},


           /* {rowspan:3,align: "center", sort: true, title: '电流阈值(A)'},*/
            {rowspan:2,align: 'center', toolbar: '#tableBarBox', title: '操作', minWidth: 300}
        ],[
            {align: "center", sort: true, title: 'A相电压',templet:function (d) {
                    return d.aVoltageMin+"-"+d.aVoltageMax;
                }},
            {align: "center", sort: true, title: 'B相电压',templet:function (d) {
                    return d.bVoltageMin+"-"+d.bVoltageMax;
                }},
            {align: "center", sort: true, title: 'C相电压',templet:function (d) {
                    return d.cVoltageMin+"-"+d.cVoltageMax;
                }},

            {align: "center", sort: true, title: 'A相电流',templet:function (d) {
                    return d.aElectricityMin+"-"+d.aElectricityMax;
                }},
            {align: "center", sort: true, title: 'B相电流',templet:function (d) {
                    return d.bElectricityMin+"-"+d.bElectricityMax;
                }},
            {align: "center", sort: true, title: 'C相电流',templet:function (d) {
                    return d.cElectricityMin+"-"+d.cElectricityMax;
                }},
        ]

    ];
    };

    /**
     * @author zmj
     * @date 2020-04-09 09:52:05
     * @Description  渲染三相电表格
     **/
    var tableResultBox = table.render({
        elem: "#box-lise-table",
        url: Feng.ctxPath + '/alarmConfig/queryBox',
        page: true,
        height: 330,
        cellMinWidth: 100,
        cols: alarmConfigInfo.initColumnBox()
    });

    //工具条点击事件(三相电)
    table.on('tool(box-lise-table)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'szBox') {
            alarmConfigInfo.openBox(data);
        }
    })

    /**
     * 打开三相电设置模态框
     */
    alarmConfigInfo.openBox=function(data){
        $(".boxModal .modal-tit").text(data.equipName);
        form.val("boxFrom",{
            "id":data.id,
            "equipId":data.equipId,
            "typeId":"2",
            "aVoltageMin":data.aVoltageMin,
            "aVoltageMax":data.aVoltageMax,
            "bVoltageMin":data.bVoltageMin,
            "bVoltageMax":data.bVoltageMax,
            "cVoltageMin":data.cVoltageMin,
            "cVoltageMax":data.cVoltageMax,
            "aElectricityMin":data.aElectricityMin,
            "aElectricityMax":data.aElectricityMax,
            "bElectricityMin":data.bElectricityMin,
            "bElectricityMax":data.bElectricityMax,
            "cElectricityMin":data.cElectricityMin,
            "cElectricityMax":data.cElectricityMax
        });
        $("#boxModal").show()
    }

    /**
     * 取消按钮(三相电模态框)
     */
    $("#boxModal .btn-no").on('click',function () {
        $("#boxModal").hide();
    })

    /**
     * @author zmj
     * @date 2020-04-09 14:12:27
     * @Description  三相电保存按钮
     **/
    $("#boxModal .btn-save").on('click',function () {
        var electricityBoxEntity=form.val("boxFrom");
        var ajax = new $ax(Feng.ctxPath + "/alarmConfig/saveBox", function(msg){
            if (msg==1){
                Feng.success("保存成功!");
                table.reload("box-lise-table");
                $("#boxModal").hide();
            }else {
                Feng.error("保存失败!" + msg.responseJSON.message + "!");
                table.reload("box-lise-table");
                $("#boxModal").hide();
            }
        });
        ajax.set(electricityBoxEntity);
        ajax.start();
    })
    

    /**
     * @author zmj
     * @date 2020-04-08 15:32:42
     * @Description  初始化回路电流表格
     **/
    alarmConfigInfo.initColumnWcl= function () {
        return [[
            {field: 'id',hide: true, sort: true, title: '配置id'},
            {field: 'equipId',hide: true, sort: true, title: '设备id'},
            {field: 'typeId',hide: true, sort: true, title: '配置类型id'},
            {title: '序号', sort: true, align: "center",templet: function(d){
                    return d.LAY_TABLE_INDEX+1;
                }
            },
            {field: 'loopName', align: "center", sort: true, title: '回路名称'},
            {field: 'equipName', align: "center", sort: true, title: '设备名称'},
            {align: "center", sort: true, title: '阈值电流(A)',templet:function (d) {
                    return d.currentMin+"-"+d.currentMax;
                }
            },
            {align: 'center', toolbar: '#tableBarCurrent', title: '操作', minWidth: 300}
        ]];
    };
    /**
     * @author zmj
     * @date 2020-04-08 15:57:10
     * @Description  渲染回路电流表格
     **/
    var tableResultCurrent = table.render({
        elem: "#current-lise-table",
        url: Feng.ctxPath + '/alarmConfig/queryCurrent',
        page: true,
        height: 350,
        cellMinWidth: 100,
        cols: alarmConfigInfo.initColumnWcl()
    });

    //工具条点击事件(回路电流)
    table.on('tool(current-lise-table)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'szCurrent') {
            alarmConfigInfo.openCurrent(data);
        }
    })

    /**
     * 打开阈值设置模态框
     */
    alarmConfigInfo.openCurrent=function(data){
        form.val("currentFrom",{
            "id":data.id,
            "equipId":data.equipId,
            "typeId":"4",
            "currentMin":data.currentMin,
            "currentMax":data.currentMax,
            "loopId":data.loopId
        });
        $("#currentModal").show()
    }

    /**
     * 取消按钮(阈值设置模态框)
     */
    $("#currentModal .btn-no").on('click',function () {
        $("#currentModal").hide();
    })

    /**
     * @author zmj
     * @date 2020-04-08 16:38:14
     * @Description  阈值设置保存按钮
     **/
    $("#currentModal .btn-save").on('click',function () {
        var currentEntity=form.val("currentFrom");
        var ajax = new $ax(Feng.ctxPath + "/alarmConfig/saveCurrent", function(msg){
            if (msg==1){
                Feng.success("保存成功!");
                table.reload("current-lise-table");
                $("#currentModal").hide();
            }else {
                Feng.error("保存失败!" + msg.responseJSON.message + "!");
                table.reload("current-lise-table");
                $("#currentModal").hide();
            }
        });
        ajax.set(currentEntity);
        ajax.start();
    })

    /**
     * @author zmj
     * @date 2020-04-08 10:06:57
     * @Description 初始化设备离线
     **/
    alarmConfigInfo.initOffLine=function(){
        var id=$("input[name='sblxId']").val()
        var ajax = new $ax(Feng.ctxPath + "/alarmConfig/initOffLine", function(msg){
            if (msg.alarmSwitch==0){
                $("#sblxModel input[name='alarmSwitch']").prop('checked',true);
            }else if(msg.alarmSwitch==1){
                $("#sblxModel input[name='alarmSwitch']").prop('checked',false);
            }
            $("#sblxModel #inform").val(msg.inform);
            $("#sblxModel input[name='offLineDays']").val(msg.offLineDays);
        });
        ajax.set("id",id);
        ajax.start();
    }
    alarmConfigInfo.initOffLine();

    /**
     * @author zmj
     * @date 2020-04-08 14:31:22
     * @Description  初始化三电箱告警
     **/
    alarmConfigInfo.initBox=function(){
        var id=$("input[name='sxdId']").val();
        var ajax = new $ax(Feng.ctxPath + "/alarmConfig/init", function(msg){
            if (msg.alarmSwitch==0){
                $("#sxdModel input[name='alarmSwitch']").prop('checked',true);
            }else if(msg.alarmSwitch==1){
                $("#sxdModel input[name='alarmSwitch']").prop('checked',false);
            }
            $("#sxdModel select[name='inform']").val(msg.inform);
        });
        ajax.set("id",id);
        ajax.start();
    }

    /**
     * @author zmj
     * @date 2020-04-08 14:30:25
     * @Description  初始化异常开关告警
     **/
    alarmConfigInfo.initSwitch=function(){
        var id=$("input[name='yckgId']").val();
        var ajax = new $ax(Feng.ctxPath + "/alarmConfig/init", function(msg){
            if (msg.alarmSwitch==0){
                $("#yckgModel input[name='alarmSwitch']").prop('checked',true);
            }else if(msg.alarmSwitch==1){
                $("#yckgModel input[name='alarmSwitch']").prop('checked',false);
            }
            $("#yckgModel select[name='inform']").val(msg.inform);
        });
        ajax.set("id",id);
        ajax.start();
    }

    /**
     * @author zmj
     * @date 2020-04-08 14:32:56
     * @Description  初始化回流电路
     **/
    alarmConfigInfo.initCurrent=function(){
        var id=$("input[name='hldlId']").val();
        var ajax = new $ax(Feng.ctxPath + "/alarmConfig/init", function(msg){
            if (msg.alarmSwitch==0){
                $("#hldlModel input[name='alarmSwitch']").prop('checked',true);
            }else if(msg.alarmSwitch==1){
                $("#hldlModel input[name='alarmSwitch']").prop('checked',false);
            }
            $("#hldlModel select[name='inform']").val(msg.inform);
        });
        ajax.set("id",id);
        ajax.start();
    }

    /**
     * @author zmj
     * @date 2020-04-08 11:31:13
     * @Description  保存设备离线配置
     **/
    alarmConfigInfo.saveOffLine=function(){
        var id=$("input[name='sblxId']").val();
        var inform=$("#sblxModel #inform").val();
        var offLineDays=$("#sblxModel input[name='offLineDays']").val();
        var alarmSwitch='';
        if ($("#sblxModel input[name='alarmSwitch']").prop('checked')){
            alarmSwitch=0;
        }else {
            alarmSwitch=1;
        }
        var ajax = new $ax(Feng.ctxPath + "/alarmConfig/updOffLineConfig", function(msg){
            if (msg>1){
                Feng.success("保存成功!");
                    alarmConfigInfo.equipXz();
            }
        })
        ajax.set("id",id);
        ajax.set("inform",inform);
        ajax.set("offLineDays",offLineDays);
        ajax.set("alarmSwitch",alarmSwitch);
        ajax.start();
    }

    /**
     * @author zmj
     * @date 2020-04-08 14:45:54
     * @Description  保存三箱电配置
     **/
    alarmConfigInfo.saveBox=function(){
        var id=$("input[name='sxdId']").val();
        var inform=$("#sxdModel select[name='inform']").val();
        var alarmSwitch='';
        if ($("#sxdModel input[name='alarmSwitch']").prop('checked')){
            alarmSwitch=0;
        }else {
            alarmSwitch=1;
        }
        alarmConfigInfo.setSaveAjax(id,inform,alarmSwitch);
    }


    /**
     * @author zmj
     * @date 2020-04-08 14:49:11
     * @Description  保存异常开关配置
     **/
    alarmConfigInfo.saveSwitch=function(){
        var id=$("input[name='yckgId']").val();
        var inform=$("#yckgModel select[name='inform']").val();
        var alarmSwitch='';
        if ($("#yckgModel input[name='alarmSwitch']").prop('checked')){
            alarmSwitch=0;
        }else {
            alarmSwitch=1;
        }
        alarmConfigInfo.setSaveAjax(id,inform,alarmSwitch);
    }

    /**
     * @author zmj
     * @date 2020-04-08 14:55:42
     * @Description  保存回路电流配置
     **/
    alarmConfigInfo.saveCurrent=function(){
        var id=$("input[name='sblxId']").val();
        var inform=$("#hldlModel select[name='inform']").val();
        var alarmSwitch='';
        if ($("#hldlModel input[name='alarmSwitch']").prop('checked')){
            alarmSwitch=0;
        }else {
            alarmSwitch=1;
        }
        alarmConfigInfo.setSaveAjax(id,inform,alarmSwitch);
    }


    /**
     * @author zmj
     * @date 2020-04-08 14:54:03
     * @Description  后三个配置的保存请求
     **/
    alarmConfigInfo.setSaveAjax=function(id,inform,alarmSwitch){
        var ajax = new $ax(Feng.ctxPath + "/alarmConfig/upd", function(msg){
            if (msg>0){
                Feng.success("保存成功!");
                alarmConfigInfo.equipXz();
            }
        })
        ajax.set("id",id);
        ajax.set("inform",inform);
        ajax.set("alarmSwitch",alarmSwitch);
        ajax.start();
    }

    /**
     * @author zmj
     * @date 2020-04-07 10:07:44
     * @Description  初始化穿梭框
     **/
    alarmConfigInfo.setShuttleBox=function(){
        //用于初始化左边
        var data=[];
        //用于初始化右边
        var data2=[];
        var serie={};
        var offLine='';
        var electricityBox='';
        var abnormalSwitch='';
        var loopCurrent='';
        var gjlx=$("#gjlx").val();
        /**
         * 获取穿梭框左右两边的数据
         */
        var ajax = new $ax(Feng.ctxPath + "/alarmConfig/selEquip", function (msg) {
            for (var i=0;i<msg.length;i++) {
                serie = {"value": msg[i].id, "title": msg[i].name}
                data.push(serie);
                switch (gjlx) {
                    case 'sblx':
                        msg[i].offLine == 1 ? data2.push(msg[i].id) : null;
                        break;
                    case 'sxd' :
                        msg[i].electricityBox == 1 ? data2.push(msg[i].id) : null;
                        break;
                    case 'yckg':
                        msg[i].abnormalSwitch == 1 ? data2.push(msg[i].id) : null;
                        break;
                    case 'hldl':
                        msg[i].loopCurrent == 1 ? data2.push(msg[i].id) : null;
                        break;
                }

            }
        });
        ajax.start();
        /**
         * 初始化左右两边数据
         */
        transfer.render({
            elem:'#shuttleBox'
            ,title:['告警配置','不告警配置']
            ,data: data
            ,value:data2
            ,onchange: function(data, index){
                /*console.log(data); //得到当前被穿梭的数据
                console.log(index); //如果数据来自左边，index 为 0，否则为 1*/
                var test='';
                for (var i=0;i<data.length;i++){
                    test+=data[i].value+','
                }
                test = (test.substring(0, test.lastIndexOf(','))).trim();

                switch (gjlx) {
                    case 'sblx':
                        index==0?offLine=1:offLine=0;
                        break;
                    case 'sxd' :
                        index==0?electricityBox=1:electricityBox=0;
                        break;
                    case 'yckg':
                        index==0?abnormalSwitch=1:abnormalSwitch=0;
                        break;
                    case 'hldl':
                        index==0?loopCurrent=1:loopCurrent=0;
                        break;
                }

                var ajax = new $ax(Feng.ctxPath + "/alarmConfig/updStatus", function () {
                });
                ajax.set("id",test);
                ajax.set("offLine",offLine);
                ajax.set("electricityBox",electricityBox);
                ajax.set("abnormalSwitch",abnormalSwitch);
                ajax.set("loopCurrent",loopCurrent);
                ajax.start();
            }
        })
    }
    alarmConfigInfo.setShuttleBox();

    /**
     * 菜单样式
     * @param obj
     */
    alarmConfigInfo.onClickGroup=function(obj){
        $(obj).addClass("on").siblings(".fz-li").removeClass("on");
    }
    /**
     * 设备选择样式
     */
    alarmConfigInfo.onClickConfig=function(){
        $("#cspz").addClass("ifr-pz1");
        $("#sbxz").removeClass("ifr-pz1");
    }

    /**
     * 设备离线
     */
    $("#sblx").on('click',function () {
        $("#gjlx").val("sblx");
        alarmConfigInfo.onClickConfig();
        alarmConfigInfo.setShuttleBox();
        alarmConfigInfo.initOffLine();
        $(".wb-box").hide();
        $("#sblxModel").show();
    })

    /**
     * 三箱电
     */
    $("#sxd").on('click',function () {
        $("#gjlx").val("sxd");
        alarmConfigInfo.onClickConfig();
        alarmConfigInfo.setShuttleBox();
        alarmConfigInfo.initBox();
        $(".wb-box").hide();
        $("#sxdModel").show();
    })

    /**
     * 异常开关
     */
    $("#yckg").on('click',function () {
        $("#gjlx").val("yckg");
        alarmConfigInfo.onClickConfig();
        alarmConfigInfo.setShuttleBox();
        alarmConfigInfo.initSwitch();
        $(".wb-box").hide();
        $("#yckgModel").show();
    })

    /**
     * 回路电流
     */
    $("#hldl").on('click',function () {
        $("#gjlx").val("hldl");
        alarmConfigInfo.onClickConfig();
        alarmConfigInfo.setShuttleBox();
        alarmConfigInfo.initCurrent();
        $(".wb-box").hide();
        $("#hldlModel").show();
    })

    /**
     * @author zmj
     * @date 2020-04-07 16:40:46
     * @Description  参数配置
     *                 隐藏其他div，显示对应的模块
     **/
    $("#cspz").on("click",function () {
        alarmConfigInfo.onClickConfig();
        $(".wb-box").hide();
        var gjlx=$("#gjlx").val();
        switch (gjlx) {
            case 'sblx':
                $("#sblxModel").show();
                break;
            case 'sxd' :
                $("#sxdModel").show();
                break;
            case 'yckg':
                $("#yckgModel").show();
                break;
            case 'hldl':
                $("#hldlModel").show();
                break;
        }

    })

    /**
     * @author zmj
     * @date 2020-04-07 16:41:48
     * @Description  设备选择
     *                  隐藏其他div，显示对应的模块
     **/
    alarmConfigInfo.equipXz=function(){
        $("#sbxz").addClass("ifr-pz1");
        $("#cspz").removeClass("ifr-pz1");
        $(".wb-box").hide();
        $("#shuttleModel").show();
    }
    $("#sbxz").on("click",function () {
        alarmConfigInfo.equipXz();
    })
    $(".wb-box .btn-no").on("click",function(){
        alarmConfigInfo.equipXz();
    })

    $("#sblxModel .i-down").on('click',function () {
        var val ='';
            val= $("#sblxModel input[name='offLineDays']").val();
            val=val-1;
        $("#sblxModel input[name='offLineDays']").val(val)
    })

    $("#sblxModel .i-up").on('click',function () {
        //0-false 1-true
        /*alert( $("input[name='alarmSwitch']").prop('checked',1));*/
        var val ='';
        val= $("#sblxModel input[name='offLineDays']").val();
        $("#sblxModel input[name='offLineDays']").val(parseInt(val)+1)
    })
})