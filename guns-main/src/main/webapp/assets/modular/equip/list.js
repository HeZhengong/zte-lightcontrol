layui.use(['layer', 'form', 'ax', 'func','table','upload','formSelects'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var func = layui.func;
    var table = layui.table;
    var upload = layui.upload;
    var form = layui.form;
    var formSelects = layui.formSelects;

    window.infoObj = {

    };

    var num=1;
    var maxNum=1;

    infoObj.onDetail = function (id) {
        func.open({
            title: '详情',
            content: Feng.ctxPath + '/equip/detail?id=' + id,
            tableId: "listTable"
        });
    };

    $(function () {
        var id=$("input[name='equipId']").val();
        if (id!=null && id!=""){
            infoObj.onDetail(id);
        }
    })

    upload.render({
        elem: '#equipImg',
        url: Feng.ctxPath + '/system/upload',
        done: function(res){
            console.log(res);
            //上传完毕回调
            $("#equipImg").attr("src", Feng.ctxPath + '/home/config/seeImg/' + res.data.fileId);
            $('input[name="path"]').val(res.data.fileId);
        }
        ,error: function(){
            //请求异常回调
        }
    });

    infoObj.onAdd = function(){
        infoObj.clearInput();
        $(".addColumn").css("display","table-row");
        $(".editColumn").css("display","none");
        $('.modal-tit').text("添加设备");
        $("#editModal").show();
    };

    infoObj.onEdit = function(id) {
        infoObj.clearInput();
        $(".addColumn").css("display","none");
        $(".editColumn").css("display","table-row");
        $('.modal-tit').text("编辑设备");
        $("#editModal").show();
        var ajax = new $ax(Feng.ctxPath + "/equip/get", function (data) {
            infoObj.onData(data.data);
        }, function (data) {
            Feng.error("操作失败!" + data.responseJSON.message + "!");
        });
        ajax.set("id", id);
        ajax.start();
    };

    infoObj.onData = function (data) {
        formSelects.config('selLoop', {
            searchUrl: Feng.ctxPath + "/equip/listEquipLoop?equipId="+data.id,
            keyName: 'name',
            keyVal: 'id',
            success: function(id, url, searchVal, result){
                formSelects.value('selLoop',data.loops.split(',') );
            }
        });
        $("input[name='id']").val((data.id));
        $("#type").val(data.type);
        $("input[name='name']").val(data.name);
        $("input[name='no']").val(data.no);
        $("input[name='distributionBox']").val(data.distributionBox);
        $("input[name='latitude']").val(data.latitude);
        $("input[name='longitude']").val(data.longitude);
        $("input[name='path']").val(data.path);
        if(data.path!=""){
            data.path='/home/config/seeImg/'+data.path;
        }else{
            data.path='/assets/img/login-logo.png';
        }
        $("#equipImg").attr("src", Feng.ctxPath + data.path);
        $("input[name='internetCard']").val(data.internetCard);
        $("input[name='mac']").val(data.mac);
        $("input[name='loopCount']").val(data.loopCount);
        $("input[name='model']").val(data.model);
    };

    infoObj.save = function(){
        var id = $("input[name='id']").val();
        var urlStr="/equip/add";
        if(id!==''){
            urlStr="/equip/edit";
        }
        var ajax = new $ax(Feng.ctxPath + urlStr, function (data) {
            Feng.success(data.message);
        }, function (data) {
            Feng.error("操作失败!" + data.responseJSON.message + "!");
        });
        ajax.set("id", $('input[name="id"]').val());
        ajax.set("name", $("input[name='name']").val());
        ajax.set("distributionBox", $('input[name="distributionBox"]').val());
        ajax.set("latitude", $("input[name='latitude']").val());
        ajax.set("longitude", $("input[name='longitude']").val());
        ajax.set("path", $("input[name='path']").val());
        ajax.set("no", $("input[name='no']").val());
        ajax.set("type", $("#type").val());
        ajax.set("internetCard", $("input[name='internetCard']").val());
        ajax.set("mac", $("input[name='mac']").val());
        ajax.set("loopCount", $("input[name='loopCount']").val());
        ajax.set("model", $("input[name='model']").val());
        ajax.set("loops", formSelects.value('selLoop','valStr'));
        ajax.start();
        $("#editModal").hide();
        infoObj.search();
        infoObj.selectPicPage(1);
    };

    infoObj.onDelete = function(id){
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/equip/delete", function () {
                Feng.success("删除成功!");
                infoObj.search();
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("id", id);
            ajax.start();
        };
        if(confirm("是否删除？")){
            operation();
        }
    };

    infoObj.exportExcel = function(){
        var operation = function () {
            location.href=Feng.ctxPath + "/equip/exportExcel";
        };
        if(confirm("是否导出？")){
            operation();
        }else{

        }
    };

    infoObj.initColumn= function () {
        return [[
            {type: 'checkbox'},
            {field: 'id',hide: true, title: '用户id'},
            {title: '序号', align: "center",
                templet: function(d){
                    return d.LAY_TABLE_INDEX+1;
                }
            },
            {field: 'model', align: "center", title: '设备型号'},
            {field: 'name', align: "center", title: '设备名称'},
            {field: 'no', align: "center", title: '设备编号'},
            {field: 'distributionBox', align: "center", title: '配电箱'},
            {field: 'status', align: "center", title: '设备状态',
                templet: function(d){
                    if(d.status === '1'){
                        return "在线";
                    }else if (d.status === '0'){
                        return "<span style='color: red'>离线</span>";
                    }
                }
            },
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 450}
        ]];
    };

    table.render({
        elem: "#listTable",
        url: Feng.ctxPath + '/equip/selectPage',
        page: true,
        height: 590,
        cellMinWidth: 100,
        cols: infoObj.initColumn()
    });

// 工具条点击事件
    table.on('tool(listTable)', function (obj) {
        var data = obj.data;
        console.log(data);
        var layEvent = obj.event;
        if (layEvent === 'edit') {
            infoObj.onEdit(data.id);
        } else if (layEvent === 'delete') {
            infoObj.onDelete(data.id);
        } else if (layEvent === 'reset') {
            infoObj.onUpdateLoopStatus(data.id,0,'重启');
        }else if (layEvent === 'allOpen') {
            infoObj.onUpdateLoopStatus(data.id,1,'全开');
        }else if (layEvent === 'allClose') {
            infoObj.onUpdateLoopStatus(data.id,0,'全关');
        }
    });

    infoObj.search = function () {
        var queryData = {};
        queryData['name'] = $("#search_name").val();
        queryData['model'] = $("#search_model").val();
        table.reload("listTable", {
            where: queryData, page: {curr: 1}
        });
    };

    infoObj.selectPicPage = function(page){
        if(page==1){
            $("#picPage").empty();
        }
        var ajax = new $ax(Feng.ctxPath + "/equip/selectPage?page="+page, function (data) {
            for (var i = 0; i < data.data.length; i++) {
                var result = data.data[i];
                if(result.status === '1'){
                    result.status="在线";
                }else {
                    result.status="<span style='color: red'>离线</span>";
                }
                if(result.path!=""){
                    result.path='/home/config/seeImg/'+result.path;
                }else{
                    result.path='/assets/img/login-logo.png';
                }
                var divHtml='<div class="cj-li-box cj-lg-box">' +
                        '<div class="cj-img-box"><img src="'+result.path+'" alt="" class=""></div>' +
                        '<div class="cj-info " onclick="infoObj.onDetail(\''+result.id+'\')">' +
                        '<div class="cj-span">设备名称：'+result.name+'</div>' +
                        '<div class="cj-span flex"><span class="flex-1">设备编号：'+result.no+'</span><span>'+result.status+'</span></div>' +
                        '<div class="cj-span">设备型号：'+result.model+'</div>' +
                        '<div class="cj-span">配电箱：'+result.distributionBox+'</div>' +
                        '</div>' +
                        '<div class="cj-btn-box flex flex-c-c flex-r-b">' +
                        '<button class="btn-wy" onclick="infoObj.onEdit(\''+result.id+'\')">编辑</button>' +
                        '<button class="btn-wy" onclick="infoObj.onDelete(\''+result.id+'\')">删除</button>' +
                        '<div class="btn-tle btn-g">' +
                        '<div class="tle-fd flex flex-c-c flex-r-c"><span>更多</span><span class="arrow-jt"></span></div>' +
                        '<div class="tle-box">' +
                        '<button class="btn-g" onclick="infoObj.onUpdateLoopStatus(\''+result.id+'\',0,\'重启\')">重启</button>' +
                        '<button class="btn-g" onclick="infoObj.onUpdateLoopStatus(\''+result.id+'\',1,\'全开\')">全开</button>' +
                        '<button class="btn-g" onclick="infoObj.onUpdateLoopStatus(\''+result.id+'\',0,\'全关\')">全关</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                $("#picPage").append(divHtml);
                num=page+1;
            }
            maxNum= Math.ceil(data.count/10);
        }, function (data) {
        });
        ajax.set("name", $('#search_name').val());
        ajax.set("model", $('#search_model').val());
        ajax.start();
    };

    $(document).on("click",".btn-tle .tle-fd",function(){
        $(this).siblings(".tle-box").toggle();
    });
    $(document).on("click",".tle-box .btn-g",function(){
        $(this).addClass("btn-y").siblings(".btn-g").removeClass("btn-y");
    });


    infoObj.onUpdateLoopStatus = function(equipId,status,title){
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/equip/updateLoopStatus", function () {
                Feng.success(""+title+"成功!");
            }, function (data) {
                Feng.error(""+title+"失败!" + data.responseJSON.message + "!");
            });
            ajax.set("equipId", equipId);
            ajax.set("status", status);
            ajax.start();
        };
        if(confirm("是否"+title+"？")){
            operation();
        }
    };

    /**
     * @Description 关闭模块框模态框
     **/
    infoObj.closeModal = function(){
        $(".modal").hide();
        infoObj.clearInput();
    };

    /**
     * 清空 table 中的数据
     */
    infoObj.clearInput = function () {
        var inputObjs=jQuery("#editModal").find("input");
        for(var i=0;i<inputObjs.length;i++){
            var inputObj = inputObjs[i];
            inputObj.value="";
        }
        var selectObjs = jQuery("#editModal select");
        for(var i=0;i<selectObjs.length;i++){
            var selectObj = selectObjs[i];
            selectObj.value="";
        }
        $("#equipImg").attr("src", "/assets/img/add.png");
        formSelects.value('selLoop', []);
    };

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        infoObj.search();
        infoObj.selectPicPage(1);
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        infoObj.onAdd();
    });

    // 导出excel
    $('#btnExp').click(function () {
        infoObj.exportExcel();
    });

    //切换图文与列表
    $(".flex-1 .btn-g").on("click",function(){
        $(this).addClass("btn-y").siblings(".btn-g").removeClass("btn-y")
    });

    //列表
    $('#btnList').click(function () {
        $("#tablePage").css("display","flex");
        $("#picPage").css("display","none");
        infoObj.search();
    });

    //图文
    $('#btnPic').click(function () {
        $("#tablePage").css("display","none");
        $("#picPage").css("display","flex");
        infoObj.selectPicPage(1);
    });

    $('.btn-no').click(function () {
        infoObj.closeModal();
    });

    $('.btn-save').click(function () {
        var no=$("input[name='no']").val();
        if($("input[name='name']").val()===''){
            layer.alert("设备名称不能为空", {title: '提示：'});
        }else if(no===''){
            layer.alert("设备编号不能为空", {title: '提示：'});
        }else if(!onCheck()){
            layer.alert("设备号重复", {title: '提示：'});
        }else if($("input[name='loopCount']").val()===''){
            layer.alert("回路数不能为空", {title: '提示：'});
        }else{
            infoObj.save();
        }
    });

    function onCheck(){
        var isCheck = false;
        var id=$("input[name='id']").val();
        var no=$("input[name='no']").val();
        $.ajax({
            type:"post",
            url:"/equip/check",
            async: false,
            data:{"id":id,"no":no},
            success:function(resurlt) {
                isCheck = resurlt;
            }
        });
        return isCheck;
    }

    //监听行单击事件（双击事件为：rowDouble）
    table.on('rowDouble(listTable)', function(obj){
        var data = obj.data;
        infoObj.onDetail(data.id);
    });

    $(window).unbind("scroll");
    $(window).bind("scroll", function(){
        var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
        if(($(document).height()-10) <= totalheight) {
            if(num<=maxNum){
                infoObj.selectPicPage(num);
            }
        }
    });
});
