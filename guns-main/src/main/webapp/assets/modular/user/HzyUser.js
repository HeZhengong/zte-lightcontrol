layui.use(['layer', 'table', 'admin', 'form', 'ax', 'func'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var func = layui.func;
    var table = layui.table;
    var form = layui.form;


    /**
     * 渲染表格
     */

    var tableIns = table.render({
        elem:'#user-lise-table'
        ,url: Feng.ctxPath+"/hzyUser/userinfo/list"
        ,page:true
        ,height:590
        ,cellMinWidth:100
        ,cols:[[
            {field:'id', hide:true, title:'ID', fixed:'left'}
            ,{field:'account', title: '用户名'}
            ,{field:'name',title:'昵称'}
            ,{field:'phone',title:'电话'}
            ,{field:'email',title:'邮箱'}
            ,{field:'roleName', title:'角色名'}
            ,{field:'remark', title:'备注'}
            ,{field:'right', title:'操作', align:'center', toolbar: '#barAction', minWidth: 320}
        ]]
    });


    window.HzyUserInfoObj = {

    };

    HzyUserInfoObj.initPage = function() {
        //隐藏 模态框
        HzyUserInfoObj.closeModal();
        //监听工具条
        table.on('tool(user-lise-table)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

            if(layEvent === 'edit'){ //编辑
                HzyUserInfoObj.openModalOfEditHzyUser(data.userId);
            } else if(layEvent === 'del'){ //删除
                HzyUserInfoObj.deleteHzyUser(data.userId);
            } else if(layEvent === 'resetPwd'){ //重置密码
                HzyUserInfoObj.resetPassword(data.userId);
            }
        });


        //初始化 角色 下拉框
        var searchRoleId = $("#search_roleId");
        searchRoleId.empty();
        var tempStr = '<option value="" selected="selected">请选择角色</option>';
        searchRoleId.append(tempStr);
        var ajax = new $ax(Feng.ctxPath + '/hzyUser/userinfo/listRole', function (data) {
                var tempData = data.data;
                for (var i2 = 0; i2 < tempData.length; i2++) {
                    var tempStr2 = '<option value="' + tempData[i2].roleId + '">' + tempData[i2].name + '</option>';
                    searchRoleId.append(tempStr2);
                }
            },
            function (data) {
                /*Feng.error("操作失败!" + data.responseJSON.message + "!");*/

            });
        ajax.start();
    }

    /**
     * 新增 用户 打开模态框
     */
    HzyUserInfoObj.openModalOfAddHzyUser=function(){
        $('.modal-tit').text("新建");
        //$(".modal").show();
        $('input[name="password"]').parent().parent().show();
        HzyUserInfoObj.clearInput();
        var ajax=new $ax(Feng.ctxPath+"/hzyUser/userinfo/listRole", function(data){
            var tempData = data.data;
            var positionObj = $("select[name='roleName']");
            for (var i2 = 0; i2 < tempData.length; i2++) {
                if (i2 == 0) {
                    var tempStr1 = '<option value="' + tempData[i2].roleId + '" selected="selected">' + tempData[i2].name + '</option>';
                    positionObj.append(tempStr1);
                } else {
                    var tempStr2 = '<option value="' + tempData[i2].roleId + '">' + tempData[i2].name + '</option>';
                    positionObj.append(tempStr2);
                }
            }
        },
        function(data) {
            /*Feng.error("操作失败!" + data.responseJSON.message + "!");*/

        });
        ajax.start();
        $(".modal").show();
        //HzyUserInfoObj.closeModal();
    }



    HzyUserInfoObj.openModalOfEditHzyUser=function(userId){
        $('.modal-tit').text("编辑");
        $('input[name="password"]').parent().parent().hide();
        var ajax= new $ax(Feng.ctxPath+"/hzyUser/userinfo/queryOneUserInfo", function(data){
            HzyUserInfoObj.fullTableData(data.data);
        },
            function(data){
            Feng.error("操作失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userId",userId);
        ajax.start();
        $('.modal').show();
    };



    /**
     * @Author wujianghao
     * @Description 保存 （新增、编辑） 用户信息
     * @Date 9:13 上午 2020/3/14
     * @Param
     * @return
     **/
    HzyUserInfoObj.saveAddOrEditUser = function(){

        /*var userId = $("input[name='userId']").val();*/
        //userId == null 或者 空字符串 代表是新增用户， 否则为编辑用户，在控制器里判断
        var ajax = new $ax(Feng.ctxPath + "/hzyUser/userinfo/addOrEditUser", function (data) {
            Feng.success(data.message);
        }, function (data) {
            Feng.error("操作失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userId", $('input[name="userId"]').val());
        ajax.set("account", $("input[name='account']").val());
        ajax.set("password", $("input[name='password']").val());
        ajax.set("name", $("input[name='name']").val());
        ajax.set("phone", $("input[name='phone']").val());
        ajax.set("email", $("input[name='email']").val());
        ajax.set("roleId", $("select[name='roleId']").val());
        ajax.set("remark", $("input[name='remark']").val());
        ajax.start();
        $(".modal").hide();
        /*userInfoObj.queryUserList();*/
        HzyUserInfoObj.reloadTable();
    };

    /**
     * @Author wujianghao
     * @Description 删除用户信息
     * @Date 9:14 上午 2020/3/14
     * @Param
     * @return
     **/
    HzyUserInfoObj.deleteHzyUser = function(userId){
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/hzyUser/userinfo/delete", function (data) {
                Feng.success("删除成功!");

                /*userInfoObj.queryUserList();*/
                HzyUserInfoObj.reloadTable();
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
                /*userInfoObj.queryUserList();*/
                HzyUserInfoObj.reloadTable();
            });
            ajax.set("userId", userId);
            ajax.start();
        };
        /*if(confirm("是否删除？")){
            operation();
        }else{

        }*/

        layer.confirm('是否删除？', {icon: 3, title:'提示'}, function(index){
            //do something
            operation();

            layer.close(index);
        });
    };


    /**
     * @Author wujianghao
     * @Description 一键导出
     * @Date 9:14 上午 2020/3/14
     * @Param
     * @return
     **/
    HzyUserInfoObj.exportHzyUserInfo = function(){
        var operation002 = function () {
            /*var ajax = new $ax(Feng.ctxPath + "/user/userinfo/exportExcel", function (data) {
                Feng.success("导出成功!");
                /!*userInfoObj.queryUserList();*!/
                userInfoObj.reloadTable();
            }, function (data) {
                Feng.error("导出成功失败!" + data.responseJSON.message + "!");
            });
            ajax.set("account", $('#search_account').val());
            ajax.set("phone", $('#search_phone').val());
            ajax.set("roleId", $('#search_roleId').val());
            ajax.start();*/


            window.location.href =
                Feng.ctxPath + "/hzyUser/userinfo/exportExcel" +
                "?account=" + $('#search_account').val() + "&phone=" + $('#search_phone').val() + "&roleId=" + $('#search_roleId').val();
            /*userInfoObj.reloadTable();*/
        };
        if(confirm("是否导出当前用户信息？")){
            operation002();
        }else{

        }
    };

    /**
     * @Author wujianghao
     * @Description 重置密码
     * @Date 9:15 上午 2020/3/14
     * @Param
     * @return
     **/
    HzyUserInfoObj.resetPassword = function(userId){
        var operation001 = function () {
            var ajax = new $ax(Feng.ctxPath + "/hzyUser/userinfo/initPassword", function (data) {
                Feng.success("密码重置成功!");
                /*userInfoObj.queryUserList();*/
                HzyUserInfoObj.reloadTable();
            }, function (data) {
                Feng.error("密码重置失败!" + data.responseJSON.message + "!");
            });
            ajax.set("userId", userId);
            ajax.start();
        };
        /*if(confirm("是否重置密码？")){
            operation001();
        }else{

        }*/

        layer.confirm('是否重置密码？', {icon: 3, title:'提示'}, function(index){
            //do something
            operation001();

            layer.close(index);
        });
    };


    /**
     * 渲染数据 table
     * @param data
     */
    HzyUserInfoObj.fullTableData = function (data) {
        HzyUserInfoObj.clearInput();
        $("input[name='userId']").val((data.userId));
        $("input[name='account']").val(data.account);
        $("input[name='name']").val(data.name);
        $("input[name='phone']").val(data.phone);
        $("input[name='email']").val(data.email);
        /*$("input[name='password']").val(data.email);*/
        $("select[name='roleName']").val(data.roleName);
        $("input[name='remark']").val(data.remark);
        var positionObj = $("select[name='roleName']");
        var tempPosition = data.listRole;
        for (var i1 = 0; i1 < tempPosition.length; i1++) {
            if ((tempPosition[i1].roleId) == data.roleId) {
                var tempStr1 = '<option value="' + (tempPosition[i1].roleId) + '" selected="selected">' + tempPosition[i1].name + '</option>';
                positionObj.append(tempStr1);
            } else {
                var tempStr2 = '<option value="' + (tempPosition[i1].roleId) + '">' + tempPosition[i1].name + '</option>';
                positionObj.append(tempStr2);
            }
        }

    };


    /**
     * @Description 关闭模块框模态框
     **/
    HzyUserInfoObj.closeModal = function(){
        $(".modal").hide();
        var html =
            '<div class="mask" style="position:fixed;left:0;right: 0;top:0;bottom: 0;z-index: 9998"></div>' +
            '<div class="modal-cnt modal-form" style="height: 43rem;margin-top: 104px;">' +
            '<div class="modal-tit">编辑设备</div>' +
            '<div class="modal-main">' +
            '<table class="zn-t-table1" style="margin: 2rem auto">' +
            '<tr>' +
            '<td>用户名</td>' +
            '<td colspan="3"><input name="userId" type="hidden"><input name="account" type="text" class="fm-input"></td>' +
            '</tr>' +
            '<tr>' +
            '<td>密码</td>' +
            '<td colspan="3"><input name="password" type="text" class="fm-input"></td>' +
            '</tr>' +
            '<tr>' +
            '<td>昵称</td>' +
            '<td colspan="3"><input name="name" type="text" class="fm-input"></td>' +
            '</tr>' +
            '<tr>' +
            '<td>手机号</td>' +
            '<td colspan="3"><input name="phone" type="text" class="fm-input"></td>' +
            '</tr>' +
            '<tr>' +
            '<td>邮箱</td>' +
            '<td colspan="3"><input name="email" type="text" class="fm-input"></td>' +
            '</tr>' +
            '<tr>' +
            '<td>角色</td>' +
            '<td colspan="3"><select name="roleName" class="fm-input"></select></td>' +
            '</tr>' +
            '<tr>' +
            '<td>备注</td>' +
            '<td colspan="3"><input name="remark" type="text" class="fm-input"></td>' +
            '</tr>' +
            '</table>' +
            '<div class="fm-btn-box flex flex-c-c flex-r-c">' +
            '<button class="btn-no" onclick="HzyUserInfoObj.closeModal()">取消</button>' +
            '<button class="btn-save" lay-submit="" onclick="HzyUserInfoObj.saveAddOrEditUser()">保存</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $(".modal").append(html);
        HzyUserInfoObj.clearInput();
    };

    /**
     * 清空 table 中的数据
     */
    HzyUserInfoObj.clearInput = function () {
        $("input[name='userId']").val("");
        $("input[name='account']").val("");
        $("input[name='password']").val("");
        $("input[name='name']").val("");
        $("input[name='phone']").val("");
        $("input[name='email']").val("");
        $("select[name='roleName']").empty();
        $("input[name='mark']").val("");
    };

    /**
     * 清除搜索框中的文本内容
     */
    HzyUserInfoObj.clearSearchInput = function() {
        $('#search_account').val("");
        $('#search_phone').val("");
        $("#search_roleId").each(function(){
            $(this).find("option").eq(0).prop("selected",true)
        });

    };

    /**
     * 重载表格
     */
    HzyUserInfoObj.reloadTable = function() {
        tableIns.reload({
            where: { //设定异步数据接口的额外参数，任意设
                account: $('#search_account').val()
                ,phone: $('#search_phone').val()
                ,roleId: $('#search_roleId').val()
            }
            ,page: {
                curr: 1 //重新从第 1 页开始
            }
        });
    };


    HzyUserInfoObj.initPage();


});
