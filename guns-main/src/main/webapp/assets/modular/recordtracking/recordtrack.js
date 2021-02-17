layui.use(['layer', 'admin', 'ax', 'func'], function () {

    var $ = layui.$;
    var $ax = layui.ax;
    var func = layui.func;

    /***
     * @Author wujianghao
     * @Description 用户对象申请，闭包
     * @Date 10:31 上午 2020/3/16
     * @Param
     * @return
     **/
    var recordObj = {

    }

    /**
     * @Author wujianghao
     * @Description 登入记录切换
     * @Date 11:15 上午 2020/3/16
     * @Param
     * @return
     **/
    recordObj.loginFun = function(){
        $("#recordtrack_list_table").empty();
        recordObj.queryRecordList();
    }
    /**
     * @Author wujianghao
     * @Description 点击登入记录按钮
     * @Date 11:47 上午 2020/3/16
     * @Param 
     * @return 
     **/
    $("#loginFun_id").click(function(){
        $("#loginFun_id").attr("class","btn-g");
        $("#operation_id").attr("class","btn-w");
        recordObj.loginFun();
    });


    /**
     * @Author wujianghao
     * @Description 操作记录切换
     * @Date 11:17 上午 2020/3/16
     * @Param 
     * @return 
     **/
    recordObj.operationFun = function(){
        $("#recordtrack_list_table").empty();
        recordObj.queryOperationList();
    }
    
    /**
     * @Author wujianghao
     * @Description 点击操作记录按钮
     * @Date 11:47 上午 2020/3/16
     * @Param 
     * @return 
     **/
    $("#operation_id").click(function(){
        $("#operation_id").attr("class","btn-g");
        $("#loginFun_id").attr("class","btn-w");
        recordObj.operationFun();
    });


    /**
     * @Author wujianghao
     * @Description 查询登入记录列表
     * @Date 11:49 上午 2020/3/16
     * @Param 
     * @return 
     **/
    recordObj.queryRecordList = function(){
        //发送请求
        var ajax = new $ax(Feng.ctxPath + "/loginLog/list", function (data) {
            for (var i = 0; i < data.data.length; i++) {
                //获取数据解析
                var recordInfo = data.data[i];
                //序号
                var No = i+1;
                //用户名
                var name = recordInfo.userName;
                //IP地址
                var ipAddress = recordInfo.ipAddress;
                //操作描述
                var logName = recordInfo.logName;
                //日期时间
                var createTime = recordInfo.createTime;
                //登入状态
                var succeed = recordInfo.succeed;

                //创建数据行
                var tr = "<tr>"
                        +"<td>"+No+"</td>"
                        +"<td>"+name+"</td>"
                        +"<td>"+ipAddress+"</td>"
                        +"<td>"+logName+"</td>"
                        +"<td>"+createTime+"</td>"
                        +"<td>"+succeed+"</td>"
                    +"</tr>";
                $("#recordtrack_list_table").append(tr);
            }
        }, function (data) {
        });
        ajax.start();
    };


    /**
     * @Author wujianghao
     * @Description 查询操作日志信息
     * @Date 11:53 上午 2020/3/16
     * @Param
     * @return
     **/
    recordObj.queryOperationList = function(){
         //发送请求
        var ajax = new $ax(Feng.ctxPath + "/log/list", function (data) {
            for (var i = 0; i < data.data.length; i++) {
                //获取数据解析
                var recordInfo = data.data[i];
                //序号
                var No = i+1;
                //用户名
                var name = recordInfo.userName;
                //IP地址
                var ipAddress = recordInfo.ipAddress;
                //操作描述
                var logName = recordInfo.logName;
                //日期时间
                var createTime = recordInfo.createTime;
                //登入状态
                var succeed = recordInfo.succeed;

                //创建数据行
                var tr = "<tr>"
                        +"<td>"+No+"</td>"
                        +"<td>"+name+"</td>"
                        +"<td>"+ipAddress+"</td>"
                        +"<td>"+logName+"</td>"
                        +"<td>"+createTime+"</td>"
                        +"<td>"+succeed+"</td>"
                    +"</tr>";
                $("#recordtrack_list_table").append(tr);
            }
        }, function (data) {
        });
        ajax.start();
    }



    $(function(){
        //默认加载用户列表
        recordObj.queryRecordList();
    });
});