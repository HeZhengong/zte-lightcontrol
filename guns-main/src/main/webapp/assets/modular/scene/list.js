layui.use(['layer','ax','upload'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var upload = layui.upload;

    window.infoObj = {

    };

    var num=1;
    var maxNum=1;

    upload.render({
        elem: '#equipImg',
        url: Feng.ctxPath + '/system/upload',
        done: function(res){
            $("#equipImg").attr("src", Feng.ctxPath + '/home/config/seeImg/' + res.data.fileId);
            $('input[name="path"]').val(res.data.fileId);
        }
    });

    infoObj.onEdit = function(id) {
        infoObj.clearInput();
        $(".btn-del").css("display","block");
        $('.modal-tit').text("编辑场景");
        $("#editModal").show();
        var ajax = new $ax(Feng.ctxPath + "/scene/get", function (result) {
            var data=result.data;
            $("input[name='id']").val((data.id));
            $("input[name='name']").val(data.name);
            $("input[name='path']").val(data.path);
            if(data.path!=""){
                data.path='/home/config/seeImg/'+data.path;
            }else{
                data.path='/assets/img/login-logo.png';
            }
            $("#equipImg").attr("src", Feng.ctxPath + data.path);
        }, function (data) {
            Feng.error("操作失败!" + data.responseJSON.message + "!");
        });
        ajax.set("id", id);
        ajax.start();
    };

    infoObj.save = function(){
        var ajax = new $ax(Feng.ctxPath + "/scene/save", function (data) {
            Feng.success(data.message);
        }, function (data) {
            Feng.error("操作失败!" + data.responseJSON.message + "!");
        });
        ajax.set("id", $('input[name="id"]').val());
        ajax.set("name", $("input[name='name']").val());
        ajax.set("path", $("input[name='path']").val());
        ajax.start();
        $("#editModal").hide();
        infoObj.selectPicPage(1);
    };

    infoObj.selectPicPage = function(page){
        if(page==1){
            $("#picPage").empty();
        }
        var ajax = new $ax(Feng.ctxPath + "/scene/selectPage?page="+page, function (data) {
            for (var i = 0; i < data.data.length; i++) {
                var result = data.data[i];
                if(result.path!=""){
                    result.path='/home/config/seeImg/'+result.path;
                }else{
                    result.path='/assets/img/login-logo.png';
                }
                var divHtml='<div class="cj-li-box">' +
                        '<div class="cj-img-box" onclick="infoObj.onDetail(\''+result.id+'\')"><img src="'+result.path+'" alt="" class=""></div>' +
                        '<div class="cj-info flex" >' +
                        '<div class="cj-span flex-1">'+result.name+'</div>' +
                        '<div class="cj-span">当前执行</div>'+
                        '</div>'+
                        '<div class="cj-btn-box flex flex-c-c flex-r-b">' +
                        '<button class="btn-y-sm" onclick="infoObj.onEdit(\''+result.id+'\')">编辑</button>' +
                        '<button class="btn-g-sm">执行</button>' +
                        '</div>' +
                        '</div>';
                $("#picPage").append(divHtml);
                num=page+1;
            }
            maxNum= Math.ceil(data.count/10);
        }, function (data) {
        });
        ajax.set("name", $('#search_name').val());
        ajax.start();
    };
    infoObj.selectPicPage(1);

    infoObj.clearInput = function () {
        var inputObjs=jQuery("#editModal").find("input");
        for(var i=0;i<inputObjs.length;i++){
            var inputObj = inputObjs[i];
            inputObj.value="";
        }
        $("#equipImg").attr("src", "/assets/img/add.png");
    };

    $('#btnSearch').click(function () {
        infoObj.selectPicPage(1);
    });

    $('#btnAdd').click(function () {
        infoObj.clearInput();
        $('.modal-tit').text("添加场景");
        $(".btn-del").css("display","none");
        $("#editModal").show();
    });

    $('.btn-no').click(function () {
        $(".modal").hide();
        infoObj.clearInput();
    });

    $('.btn-save').click(function () {
        if($("input[name='name']").val()===''){
            layer.alert("场景名称不能为空", {title: '提示：'});
        }else{
            infoObj.save();
        }
    });

    $(".btn-del").click(function () {
        var id=$("input[name='id']").val();
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/scene/delete", function () {
                Feng.success("删除成功!");
                $("#editModal").hide();
                infoObj.selectPicPage(1);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("id", id);
            ajax.start();
        };
        if(confirm("是否删除？")){
            operation();
        }
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
