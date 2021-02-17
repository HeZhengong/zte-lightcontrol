layui.use(['layer','upload', 'form','admin', 'ax', 'func','laydate','table'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var func = layui.func;
    var laydate = layui.laydate;
    var table = layui.table;
    var upload=layui.upload;
    var form =layui.form;
    window.alarmInfoObj = {
        
    };
    /**
     * @author zmj
     * @date 2020-03-31 15:21:19
     * @Description  图片上传
     **/
    upload.render({
        elem:'#faultPath',
        url:'/home/config/upload',
        done:function (res) {
            var fileId=res.data.uploadResult.fileId;
            $("input[name='faultPath']").val(fileId);
            $("#faultPath").attr("src", Feng.ctxPath+'/home/config/seeImg/'+fileId);
        },
        error:function () {

        }
    })

    /**
     * @author zmj
     * @date 2020-03-27 11:11:53
     * @Description 控制面板点击处理按钮跳转
     **/
    $(function () {
        var showDispose=$("#showDispose").val();
        if (showDispose!=null && showDispose!=''){
            $("#ljclModal").show();
            $("#ljclModal input[name='disposeId']").val(showDispose);
        }
    })

    /**
     * @author zmj
     * @date 2020-03-25 10:22:13
     * @Description  初始化未处理列表
     **/
    alarmInfoObj.initColumnWcl= function () {
        return [[
            {type: 'checkbox'},
            {field: 'id',hide: true, sort: true, title: '用户id'},
            {title: '序号', sort: true, align: "center", templet: '#rank' },
            {field: 'alarmDate', align: "center", sort: true, title: '告警时间'},
            {field: 'alarmCategory', align: "center", sort: true, title: '告警类型'},
            {field: 'deviceName', align: "center", sort: true, title: '告警设备名称'},
            {field: 'describe', align: "center", sort: true, title: '告警描述'},
            {field: 'infrom', align: "center", sort: true, title: '通知方式', minWidth: 117},
            {align: 'center', toolbar: '#tableBarWCL', title: '操作', minWidth: 450}
        ]];
    };

    /**
     * @author zmj
     * @date 2020-03-25 10:32:00
     * @Description  渲染未处理表格
     **/
    alarmInfoObj.queryAlarmList = function(){
        $("#selectStatus").val("wcl");
        var alarmDate= $("input[name='alarmDate']").val();
        var alarmCategory=$("select[name='alarmCategory']").val();
        var tableResultWCL = table.render({
            elem: "#alarm-lise-table",
            url: Feng.ctxPath + '/alarm/alarmList'+'?alarmDate='+alarmDate+'&&alarmCategory='+alarmCategory,
            page: true,
            height: 590,
            cellMinWidth: 100,
            cols: alarmInfoObj.initColumnWcl()
        });
    }

    alarmInfoObj.queryAlarmList();
    /**
     * @author zmj
     * @date 2020-03-25 11:45:08
     * @Description  初始化已处理列表
     **/
    alarmInfoObj.initColumnYCL= function () {
        return [[
            {type: 'checkbox'},
            {field: 'id',hide: true, sort: true, title: '用户id'},
            {title: '序号', sort: true, align: "center", templet: '#rank' },
            {field: 'alarmDate', align: "center", sort: true, title: '告警时间'},
            {field: 'alarmCategory', align: "center", sort: true, title: '告警类型'},
            {field: 'deviceName', align: "center", sort: true, title: '告警设备名称'},
            {field: 'describe', align: "center", sort: true, title: '告警描述'},
            {field: 'alarmCause', align: "center", sort: true, title: '告警原因', minWidth: 117},
            {field: 'disposeDate', align: "center", sort: true, title: '处理时间', minWidth: 117},
            {align: 'center', toolbar: '#tableBarYCL', title: '操作', minWidth: 250}
        ]];
    };

    /**
     * @author zmj
     * @date 2020-03-25 11:48:39
     * @Description 渲染已处理表格
     **/
    alarmInfoObj.queryDispose = function(){
        var alarmDate= $("input[name='alarmDate']").val();
        var alarmCategory=$("select[name='alarmCategory']").val();
        var tableResultYCL = table.render({
            elem: "#alarm-lise-table",
            url: Feng.ctxPath + '/alarm/findDispose'+'?alarmDate='+alarmDate+'&&alarmCategory='+alarmCategory,
            page: true,
            height: 590,
            cellMinWidth: 100,
            cols: alarmInfoObj.initColumnYCL()
        });
    }

    /**
     * @author zmj
     * @date 2020-03-25 11:52:23
     * @Description  初始化回收站表格
     **/
    alarmInfoObj.initColumnHSZ= function () {
        return [[
            {type: 'checkbox'},
            {field: 'id',hide: true, sort: true, title: '用户id'},
            {title: '序号', sort: true, align: "center", templet: '#rank',minWidth:50},
            {field: 'alarmDate', align: "center", sort: true, title: '告警时间'},
            {field: 'alarmCategory', align: "center", sort: true, title: '告警类型'},
            {field: 'deviceName', align: "center", sort: true, title: '告警设备名称'},
            {field: 'describe', align: "center", sort: true, title: '告警描述'},
            {field: 'infrom', align: "center", sort: true, title: '通知方式', minWidth: 80},
            {field: 'alarmCause', align: "center", sort: true, title: '告警原因', minWidth: 117},
            {field: 'disposeDate', align: "center", sort: true, title: '处理时间', minWidth: 117},
            {align: 'center', toolbar: '#tableBarHSZ', title: '操作', minWidth: 250}
        ]];
    };

    /**
     * @author zmj
     * @date 2020-03-25 11:55:09
     * @Description  渲染回收站表格
     **/
    alarmInfoObj.queryDeleted = function(){
        var alarmDate= $("input[name='alarmDate']").val();
        var alarmCategory=$("select[name='alarmCategory']").val();
        var tableResultHSZ = table.render({
            elem: "#alarm-lise-table",
            url: Feng.ctxPath +'/alarm/findDeleted'+'?alarmDate='+alarmDate+'&&alarmCategory='+alarmCategory,
            page: true,
            height: 590,
            cellMinWidth: 100,
            cols: alarmInfoObj.initColumnHSZ()
        });
    }

    // 工具条点击事件
    table.on('tool(alarm-lise-table)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'ljcl') {
            alarmInfoObj.openDispose(data)
        } else if (layEvent === 'zgd') {
            alarmInfoObj.openSwo(data)
        } else if (layEvent === 'sc') {
            alarmInfoObj.delAlarm(data);
        } else if (layEvent === 'hy') {
            alarmInfoObj.restoreAlarm(data)
        }
    });

    //渲染时间选择框
    laydate.render({
        elem: '#alarmDate',
        range: false,
        max: Feng.currentDate()
    });

    laydate.render({
        elem: '#completionTime',
        range: false,
        type:'datetime',
        min: Feng.currentDate()
    });
    /**
     * @author zmj
     * @date 2020-03-24 10:37:58
     * @Description  删除告警信息操作
     **/
    alarmInfoObj.delAlarm=function(data){
        /*var status= $("#selectStatus").val();*/
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/alarm/delAlarm", function () {
                table.reload("alarm-lise-table")
                Feng.success("删除成功!");
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("id", data.id);
            ajax.start();
        };
        Feng.confirm("是否删除删除?", operation);
    }

    /**
     * @author zmj
     * @date 2020-03-24 10:16:41
     * @Description  还原按钮操作
     **/
    alarmInfoObj.restoreAlarm=function(data){
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/alarm/restoreAlarm", function (data) {
                table.reload("alarm-lise-table")
                Feng.success("还原成功!");
            }, function (data) {
                Feng.error("还原失败!" + data.responseJSON.message + "!");
            });
            ajax.set("id", data.id);
            ajax.start();
        };
        Feng.confirm("是否还原?", operation);
    }


    /**
     * @author zmj
     * @date 2020-03-24 10:33:30
     * @Description  打开装工单模态框
     **/
    alarmInfoObj.openSwo=function(data){
        $("#swoModal").show();
        $("#swoModal input[name='switchId']").val(data.id);
    };

    /**
     * @author zmj
     * @date 2020-03-24 11:04:14
     * @Description 打开立即处理模态框
     **/
    alarmInfoObj.openDispose=function(data){
        $("input[name='alarmCause']").val("");
        $("#ljclModal").show();
        $("#ljclModal input[name='disposeId']").val(data.id);
    }

    /**
     * @author zmj
     * @date 2020-03-24 11:05:36
     * @Description  立即处理模态框保存操作
     **/
    $("#ljclModal .btn-save").on("click",function () {
        $("#showDispose").val('');
        var id=$("input[name='disposeId']").val();
        var alarmCause=$("input[name='alarmCause']").val();
        if (alarmCause==""||alarmCause==null){
            alert("故障原因及解决办法...");
            Feng.error("请输入故障原因及解决办法...");
            return false;
        }
        var ajax = new $ax(Feng.ctxPath + "/alarm/disposeAlarm", function (data) {
            Feng.success("处理成功!");
            table.reload("alarm-lise-table");
        }, function (data) {
            Feng.error("处理失败!" + data.responseJSON.message + "!");
            table.reload("alarm-lise-table");
        });
        ajax.set("id", id);
        ajax.set("alarmCause",alarmCause);
        ajax.start();

        $(".modal").hide();
    })

    //未处理按钮操作
    $("#wcl").on("click",function () {
        $("#wcl").addClass("btn-g");
        $("#ycl").removeClass("btn-g");
        $("#hsz").removeClass("btn-g");
        $("#selectStatus").val("wcl");
        alarmInfoObj.queryAlarmList();
    })

    //已处理按钮操作
    $("#ycl").on("click",function () {
        $("#ycl").addClass("btn-g");
        $("#wcl").removeClass("btn-g");
        $("#hsz").removeClass("btn-g");
        $("#selectStatus").val("ycl");
        alarmInfoObj.queryDispose();
    })

    //回收站按钮操作
    $("#hsz").on("click",function () {
        $("#hsz").addClass("btn-g");
        $("#wcl").removeClass("btn-g");
        $("#ycl").removeClass("btn-g");
        $("#selectStatus").val("hsz");
        alarmInfoObj.queryDeleted();
    })

    //立即处理关闭按钮操作
    $("#ljclModal .btn-no").on("click",function () {
        $("#showDispose").val('');
        $(".modal").hide()
    })

    /**
     * @author zmj
     * @date 2020-03-31 11:56:23
     * @Description  清除装工单模态框的数据
     **/
    alarmInfoObj.cleanWorkOrder=function(){
        $("#faultPath").attr("src","");
        form.val("workOrder",{
            "address":"",
            "completionTime":"",
            "handingId":"",
            "manner":"",
            "faultPath":""
        });
    }

    //转工单关闭按钮操作
    $("#swoModal .btn-no").on("click",function () {
        $("#showDispose").val('');
        $(".modal").hide();
        alarmInfoObj.cleanWorkOrder();
    })

    //转工单保存按钮
    $("#swoModal .btn-save").on("click",function () {
        var id=$("input[name='switchId']").val();
        var address=$("input[name='address']").val();
        var completionTime=$("input[name='completionTime']").val();
        var handingId=$("select[name='handingId']").val();
        var manner=$("select[name='manner']").val();
        var faultPath=$("input[name='faultPath']").val();
        var ajax=new $ax(Feng.ctxPath + "/alarm/switchWork",function (data) {
            Feng.success("转工单成功!");
            table.reload("alarm-lise-table");
            alarmInfoObj.cleanWorkOrder();
        },function (data) {
            Feng.error("转工单失败!" + data.responseJSON.message + "!");
            table.reload("alarm-lise-table");
            alarmInfoObj.cleanWorkOrder();
        });
        ajax.set("switchId",id);
        ajax.set("address",address);
        ajax.set("completionTime",completionTime);
        ajax.set("handingId",handingId);
        ajax.set("manner",manner);
        ajax.set("faultPath",faultPath);
        ajax.start();
        $(".modal").hide();
    })

    //清除查询条件框
    $(".clear").on("click",function () {
        $("input[name='alarmDate']").val("");
        $("select[name='alarmCategory']").val("")
    })

    //查询按钮事件
    $(".search").on("click",function () {
        var status= $("#selectStatus").val();
        if (status=="wcl"){
            alarmInfoObj.queryAlarmList();
        }else if (status=="ycl"){
            alarmInfoObj.queryDispose();
        }else if (status=="hsz"){
            alarmInfoObj.queryDeleted();
        }
    })

    // 导出excel
    $('#btnExp').click(function () {
        alarmInfoObj.exportExcel();
    });

    /**
     * 导出excel按钮
     */
    alarmInfoObj.exportExcel = function () {
        var checkRows = table.checkStatus("alarm-lise-table");
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile('alarm-lise-table',checkRows.data, 'xls');
        }
    };




        /**
         * @author zmj
         * @date 2020-03-24 17:39:04
         * @Description  全选  全不选
         **/
        /*var checkStatus=true;
        $("#inverse").on("click",function () {
            if (checkStatus){
                $(this).prop("checked",true);
                $("input[type='checkbox']").each(function(){
                    $(this).prop("checked",true);
                });
                checkStatus=false;
            }else {
                $(this).prop("checked",false);
                $("input[type='checkbox']").each(function(){
                    $(this).prop("checked",false);
                });
                checkStatus=true;
            }
        });*/



        // 导出excel
       /* $('#btnExp').click(function () {
            alarmInfoObj.exportExcel();
        });
        alarmInfoObj.exportExcel = function () {
            var test=$("input[type='checkbox']");
            for (var i=0;i<test.length;i++){
                alert($(test[i]).val());
                /!*if ($(this).prop("checked")&& $(this).val()!=null &&$(this).val()!=""){

                }*!/
            }
            /!*.each(function(i){
                if ($(this).prop("checked")&& $(this).val()!=null &&$(this).val()!=""){

                }

            })*!/
           /!* var checkRows = table.checkStatus("alarm-lise-table");
            alert(checkRows);
            if (checkRows.data.length === 0) {
                Feng.error("请选择要导出的数据");
            } else {
                table.exportFile(checkRows.data, 'xls');
            }*!/
        };*/



    /**
     * @author zmj
     * @date 2020-03-24 09:07:24
     * @Description 查询所有未处理告警信息
     * 可以按照告警时间和告警类型查询
     * 页面初始化时默认查询所有未处理告警信息
     **/
    /*alarmInfoObj.queryAlarmList = function(){
        $("#alarm-lise-table tr").not(':eq(0)').empty();
        $("#selectStatus").val("wcl");
        $("#tzfs").show();
        $("#gjyy").hide();
        $("#clsj").hide();
        var alarmDate= $("input[name='alarmDate']").val();
        var alarmCategory=$("select[name='alarmCategory']").val();
        var ajax = new $ax(Feng.ctxPath + "/alarm/alarmList", function (data){
            for (var i = 0; i < data.length; i++) {
                var alarmInfo = data[i];
                var NO=i+1;
                var alarmDate=alarmInfo.alarmDate;
                var alarmCategory=alarmInfo.alarmCategory;
                var deviceName=alarmInfo.deviceName;
                var describe=alarmInfo.describe;
                var infrom=alarmInfo.infrom;

                var ljcl='<button class="btn-g" onclick="alarmInfoObj.openDispose('+alarmInfo.id+')">立即处理</button>';
                var zgd='<button class="btn-g" onclick="alarmInfoObj.openSwo('+alarmInfo.id+')">转工单</button>';
                var del='<button class="btn-g" onclick="alarmInfoObj.delAlarm('+alarmInfo.id+')">删除</button>';

                var tr="<tr>"+
                    "<td><input type='checkbox' value='"+alarmInfo.id+"'></td>"+
                    "<td>"+NO+"</td>"+
                    "<td>"+alarmDate+"</td>"+
                    "<td>"+alarmCategory+"</td>"+
                    "<td>"+deviceName+"</td>"+
                    "<td>"+describe+"</td>"+
                    "<td>"+infrom+"</td>"+
                    "<td>"+ljcl+zgd+del+"</td>"+
                    "</tr>";
                $("#alarm-lise-table").append(tr);
            }

        }, function (data) {
        });
        ajax.set("alarmDate",alarmDate);
        ajax.set("alarmCategory",alarmCategory);
        ajax.start();
    };*/

    /**
     * @author zmj
     * @date 2020-03-24 09:07:17
     * @Description 查询所有已处理告警信息
     **/
    /*alarmInfoObj.queryDispose=function(){
        $("#alarm-lise-table tr").not(':eq(0)').empty();
        var alarmDate= $("input[name='alarmDate']").val();
        var alarmCategory=$("select[name='alarmCategory']").val();
        $("#tzfs").hide();
        $("#gjyy").show();
        $("#clsj").show();
        var ajax = new $ax(Feng.ctxPath + "/alarm/findDispose", function (data){
            for (var i = 0; i < data.length; i++) {
                var alarmInfo = data[i];
                var NO=i+1;
                var alarmDate=alarmInfo.alarmDate;
                var alarmCategory=alarmInfo.alarmCategory;
                var deviceName=alarmInfo.deviceName;
                var describe=alarmInfo.describe;
                var alarmCause=alarmInfo.alarmCause;
                var disposeDate=alarmInfo.disposeDate;

                var del='<button class="btn-g" onclick="alarmInfoObj.delAlarm('+alarmInfo.id+')">删除</button>';

                var tr="<tr>"+
                    "<td><input type='checkbox' value='"+alarmInfo.id+"'></td>"+
                    "<td>"+NO+"</td>"+
                    "<td>"+alarmDate+"</td>"+
                    "<td>"+alarmCategory+"</td>"+
                    "<td>"+deviceName+"</td>"+
                    "<td>"+describe+"</td>"+
                    "<td>"+alarmCause+"</td>"+
                    "<td>"+disposeDate+"</td>"+
                    "<td>"+del+"</td>"+
                    "</tr>";
                $("#alarm-lise-table").append(tr);
            }
        },function (data) {
        });
        ajax.set("alarmDate",alarmDate);
        ajax.set("alarmCategory",alarmCategory);
        ajax.start();
    };*/

    /**
     * @author zmj
     * @date 2020-03-24 10:33:47
     * @Description  查询所有已删除告警信息
     **/
    /*alarmInfoObj.queryDeleted=function(){
        $("#alarm-lise-table tr").not(':eq(0)').empty();
        var alarmDate= $("input[name='alarmDate']").val();
        var alarmCategory=$("select[name='alarmCategory']").val();
        $("#tzfs").show();
        $("#gjyy").show();
        $("#clsj").show();
        var ajax = new $ax(Feng.ctxPath + "/alarm/findDeleted", function (data){
            for (var i = 0; i < data.length; i++) {
                var alarmInfo = data[i];
                var NO=i+1;
                var alarmDate=alarmInfo.alarmDate;
                var alarmCategory=alarmInfo.alarmCategory;
                var deviceName=alarmInfo.deviceName;
                var describe=alarmInfo.describe;
                var infrom=alarmInfo.infrom;
                var alarmCause=alarmInfo.alarmCause;
                var disposeDate=alarmInfo.disposeDate;
                if (alarmCause==null || alarmCause==""){
                    alarmCause="未处理";
                    disposeDate="未处理";
                }

                var restore='<button class="btn-g" onclick="alarmInfoObj.restoreAlarm('+alarmInfo.id+')" >还原</button>';

                var tr="<tr>"+
                    "<td><input type='checkbox' value='"+alarmInfo.id+"'></td>"+
                    "<td>"+NO+"</td>"+
                    "<td>"+alarmDate+"</td>"+
                    "<td>"+alarmCategory+"</td>"+
                    "<td>"+deviceName+"</td>"+
                    "<td>"+describe+"</td>"+
                    "<td>"+infrom+"</td>"+
                    "<td>"+alarmCause+"</td>"+
                    "<td>"+disposeDate+"</td>"+
                    "<td>"+restore+"</td>"+
                    "</tr>";
                $("#alarm-lise-table").append(tr);
            }
        },function (data) {
        });
        ajax.set("alarmDate",alarmDate);
        ajax.set("alarmCategory",alarmCategory);
        ajax.start();
    }*/

    /*alarmInfoObj.queryAlarmList();*/


});