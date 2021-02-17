layui.use(['layer','upload', 'form','admin', 'ax', 'func','laydate','table'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var laydate = layui.laydate;
    var table = layui.table;
    var upload = layui.upload;
    var form = layui.form;

    window.workOrderInfoObj = {};

    // 导出excel
    $('#btnExp').click(function () {
        workOrderInfoObj.exportExcel();
    });

    /**
     * 导出excel按钮
     */
    workOrderInfoObj.exportExcel = function () {
        var checkRows = table.checkStatus("workOrder-lise-table");
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile('workOrder-lise-table',checkRows.data, 'xls');
        }
    };

    /**
     * @author zmj
     * @date 2020-04-01 10:39:04
     * @Description 渲染搜索时间框
     **/
    laydate.render({
        elem: '#createDate',
        range: false,
        max: Feng.currentDate(),
        done: function(){
           var selectStatus=$("#selectStatus").val();
           if (selectStatus=='wcl'){
               workOrderInfoObj.queryAlarmList();
           }else if(selectStatus=='ycl'){
               workOrderInfoObj.queryDispose();
           }else if(selectStatus=='hsz'){
               workOrderInfoObj.queryDeleted();
           }

        }
    });

    //渲染新增时间框
    laydate.render({
        type:'datetime',
        elem: '#completionTime',
        range: false,
        min: Feng.currentDate()
    });

    /**
     * @author zmj
     * @date 2020-03-31 16:14:09
     * @Description  未处理工单
     **/
    workOrderInfoObj.initColumnWcl = function () {
        return [[
            {type: 'checkbox'},
            {title: '序号', sort: true, align: "center", templet: '#rank'},
            {field: 'createDate', align: "center", sort: true, title: '创建时间'},
            {field: 'id', align: "center", sort: true, title: '工单编号'},
            {field: 'address', align: "center", sort: true, title: '详细地址'},
            {field: 'describe', align: "center", sort: true, title: '问题描述'},
            {field: 'completionTime', align: "center", sort: true, title: '需要完成时间'},
            {align: 'center', toolbar: '#tableBarWCL', title: '操作', minWidth: 450}
        ]];
    };

    /**
     * @author zmj
     * @date 2020-03-31 16:31:11
     * @Description 渲染未处理工单
     **/
    workOrderInfoObj.queryAlarmList = function () {
        $("#selectStatus").val("wcl");
        var createDate = $("input[name='createDate']").val();
        var tableResultWCL = table.render({
            elem: "#workOrder-lise-table",
            url: Feng.ctxPath + '/workOrder/workOrderList?createDate=' + createDate,
            page: true,
            height: 590,
            cellMinWidth: 100,
            cols:workOrderInfoObj.initColumnWcl()
        });
    }
    workOrderInfoObj.queryAlarmList();

    /**
     * @author zmj
     * @date 2020-04-01 10:45:22
     * @Description  已处理工单
     **/
    workOrderInfoObj.initColumnYCL= function () {
        return [[
            {type: 'checkbox'},
            {title: '序号', sort: true, align: "center", templet: '#rank' },
            {field: 'createDate', align: "center", sort: true, title: '创建时间'},
            {field: 'id',hide: true, sort: true, title: '工单编号'},
            {field: 'address', align: "center", sort: true, title: '详细地址'},
            {field: 'describe', align: "center", sort: true, title: '问题描述'},
            {field: 'completionTime', align: "center", sort: true, title: '需要完成时间'},
            {align: 'center', toolbar: '#tableBarYCL', title: '操作', minWidth: 450}
        ]];
    };

    /**
     * @author zmj
     * @date 2020-04-01 10:50:52
     * @Description  渲染已处理
     **/
    workOrderInfoObj.queryDispose = function () {
        $("#selectStatus").val("ycl");
        var createDate = $("input[name='createDate']").val();
        var tableResultYCL = table.render({
            elem: "#workOrder-lise-table",
            url: Feng.ctxPath + '/workOrder/findDispose?createDate='+createDate,
            page: true,
            height: 590,
            cellMinWidth: 100,
            cols:workOrderInfoObj.initColumnYCL()
        });
    }

    /**
     * @author zmj
     * @date 2020-04-01 10:52:13
     * @Description  回收站
     **/
    workOrderInfoObj.initColumnHSZ= function () {
        return [[
            {type: 'checkbox'},
            {title: '序号', sort: true, align: "center", templet: '#rank' },
            {field: 'createDate', align: "center", sort: true, title: '创建时间'},
            {field: 'id',hide: true, sort: true, title: '工单编号'},
            {field: 'address', align: "center", sort: true, title: '详细地址'},
            {field: 'describe', align: "center", sort: true, title: '问题描述'},
            {field: 'completionTime', align: "center", sort: true, title: '需要完成时间'},
            {align: 'center', toolbar: '#tableBarHSZ', title: '操作', minWidth: 450}
        ]];
    };

    /**
     * @author zmj
     * @date 2020-04-01 10:52:55
     * @Description 渲染回收站
     **/
    workOrderInfoObj.queryDeleted = function () {
        $("#selectStatus").val("hsz");
        var createDate = $("input[name='createDate']").val();
        var tableResultYCL = table.render({
            elem: "#workOrder-lise-table",
            url: Feng.ctxPath + '/workOrder/findDeleted?createDate=' + createDate,
            page: true,
            height: 590,
            cellMinWidth: 100,
            cols:workOrderInfoObj.initColumnHSZ()
        });
    }

    //未处理按钮操作
    $("#wcl").on("click",function () {
        $("#wcl").addClass("btn-g");
        $("#ycl").removeClass("btn-g");
        $("#hsz").removeClass("btn-g");
        workOrderInfoObj.queryAlarmList();
    })

    //已处理按钮操作
    $("#ycl").on("click",function () {
        $("#ycl").addClass("btn-g");
        $("#wcl").removeClass("btn-g");
        $("#hsz").removeClass("btn-g");
        $("#selectStatus").val("ycl");
        workOrderInfoObj.queryDispose();
    })

    //回收站按钮操作
    $("#hsz").on("click",function () {
        $("#hsz").addClass("btn-g");
        $("#wcl").removeClass("btn-g");
        $("#ycl").removeClass("btn-g");
        $("#selectStatus").val("hsz");
        workOrderInfoObj.queryDeleted();
    })

    //创建工单操作
    $("#cjgd").on("click",function () {
        $("#xzgdModal .modal-tit").text("创建工单");
        workOrderInfoObj.cleanWork();
        $("#xzgdModal").show();
    })
    //创建工单取消按钮
    $("#xzgdModal .btn-no").on("click",function () {
        workOrderInfoObj.cleanWork();
        $(".modal").hide()
    })

    //处理工单取消按钮
    $("#ljclModal .btn-no").on("click",function () {
        workOrderInfoObj.cleanClWork();
        $(".modal").hide()
    })

    //详细取消按钮
    $("#xxModal .btn-no").on("click",function () {
        $(".modal").hide();
    })

    /**
     * @author zmj
     * @date 2020-04-01 17:15:33
     * @Description  创建工单保存按钮
     **/
    $("#xzgdModal .btn-save").on("click",function () {
        var workOrderEntity=form.val("workOrder");
        var ajax=null;
        var id=$("#xeId").val();
        if (id==null || id==''){
            ajax=new $ax(Feng.ctxPath + "/workOrder/insWorkOder",function (data) {
                Feng.success("创建工单成功!");
                table.reload("workOrder-lise-table");
                workOrderInfoObj.cleanWork()
            },function (data) {
                Feng.error("创建工单失败!" + data.responseJSON.message + "!");
                table.reload("workOrder-lise-table");
                workOrderInfoObj.cleanWork()
            });
        }
        else {
            ajax=new $ax(Feng.ctxPath + "/workOrder/editWorkOder",function (data) {
                Feng.success("编辑工单成功!");
                table.reload("workOrder-lise-table");
                workOrderInfoObj.cleanWork()
            },function (data) {
                Feng.error("编辑工单失败!" + data.responseJSON.message + "!");
                table.reload("workOrder-lise-table");
                workOrderInfoObj.cleanWork()
            });
        }
        ajax.set(workOrderEntity);
        ajax.start();
        $(".modal").hide();
    })

    /**
     * @author zmj
     * @date 2020-04-01 17:11:47
     * @Description  创建工单图片上传
     **/
    upload.render({
        elem:'#faultPath',
        url:'/home/config/upload',
        done:function (res) {
            var fileId=res.data.uploadResult.fileId;
            $("#xzgdModal input[name='faultPath']").val(fileId);
            $("#faultPath").attr("src", Feng.ctxPath+'/home/config/seeImg/'+fileId);
        },
        error:function () {

        }
    })


    /**
     * @author zmj
     * @date 2020-04-02 09:55:19
     * @Description  处理工单图片上传
     **/
    upload.render({
        elem:'#disposePath',
        url:'/home/config/upload',
        done:function (res) {
            var fileId=res.data.uploadResult.fileId;
            $("#ljclModal input[name='disposePath']").val(fileId);
            $("#disposePath").attr("src", Feng.ctxPath+'/home/config/seeImg/'+fileId);
        },
        error:function () {

        }
    })


    /**
     * @author zmj
     * @date 2020-04-01 17:10:15
     * @Description  清理工单新建 编辑模态框
     **/
    workOrderInfoObj.cleanWork=function(){
        $("#faultPath").attr("src","");
        form.val("workOrder",{
            "id":"",
            "address":"",
            "describe":"",
            "completionTime":"",
            "handingId":"",
            "manner":"",
            "faultPath":""
        });
    }

    /**
     * @author zmj
     * @date 2020-04-02 10:11:34
     * @Description  清空处理模态框
     **/
    workOrderInfoObj.cleanClWork=function(){
        $("#disposePath").attr("src","");
        form.val("clWorkOrder",{
            "id":"",
            "faultCause":"",
            "solution":"",
            "disposeResult":"",
            "disposePath":""
        })
    }

    /**
     * @author zmj
     * @date 2020-04-01 15:23:37
     * @Description  删除工单
     **/
    workOrderInfoObj.delWorkOrder=function(data){
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/workOrder/delWorkOrder", function () {
                table.reload("workOrder-lise-table")
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
     * @date 2020-04-01 15:25:57
     * @Description  还原工单
     **/
    workOrderInfoObj.restoreWorkOrder=function(data){
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/workOrder/restoreWorkOrder", function (data) {
                table.reload("workOrder-lise-table")
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
     * @date 2020-04-02 09:04:29
     * @Description  编辑按钮操作
     **/
    workOrderInfoObj.editWorkOrder=function(data){
        $("#xzgdModal .modal-tit").text("编辑工单");
        /*workOrderInfoObj.cleanWork();*/
        $("#xzgdModal").show();
        var ajax = new $ax(Feng.ctxPath + "/workOrder/selById", function (msg) {
            form.val("workOrder",{
                "id":msg.id,
                "address":msg.address,
                "describe":msg.describe,
                "completionTime":msg.completionTime,
                "handingId":msg.handingId,
                "manner":msg.manner,
                "faultPath":msg.faultPath
            });
            $("#faultPath").attr("src", Feng.ctxPath+'/home/config/seeImg/'+msg.faultPath);
        });
        ajax.set("id",data.id)
        ajax.start();
    }

    /**
     * @author zmj
     * @date 2020-04-02 10:19:55
     * @Description  打开立即处理模态框
     **/
    workOrderInfoObj.clWorkOrder=function(data){
        $("#ljclId").val(data.id);
        $("#ljclModal").show();
    }

    /**
     * @author zmj
     * @date 2020-04-02 10:21:18
     * @Description  处理保存按钮操作
     **/
    $("#ljclModal .btn-save").on("click",function () {
        var workOrderEntity=form.val("clWorkOrder");
        ajax=new $ax(Feng.ctxPath + "/workOrder/clWorkOder",function (data) {
            Feng.success("处理工单成功!");
            table.reload("workOrder-lise-table");
            workOrderInfoObj.cleanClWork();
        },function (data) {
            Feng.error("处理工单失败!" + data.responseJSON.message + "!");
            table.reload("workOrder-lise-table");
            workOrderInfoObj.cleanClWork();
        });
        ajax.set(workOrderEntity);
        ajax.start();
        $(".modal").hide();
    })

    /**
     * @author zmj
     * @date 2020-04-02 10:59:17
     * @Description  详细操作
     **/
    workOrderInfoObj.xxWorkOrder=function(data){
        $("#xxModal").show();
        $("#xxModal *[name]").attr("disabled", true);
        var ajax=new $ax(Feng.ctxPath + "/workOrder/selById",function (msg){
            form.val("xxWorkOrder",{
                "address":msg.address,
                "describe":msg.describe,
                "completionTime":msg.completionTime,
                "handingId":msg.handingId,
                "manner":msg.manner,
                "faultCause":msg.faultCause,
                "solution":msg.simpleName,
                "disposeResult":msg.disposeResult
            })
            $("#xxFaultPath").attr("src", Feng.ctxPath+'/home/config/seeImg/'+msg.faultPath);
            $("#xxDisposePath").attr("src", Feng.ctxPath+'/home/config/seeImg/'+msg.disposePath);
        });
        ajax.set("id",data.id);
        ajax.start();
    }
    // 工具条点击事件
    table.on('tool(workOrder-lise-table)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'ljcl') {
            workOrderInfoObj.clWorkOrder(data);
        } else if (layEvent === 'bj') {
            workOrderInfoObj.editWorkOrder(data)
        } else if (layEvent === 'sc') {
            workOrderInfoObj.delWorkOrder(data)
        } else if (layEvent === 'hy') {
            workOrderInfoObj.restoreWorkOrder(data)
        }else if (layEvent === 'xx') {
            workOrderInfoObj.xxWorkOrder(data);
        }
    });
})