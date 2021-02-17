layui.use(['layer', 'table',  'ax','form'], function () {
    var layer = layui.layer;
    var table = layui.table;
    var $ax = layui.ax;
    var form = layui.form;

    form.on('select(selectGroup)', function (obj) {
        //layer.tips(obj.elem.getAttribute('name') + '：'+obj.value + ' ' + obj.elem.getAttribute('dataId') , obj.othis);
        var value=obj.elem.getAttribute('dataValue');
        var id=obj.elem.getAttribute('dataId');
        if(obj.value!='' && value!=obj.value){
            infoObj.updateGroupId(id,obj.value);
        }
    });


    window.infoObj = {

    };

    $("#groupId").val("1");

    infoObj.initColumn= function () {
        return [[
            {type: 'checkbox'},
            {field: 'id',hide: true,width:15, title: 'id'},
            {title: '序号', align: "center",
                templet: function(d){
                    return d.LAY_TABLE_INDEX+1;
                }
            },
            {field: 'name', align: "center", title: '回路名称'},
            {title: '所属设备', templet: function(d){return d.equip.name}},
            {title: '设备编号', templet: function(d){return d.equip.no}},
            {field: 'status', align: "center", title: '回路状态',
                templet: function(d){
                    if(d.status === '0'){
                        return "关闭";
                    }else if(d.status === '1'){
                        return "打开";
                    }else if (d.status === '2'){
                        return "<span style='color: red'>故障</span>";
                    }else if (d.status === '3'){
                        return "<span style='color: red'>禁用</span>";
                    }
                }
            },
            {field:'groupId', title:'分组', templet: '#selectTool'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 350}
        ]];
    };

    table.render({
        elem: "#listTable",
        url: Feng.ctxPath + '/equipGroup/loopPage',
        page: true,
        height: 590,
        cellMinWidth: 100,
        cols: infoObj.initColumn(),
        done:function (res,curr,count) {
            var ajax = new $ax(Feng.ctxPath + "/equipGroup/selectList", function (data) {
                var selectHtml='';
                selectHtml+='<option value="">请选择</option>';
                for(var i in data){
                    selectHtml+='<option value="'+data[i].id+'">'+data[i].name+'</option>';
                }
                $("select[name='groupId']").append(selectHtml);
            });
            ajax.start();
            form.render('select');

        }
    });

    table.on('tool(listTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'remove') {
            infoObj.onRemove(data.id);
        }else if (layEvent === 'open') {
            infoObj.onUpdateLoopStatus(data.id,1,'打开');
        }else if (layEvent === 'close') {
            infoObj.onUpdateLoopStatus(data.id,0,'关闭');
        }
    });

    infoObj.search = function () {
        var queryData = {};
        queryData['name'] = $("#search_name").val();
        queryData['groupId'] = $("#groupId").val();
        table.reload("listTable", {
            where: queryData, page: {curr: 1}
        });
    };
    infoObj.search();

    // 初始化分组列表
    infoObj.groupList = function () {
        var ajax = new $ax(Feng.ctxPath + "/equipGroup/selectList", function (data) {
            $("#groupList").empty();
            var divHtml;
            for(var i in data){
                divHtml='<div class="fz-li flex flex-c-c flex-r-c">' +
                    '<span onclick="infoObj.onClickGroup(\''+data[i].id+'\',this)">'+data[i].name+'</span>' +
                    '<div class="pz-edit" onclick="infoObj.onEdit(\''+data[i].id+'\')"></div>' +
                    '</div>';
                $("#groupList").append(divHtml);
            }
        });
        ajax.start();
        infoObj.search();
    };
    infoObj.groupList();

    infoObj.onClickGroup = function (id,obj) {
        $(obj).parent(".fz-li").addClass("on").siblings(".fz-li").removeClass("on");
        $("#groupId").val(id);
        infoObj.search();
    };

    infoObj.onEdit = function(id) {
        infoObj.clearInput();
        $(".btn-del").css("display","block");
        $('.modal-tit').text("编辑分组");
        $("#modal").show();
        var ajax = new $ax(Feng.ctxPath + "/equipGroup/get", function (data) {
            $("input[name='id']").val(data.data.id);
            $("input[name='name']").val(data.data.name);
        }, function (data) {
            Feng.error("操作失败!" + data.responseJSON.message + "!");
        });
        ajax.set("id", id);
        ajax.start();
    };

    infoObj.save = function(){
        var ajax = new $ax(Feng.ctxPath + "/equipGroup/save", function (data) {
            Feng.success(data.message);
        }, function (data) {
            Feng.error("操作失败!" + data.responseJSON.message + "!");
        });
        ajax.set("id", $('input[name="id"]').val());
        ajax.set("name", $("input[name='name']").val());
        ajax.start();
        $("#modal").hide();
        infoObj.groupList();
    };

    infoObj.onRemove = function(id){
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/equipGroup/remove", function () {
                Feng.success("移除成功!");
                infoObj.search();
            }, function (data) {
                Feng.error("移除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("id", id);
            ajax.start();
        };
        if(confirm("是否移除？")){
            operation();
        }
    };

    infoObj.onDelete = function(id){
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/equipGroup/delete", function (data) {
                Feng.success(data.message);
                if(data.code==200){
                    infoObj.groupList();
                }
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("id", id);
            ajax.start();
            $("#modal").hide();
        };
        if(confirm("是否删除？")){
            operation();
        }
    };

    infoObj.onUpdateLoopStatus = function(id,status,title){
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/equip/updateLoopStatus", function () {
                Feng.success(""+title+"成功!");
                infoObj.search();
            }, function (data) {
                Feng.error(""+title+"失败!" + data.responseJSON.message + "!");
            });
            ajax.set("id", id);
            ajax.set("status", status);
            ajax.start();
        };
        if(confirm("是否"+title+"？")){
            operation();
        }
    };

    infoObj.batchUpdateLoopStatus=function(status,title){
        var checkRows = table.checkStatus("listTable");
        if (checkRows.data.length === 0) {
            Feng.error("请选择数据");
        } else {
            var id="";
            for(var i=0;i<checkRows.data.length;i++){
                id+=checkRows.data[i].id+",";
            }
            infoObj.onUpdateLoopStatus(id,status,title);
        }
    };

    infoObj.updateGroupId = function(id,groupId){
        var ajax = new $ax(Feng.ctxPath + "/equipGroup/editLoopGroup", function (data) {
            Feng.success(data.message);
        }, function (data) {
            Feng.error("操作失败!" + data.responseJSON.message + "!");
        });
        ajax.set("id", id);
        ajax.set("groupId", groupId);
        ajax.start();
        infoObj.search();
    };

    infoObj.clearInput = function () {
        var inputObjs=jQuery("#modal").find("input");
        for(var i=0;i<inputObjs.length;i++){
            var inputObj = inputObjs[i];
            inputObj.value="";
        }
    };

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        infoObj.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        $(".btn-del").css("display","none");
        infoObj.clearInput();
        $('.modal-tit').text("添加分组");
        $("#modal").show();
    });

    // 取消按钮
    $('.btn-no').click(function () {
        $(".modal").hide();
        infoObj.clearInput();
    });

    //保存按钮
    $('.btn-save').click(function () {
        if($("input[name='name']").val()===''){
            layer.alert("名称不能为空", {title: '提示：'});
        }else{
            infoObj.save();
        }
    });

    $(".btn-del").click(function () {
        var id=$("input[name='id']").val();
        infoObj.onDelete(id);
    });

});
