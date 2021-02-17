layui.use(['layer', 'ax','table'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var table = layui.table;
    var ajax = new $ax(Feng.ctxPath + "/equip/get?id=" + Feng.getUrlParam("id"));
    var result = ajax.start().data;

    //监听单元格编辑
    table.on('edit(listTable)', function(obj){
        var value = obj.value //得到修改后的值
            ,data = obj.data //得到所在行所有键值
            ,field = obj.field; //得到字段
        infoObj.save(data.id,value);
        //layer.msg('[ID: '+ data.id +'] ' + field + ' 字段更改为：'+ value);
    });

    window.infoObj = {

    };

    infoObj.onData = function(){
        $("#equipDetail").empty();
        $("#threeCurrent").empty();
        if(result.status === '1'){
            result.status= "在线";
        }else if (result.status === '0'){
            result.status= "<span style='color: red'>离线</span>";
        }
        if(result.boxStatus === '1'){
            result.boxStatus= "打开";
        }else if (result.boxStatus === '0'){
            result.boxStatus= "<span style='color: red'>关闭</span>";
        }
        if(result.path!=""){
            result.path='/home/config/seeImg/'+result.path;
        }else{
            result.path='/assets/img/login-logo.png';
        }
        var divHtml='<img src="'+result.path+'" alt="" class="scg-bl-img">' +
                    '<div class="scg-bl-rbox">' +
                    '    <div class="scg-rb-tit">'+result.name+'</div>' +
                    '    <p class="rb-p">设备型号：'+result.model+'</p>' +
                    '    <p class="rb-p">设备编号：'+result.no+'</p>' +
                    '    <p class="rb-p">配电箱：'+result.distributionBox+'</p>' +
                    '    <p class="rb-p">物联网卡：'+result.internetCard+'</p>' +
                    '    <p class="rb-p">回路数：'+result.loopCount+'</p>' +
                    '    <p class="rb-p">mac地址：'+result.mac+'</p>' +
                    '    <p class="rb-p">箱门状态：'+result.boxStatus+'</p>' +
                    '    <p class="rb-p">设备状态：'+result.status+'</p>' +
                    '    <p class="rb-p">经纬度：'+result.latitude+','+result.longitude+'</p>' +
                    '</div>';
        $("#equipDetail").append(divHtml);
        var tableHtml="<tr>" +
                       "     <td>A相电压："+result.equipCurrent.voltageA +"V</td>" +
                       "     <td>B相电压："+result.equipCurrent.voltageB +"V</td>" +
                       "     <td>C相电压："+result.equipCurrent.voltageC +"V</td>" +
                       " </tr>" +
                       " <tr>" +
                       "     <td>A相电流："+result.equipCurrent.currentA +"A</td>" +
                       "     <td>B相电流："+result.equipCurrent.currentB +"A</td>" +
                       "     <td>C相电流："+result.equipCurrent.currentC +"A</td>" +
                       " </tr>" +
                       " <tr>" +
                       "     <td>A相功率："+result.equipCurrent.powerA +"W</td>" +
                       "     <td>B相功率："+result.equipCurrent.powerB +"W</td>" +
                       "     <td>C相功率："+result.equipCurrent.powerC +"W</td>" +
                       " </tr>";
        $("#threeCurrent").append(tableHtml);
    };

    infoObj.onData();

    infoObj.initColumn= function () {
        return [[
            {type: 'checkbox'},
            {field: 'id',hide: true, title: '回路id'},
            {field: 'no', align: "center", title: '回路号'},
            {field: 'name', align: "center", title: '回路名称',edit: 'text'},
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
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 450}
        ]];
    };

    table.render({
        elem: "#listTable",
        url: Feng.ctxPath + '/equip/loopPage?equipId=' + Feng.getUrlParam("id"),
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: infoObj.initColumn()
    });

// 工具条点击事件
    table.on('tool(listTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'edit') {
            infoObj.onEdit(data.id);
        }else if (layEvent === 'open') {
            infoObj.onUpdateLoopStatus(data.id,1,'打开');
        }else if (layEvent === 'close') {
            infoObj.onUpdateLoopStatus(data.id,0,'关闭');
        }
    });

    infoObj.onUpdateLoopStatus = function(id,status,title){
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/equip/updateLoopStatus", function () {
                Feng.success("操作成功!");
                table.reload("listTable", {
                     page: {curr: 1}
                });
            }, function (data) {
                Feng.error("操作失败!" + data.responseJSON.message + "!");
            });
            ajax.set("id", id);
            ajax.set("status", status);
            ajax.start();
        };
        if(confirm("是否"+title+"？")){
            operation();
        }
    };

    infoObj.batchUpdateLoopStatus = function (status,title) {
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

    infoObj.save = function(id,name){
        var ajax = new $ax(Feng.ctxPath + "/equip/editLoop", function (data) {
            Feng.success("修改成功");
        }, function (data) {
            Feng.error("操作失败!" + data.responseJSON.message + "!");
        });
        ajax.set("id", id);
        ajax.set("name", name);
        ajax.start();
    };
});
