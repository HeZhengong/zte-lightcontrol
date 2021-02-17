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
        elem: '#user-lise-table'
        ,url: Feng.ctxPath + "/user/userinfo/list" //数据接口
        ,page: true
        ,height: 590
        ,cellMinWidth: 100
        ,cols: [[ //表头
            /*{type: 'checkbox'}
            ,*/{field: 'id', hide: true, title: 'ID', fixed: 'left'}
            ,{field: 'account', title: '用户名'}
            ,{field: 'name', title: '昵称'}
            ,{field: 'phone', title: '手机号'}
            ,{field: 'email', title: '邮箱'}
            ,{field: 'roleName', title: '角色'}
            ,{field: 'remark', title: '备注'}
            ,{fixed: 'right', title: '操作', align:'center', toolbar: '#barAction', minWidth: 320}
            /* ,{field: 'score', title: '评分', width: 80}
             ,{field: 'classify', title: '职业', width: 80}
             ,{field: 'wealth', title: '财富', width: 135}*/
        ]]
    });

    /**
     * @Author wujianghao
     * @Description 用户列表
     * @Date 10:43 上午 2020/3/13
     * @Param
     * @return
     **/
    window.userInfoObj = {

    };

    /**
     * 初始化页面的一些操作
     */
    userInfoObj.initPage = function() {
        //隐藏 模态框
        userInfoObj.closeModal();
        //监听工具条
        table.on('tool(user-lise-table)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

            if(layEvent === 'edit'){ //编辑
                userInfoObj.openModalOfEditUser(data.userId);
            } else if(layEvent === 'del'){ //删除
                userInfoObj.deleteUser(data.userId);
            } else if(layEvent === 'resetPwd'){ //重置密码
                userInfoObj.resetPassword(data.userId);
            }
        });


        //初始化 角色 下拉框
        var searchRoleId = $("#search_roleId");
        searchRoleId.empty();
        var tempStr = '<option value="" selected="selected">请选择角色</option>';
        searchRoleId.append(tempStr);
        var ajax = new $ax(Feng.ctxPath + '/user/userinfo/listRole', function (data) {
                /*Feng.success("删除成功!");*/
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
    };

    /**
     * @Author zzb
     * @Description 打开 新建用户 模态框
     **/
    userInfoObj.openModalOfAddUser = function(){

        $('.modal-tit').text("新建");
        $('input[name="password"]').parent().parent().show();
        userInfoObj.clearInput();
        var ajax = new $ax(Feng.ctxPath + '/user/userinfo/listRole', function (data) {
                /*Feng.success("删除成功!");*/
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
            function (data) {
                /*Feng.error("操作失败!" + data.responseJSON.message + "!");*/

            });
        ajax.start();
        $(".modal").show();
    };

    /**
     * @author zzb
     * @Description 打开 编辑用户信息 模态框
     **/
    userInfoObj.openModalOfEditUser = function(userId) {
        /*queryOneUserInfo*/
        //table 表头
        $('.modal-tit').text("编辑");
        $('input[name="password"]').parent().parent().hide();
        var ajax = new $ax(Feng.ctxPath + "/user/userinfo/queryOneUserInfo", function (data) {
            /*Feng.success("删除成功!");*/
            //填充 table 数据
            userInfoObj.fullTableData(data.data);
        }, function (data) {
            Feng.error("操作失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userId", userId);
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
    userInfoObj.saveAddOrEditUser = function(){

        /*var userId = $("input[name='userId']").val();*/
        //userId == null 或者 空字符串 代表是新增用户， 否则为编辑用户，在控制器里判断
        var ajax = new $ax(Feng.ctxPath + "/user/userinfo/addOrEditUser", function (data) {
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
        ajax.set("roleId", $("select[name='roleName']").val());
        ajax.set("remark", $("input[name='remark']").val());
        ajax.start();
        $(".modal").hide();
        /*userInfoObj.queryUserList();*/
        userInfoObj.reloadTable();
    };

    /**
     * @Author wujianghao
     * @Description 删除用户信息
     * @Date 9:14 上午 2020/3/14
     * @Param
     * @return
     **/
    userInfoObj.deleteUser = function(userId){
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/user/userinfo/delete", function (data) {
                Feng.success("删除成功!");

                /*userInfoObj.queryUserList();*/
                userInfoObj.reloadTable();
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
                /*userInfoObj.queryUserList();*/
                userInfoObj.reloadTable();
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
    userInfoObj.exportUserInfo = function(){
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
                Feng.ctxPath + "/user/userinfo/exportExcel" +
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
    userInfoObj.resetPassword = function(userId){
        var operation001 = function () {
            var ajax = new $ax(Feng.ctxPath + "/user/userinfo/initPassword", function (data) {
                Feng.success("密码重置成功!");
                /*userInfoObj.queryUserList();*/
                userInfoObj.reloadTable();
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
    userInfoObj.fullTableData = function (data) {
        userInfoObj.clearInput();
        $("input[name='userId']").val((data.userId));
        $("input[name='account']").val(data.account);
        $("input[name='name']").val(data.name);
        $("input[name='phone']").val(data.phone);
        $("input[name='email']").val(data.email);
        /*$("input[name='password']").val(data.email);*/
        /*$("select[name='roleName']").val(data.roleName);*/
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
    userInfoObj.closeModal = function(){
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
            '<button class="btn-no" onclick="userInfoObj.closeModal()">取消</button>' +
            '<button class="btn-save" lay-submit="" onclick="userInfoObj.saveAddOrEditUser()">保存</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $(".modal").append(html);
        userInfoObj.clearInput();
    };

    /**
     * 清空 table 中的数据
     */
    userInfoObj.clearInput = function () {
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
    userInfoObj.clearSearchInput = function() {
        $('#search_account').val("");
        $('#search_phone').val("");
        $("#search_roleId").each(function(){
            $(this).find("option").eq(0).prop("selected",true)
        });

    };

    /**
     * 重载表格
     */
    userInfoObj.reloadTable = function() {
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

    userInfoObj.initPage();


    /**
     * @Author wujianghao
     * @Description 用户列表查询
     * @Date 9:01 上午 2020/3/14
     * @Param
     * @return
     **/
    /*userInfoObj.queryUserList = function(){
        //发送请求
        var ajax = new $ax(Feng.ctxPath + "/user/userinfo/list", function (data) {
            var tempTableHead =
                '<colgroup>' +
                '<col width="10%">' +
                '<col width="10%">' +
                '<col width="10%">' +
                '<col width="10%">' +
                '<col width="10%">' +
                '<col width="10%">' +
                '<col width="10%">' +
                '<col width="30%">' +
                '</colgroup>' +
                '<tr>' +
                '<th>序号</th>' +
                '<th>用户名</th>' +
                '<th>昵称</th>' +
                '<th>手机号</th>' +
                '<th>邮箱</th>' +
                '<th>角色</th>' +
                '<th>备注</th>' +
                '<th>操作</th>' +
                '</tr>';
            $("#user-lise-table").empty();
            $("#user-lise-table").append(tempTableHead);
            for (var i = 0; i < data.data.length; i++) {
                //获取数据解析
                var userInfo = data.data[i];
                //序号
                var No = i+1;
                //用户名
                var name = userInfo.account;
                //昵称
                var positionName = userInfo.name;
                //手机号
                var phone = userInfo.phone;
                //邮箱
                var email = userInfo.email;
                //角色
                var roleName = userInfo.roleName;
                //备注

                //操作类
                var edit = '<button class="btn-g" onclick="userInfoObj.openModalOfEditUser(\''+userInfo.userId+'\')">编辑</button>';
                var reset = '<button class="btn-g" onclick="userInfoObj.resetPassword(\''+userInfo.userId+'\')">重置密码</button>';
                var del = '<button class="btn-r" onclick="userInfoObj.deleteUser(\''+userInfo.userId+'\')" >删除</button>';

                //创建数据行
                var tr = "<tr>"
                    +"<td>"+No+"</td>"
                    +"<td>"+name+"</td>"
                    +"<td>"+positionName+"</td>"
                    +"<td>"+phone+"</td>"
                    +"<td>"+email+"</td>"
                    +"<td>"+roleName+"</td>"
                    +"<td></td>"
                    +"<td>"+edit+reset+del+"</td>"
                    +"</tr>";
                $("#user-lise-table").append(tr);
            }

            //清空模态框
            $('.modal').empty();
            var saveBtn = '<button class="btn-save" onclick="userInfoObj.saveAddOrEditUser()">保存</button>',
                delBtn = '<button class="btn-no" onclick="userInfoObj.closeModal()">返回</button>';

            var modal =
                '<div class="modal">'+
                '<div class="mask" style="position:fixed;left:0;right: 0;top:0;bottom: 0;z-index: 9998"></div>'+
                '<div class="modal-cnt modal-form">'+
                '<div class="modal-tit">编辑设备' +
                '</div>'+
                '<div class="modal-main">'+
                '<table class="zn-t-table1" style="margin: 2rem auto">' +
                '<tr>' +
                '<td>用户名</td>' +
                '<td colspan="3"><input name="userId" type="hidden"><input name="account" type="text" class="fm-input"></td>'+
                '</tr>' +
                '<tr>' +
                '<td>密码</td>' +
                '<td colspan="3"><input name="password" type="text" class="fm-input"></td>'+
                '</tr>' +
                '<tr>' +
                '<td>昵称</td>' +
                '<td colspan="3"><input name="name" type="text" class="fm-input"></td>'+
                '</tr>' +
                '<tr>' +
                '<td>手机号</td>' +
                '<td colspan="3"><input name="phone" type="text" class="fm-input"></td>'+
                '</tr>' +'<tr>' +
                '<td>邮箱</td>' +
                '<td colspan="3"><input name="email" type="text" class="fm-input"></td>'+
                '</tr>' +
                '</tr>' +'<tr>' +
                '<td>角色</td>' +
                '<td colspan="3"><select name="roleName" class="fm-input"></select></td>'+
                '</tr>' +
                '<tr>' +
                '<td>备注</td>' +
                '<td colspan="3"><input name="mark" readonly type="text" class="fm-input"></td>'+
                '</tr>' +
                '</table>' +
                '<div class="fm-btn-box flex flex-c-c flex-r-c">'+
                saveBtn+delBtn+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>';
            //拼接字符串
            $("#my_div_div").append(modal);
            $('.modal').hide();

        }, function (data) {
        });
        ajax.set("account", $('#search_account').val());
        ajax.set("phone", $('#search_phone').val());
        ajax.set("roleId", $('#search_roleId').val());
        ajax.start();


        //初始化 角色 下拉框
        var searchRoleId = $("#search_roleId");
        searchRoleId.empty();
        var tempStr = '<option value="" selected="selected">请选择</option>';
        searchRoleId.append(tempStr);
        var ajax = new $ax(Feng.ctxPath + '/user/userinfo/listRole', function (data) {
                /!*Feng.success("删除成功!");*!/
                var tempData = data.data;
                for (var i2 = 0; i2 < tempData.length; i2++) {
                    var tempStr2 = '<option value="' + tempData[i2].roleId + '">' + tempData[i2].name + '</option>';
                    searchRoleId.append(tempStr2);
                }
            },
            function (data) {
                /!*Feng.error("操作失败!" + data.responseJSON.message + "!");*!/

            });
        ajax.start();
    };*/
    //默认加载用户列表
    /*userInfoObj.queryUserList();*/
});

