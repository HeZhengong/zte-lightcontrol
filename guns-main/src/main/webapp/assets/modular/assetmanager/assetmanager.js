layui.use(['layer', 'table', 'admin', 'form', 'ax', 'func'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var layer = layui.layer;


    window.assetObj = {

    };

    assetObj.hang = "";
    assetObj.lie = "";
    assetObj.obj = null;


    /**
     * 父级菜单 添加按钮 ---> 打开模态框
     */
    assetObj.addOfParentBtn = function () {
        //输入的 分组名

        $('input[name="no"]').val("");
        $('input[name="label"]').val("");
        $('input[name="weight"]').val("");


        $('input[name="type"]').val("0");
        $('input[name="parent"]').val("0");

        $('#btn-no').val("");
        $('#btn-del').val("");
        $('#btn-save').val("");

        $('.modal-tit').text("新建分组");

        //删除按钮
        $("#btn-del").css("display","none");
        $("#modal").show();
    };

    /**
     * 子级菜单 添加按钮 ---> 打开模态框
     */
    assetObj.addOfChildBtn = function (parent) {
        //清空 模态框内 文本框
        $('input[name="no"]').val("");
        $('input[name="label"]').val("");
        $('input[name="weight"]').val("");

        //指定 当前 子级 类型和 parent 父级 id
        $('input[name="type"]').val("1");
        $('input[name="parent"]').val(parent);


        $('#btn-no').val("");
        $('#btn-del').val("");
        $('#btn-save').val("");

        //删除按钮
        $("#btn-del").css("display","none");
        $("#modal").show();
    };

    /**
     * 点击 父级 编辑图标 ---> 打开模态框 (相当于编辑按钮)
     */
    assetObj.editOfParentBtn = function (id) {
        var ajax = new $ax(Feng.ctxPath + '/asset/selectGroupById/group', function (getData) {
            var data = getData.data;

            $('input[name="no"]').val(data.no);
            $('input[name="label"]').val(data.label);
            $('input[name="weight"]').val(data.weight);


            $('input[name="type"]').val(data.type);
            $('input[name="parent"]').val(data.parent);

            $('#btn-no').val(data.id);
            $('#btn-del').val(data.id);
            $('#btn-save').val(data.id);

            $('.modal-tit').text("编辑分组");

            //删除按钮
            $("#btn-del").css("display","block");
            $("#modal").show();
        }, function () {

        });
        ajax.set("id", id);
        ajax.start();
    };


    /**
     * 点击 子级 编辑图标 ---> 打开模态框 (相当于编辑按钮)
     */
    assetObj.editOfChildBtn = function (id) {
        var ajax = new $ax(Feng.ctxPath + '/asset/selectGroupById/group', function (getData) {
            var data = getData.data;

            $('input[name="no"]').val(data.no);
            $('input[name="label"]').val(data.label);
            $('input[name="weight"]').val(data.weight);


            $('input[name="type"]').val(data.type);
            $('input[name="parent"]').val(data.parent);

            $('#btn-no').val(data.id);
            $('#btn-del').val(data.id);
            $('#btn-save').val(data.id);

            $('.modal-tit').text("编辑子级分组");

            //删除按钮
            $("#btn-del").css("display","block");
            $("#modal").show();
        }, function () {

        });
        ajax.set("id", id);
        ajax.start();
    };

    /**
     * 点击 删除 按钮 ，删除该分组信息
     */
    assetObj.delBtn = function () {

        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + '/asset/delGroupById/group', function (getData) {
                var flag = getData.data;

                // true  删除成功
                if (flag) {
                    Feng.success("删除成功！");
                    var divParent = $('.my-parent');
                    if (divParent.length != 0)
                        for (var i = 0; i < divParent.length; i++)
                            $(divParent[i]).remove();

                    // 对 分组 重新排序
                    assetObj.initPageOfGroup();
                }
                // false 该组 有对应的数据，不能删
                else {
                    Feng.error("删除失败！项目类型下有资产。");
                }


                $("#modal").hide();

            }, function (getData) {

            });
            ajax.set("id", $('#btn-del').val());
            ajax.start();
        };

        layer.confirm('是否删除？注：该项目下有资产将导致删除失败！', {icon: 3, title:'提示'}, function(index){
            //do something
            operation();

            layer.close(index);
        });
    };

    /**
     * 点击 编辑保存 按钮 ，更新分组信息
     */
    assetObj.editBtn = function () {
        var ajax = new $ax(Feng.ctxPath + '/asset/updateGroupById/group', function (getData) {
            var data = getData.data;

            var divParent = $('.my-parent');
            if (divParent.length != 0)
                for (var i = 0; i < divParent.length; i++)
                    $(divParent[i]).remove();

            // 对 分组 重新排序
            assetObj.initPageOfGroup();

            $("#modal").hide();

        }, function (getData) {

        });
        ajax.set("id", $('#btn-save').val());
        ajax.set("no", $('input[name="no"]').val());
        ajax.set("label", $('input[name="label"]').val());
        ajax.set("type", $('input[name="type"]').val());
        ajax.set("parent", $('input[name="parent"]').val());
        ajax.set("weight", $('input[name="weight"]').val());
        ajax.start();
    };


    /**
     * 点击 新建保存 按钮 ，保存新建分组信息
     */
    assetObj.saveBtn = function () {
        var ajax = new $ax(Feng.ctxPath + '/asset/add/group', function (getData) {
            var data = getData.data;

            switch (data.type) {
                case "0": {
                    $(".fli-add").before(
                        '<div class="fz-li flex flex-c-c flex-r-c my-parent" data-value="' + data.id + '">' +
                        '<span>' + data.label + '</span>' +
                        '<div class="pz-edit" style="width: 1rem; height:1rem;" onclick="assetObj.editOfParentBtn(\'' + data.id + '\')"></div>' +
                        '<ul class="fz-sc-ul">' +
                        '<li class="fz-sc-li fcli-add my-child" data-parent="' + data.id + '" onclick="assetObj.addOfChildBtn(\''+ data.id +'\')">' +
                        '<span>添加</span>' +
                        '</li>' +
                        '</ul>' +
                        '</div>'
                    );
                } break;
                case "1": {
                    var child = $('.my-child');
                    for (var i = 0; i < child.length; i++)
                        if (child[i].dataset.parent == $('input[name="parent"]').val())
                            $(child[i]).before(
                                '<li class="fz-sc-li">' +
                                '<span data-id="' + data.id + '">' + data.label + '</span>' +
                                '<div class="pz-edit" style="width: 1rem; height:1rem;" onclick="assetObj.editOfChildBtn(\'' + data.id + '\')"></div>' +
                                '</li>'
                            );

                } break;
            }
            $("#modal").hide();

        }, function (getData) {

        });
        ajax.set("no", $('input[name="no"]').val());
        ajax.set("label", $('input[name="label"]').val());
        ajax.set("type", $('input[name="type"]').val());
        ajax.set("parent", $('input[name="parent"]').val());
        ajax.set("weight", $('input[name="weight"]').val());
        ajax.start();
    };

    /**
     * 对于 新建保存 和 编辑保存 两个动作放在一个方法里面 通过 btn.val() 是不是为空进行判断
     */
    assetObj.saveOrEditBtn = function () {
        var value = $("#btn-save").val();
        if (value != null && value != "")
            assetObj.editBtn();
        else
            assetObj.saveBtn();
    };


    /**
     * 点击取消 新建分组 按钮 ，隐藏模态框
     */
    assetObj.noBtn = function () {

        $('input[name="no"]').val("");
        $('input[name="label"]').val("");
        $('input[name="weight"]').val("");

        $('#btn-no').val("");
        $('#btn-del').val("");
        $('#btn-save').val("");

        $("#modal").hide();
    };







    /**
     * 打开 （添加 列） 模态框
     */
    $(".col-btn").on("click",function(){

        $('input[name="col_label"]').val("");
        $('input[name="table_type"]').val("1");

        $('#cell-name').text("列名名称");
        $('#modal-col').show();
        /*$(".pz-table tr:first-child").append("<th>未命名</th>");
        $(".pz-table tr").not("tr:first-child").append("<td>未命名</td>");*/
    });

    /**
     * 添加 列 模态框 ---> 保存按钮
     */
    $('#col-btn-save').on('click', function () {

        var length = $(".pz-table tr th").length + 1;
        var type = $('input[name="table_type"]').val();
        var ajax = new $ax(Feng.ctxPath + '/asset/add/table', function (getData) {
            var data = getData.data;

            switch (type) {
                case "1": {
                    $(".pz-table tr:first-child").append("<th>" + data.label + "</th>");
                    $(".pz-table tr").not("tr:first-child").append("<td>未命名</td>");
                } break;
                case "2": {
                    $(assetObj.obj).text(data.label);
                } break;
            }


            $("#modal-col").hide();

            //初始化  为每个 单元格  增加双击事件
            assetObj.addOfCell();
        }, function (getData) {

        });
        ajax.set("label", $('input[name="col_label"]').val());
        ajax.set("type", type);
        switch (type) {
            case "1": {
                ajax.set("left", length + "");
                ajax.set("top", '1');
            } break;
            case "2": {
                ajax.set("left", assetObj.lie);
                ajax.set("top", assetObj.hang);
            } break;
        }

        ajax.set("parent", '1250260761524088834');

        ajax.start();
    });

    /**
     * 添加 列 模态框 ---> 取消按钮
     */
    $('#col-btn-no').on('click', function () {

        $('input[name="col_label"]').val("");
        $("#modal-col").hide();
    });


    /**
     * 添加 行
     */
    $(".row-btn").on("click", function () {
        var trObj = document.createElement("tr");
        var th_number = $(".pz-table tr th").length;


        for (var i = 0; i < th_number; i++) {
            var tempTdObj = document.createElement("td");
            if (i === 0) {
                tempTdObj.innerHTML = ($(".pz-table tr").length) + "";
            } else {
                tempTdObj.innerHTML = "未命名";
            }


            trObj.appendChild(tempTdObj);
        }
        $(".pz-table").append(trObj);

        //初始化  为每个 单元格  增加双击事件
        assetObj.addOfCell();
    });


    /**
     * 双击弹出模态框 ---> 打开模态框
     */
    assetObj.addOfCell = function () {
        $("#my-table").find("td").dblclick(function () {
            $('input[name="table_type"]').val("2");

            $('input[name="col_label"]').val("");
            $('#cell-name').text("标签名称");
            var hang = $(this).parent("tr").prevAll().length;
            var lie = $(this).prevAll().length;
            hang = Number(hang)+1;//字符串变为数字
            lie = Number(lie)+1;

            assetObj.hang = hang;
            assetObj.lie = lie;
            assetObj.obj = this;
            $('#modal-col').show();
        });
    }

    assetObj.initPageOfTable = function (id) {
        //初始化 默认页 table
        var ajax = new $ax(Feng.ctxPath + '/asset/selectList/table', function (getDataTable) {
            var tableData = getDataTable.data;
            var myTable = $('#my-table');
            var maxLength = 0;
            $.each(tableData, function(index, value) {
                var trs = $('<tr>');
                if (index == 1) {
                    myTable.empty();
                    for (var i = 1; i <= (maxLength = value.length); i++) {
                        if (i == value[i - 1].left) {
                            trs.append(
                                '<th data-tableId=\'' + value[i - 1].id + '\'>' + value[i - 1].label + '</th>'
                            );
                        }
                    }
                } else {
                    for (var i = 1; i <= maxLength; i++) {
                        if (typeof (value[i - 1]) != 'undefined' && value[i - 1] != null) {
                            if (i == value[i - 1].left) {
                                trs.append(
                                    '<td data-tableId=\'' + value[i - 1].id + '\'>' + value[i - 1].label + '</td>'
                                );
                            }
                        } else {
                            trs.append(
                                '<td>未命名</td>'
                            );
                        }
                    }
                }
                myTable.append(trs);
            });

            assetObj.addOfCell();

        }, function (getErrorData) {

        });
        ajax.set('id', id);
        ajax.start();
    };

    /**
     * 初始化 分组信息
     */
    assetObj.initPageOfGroup = function () {
        //初始化 所有组
        var ajax = new $ax(Feng.ctxPath + '/asset/selectList/group', function (getData) {
            var data = getData.data;

            $.each(data, function(index, value) {

                if (index == 0)
                    for (var i = 0; i < value.length; i++)
                        $(".fli-add").before(
                            '<div class="fz-li flex flex-c-c flex-r-c my-parent" data-value=\'' + value[i].id + '\'>' +
                            '<span>' + value[i].label + '</span>' +
                            '<div class="pz-edit" style="width: 1rem; height:1rem;" onclick="assetObj.editOfParentBtn(\'' + value[i].id + '\')"></div>' +
                            '<ul class="fz-sc-ul">' +
                            '<li class="fz-sc-li fcli-add my-child" data-parent="' + value[i].id + '" onclick="assetObj.addOfChildBtn(\''+ value[i].id +'\')">' +
                            '<span>添加</span>' +
                            '</li>' +
                            '</ul>' +
                            '</div>'
                        );
                else
                    for (var i = 0; i < value.length; i++) {
                        var child = $('.my-child');
                        for (var j = 0; j < child.length; j++)
                            if (child[j].dataset.parent == value[i].parent)
                                $(child[j]).before(
                                    '<li class="fz-sc-li">' +
                                    '<span data-id="' + value[i].id + '">' + value[i].label + '</span>' +
                                    '<div class="pz-edit" style="width: 1rem; height:1rem;" onclick="assetObj.editOfChildBtn(\'' + value[i].id + '\')"></div>' +
                                    '</li>'
                                );
                    }
            });

            var obj = $(".fz-li-box .my-parent");
            var id = null;
            if (obj.length != 0) {
                $.ajax({
                    type: "post",
                    url: "/asset/defaultTableId/group",
                    async: true,
                    contentType:"application/json;charset=utf-8",
                    dataType: "json",   //返回值的数据类型
                    success: function(getIdObj){
                        id = getIdObj.data;
                        if (id != null && id != '')
                            assetObj.initPageOfTable(id);//初始化 默认页 table
                    },
                    error: function () {

                    }
                });
            }
        }, function (getErrorData) {

        });
        ajax.start();
    };


    /**
     * 初始化 页面
     */
    assetObj.initPage = function () {

        //初始化 组 信息
        assetObj.initPageOfGroup();

        $("#tr-first").dblclick(function () {

            $('input[name="table_type"]').val("2");

            $('input[name="col_label"]').val("");
            $('#cell-name').text("标签内容");
            var hang = $(this).parent("tr").prevAll().length;
            var lie = $(this).prevAll().length;
            hang = Number(hang)+1;//字符串变为数字
            lie = Number(lie)+1;

            assetObj.hang = hang;
            assetObj.lie = lie;
            assetObj.obj = this;
            $('#modal-col').show();
        });
    };

    assetObj.initPage();
});

