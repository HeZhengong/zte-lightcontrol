layui.use(['layer', 'laydate', 'admin', 'ax', 'func'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var laydate = layui.laydate;

    var now = new Date();
    var nowYear = now.getFullYear(); //得到年份
    var nowMonth = now.getMonth(); //得到月份 0 - 11
    var nowDate = now.getDate(); //得到日期
    var nowValue = nowYear + '-' + nowMonth + '-' + nowDate + ' 至 ' + nowYear + '-' + (nowMonth + 1) + '-' + nowDate;

    var statisticsTime = laydate.render({
        elem: '#exportTime',
        range: '至',
        type: 'date',
        format: 'yyyy-MM-dd',
        value: nowValue,
        max: new Date().getTime()
    });

    $('#btn-export').on('click', function () {
        var operation = function () {
            var exportTime = $('#exportTime').val();
            var exportType = $('#export-type').val();
            switch (exportType) {
                case 'equip': window.location.href = '/statement/equip?exportTime=' + exportTime; break;
                case 'trouble': window.location.href = '/statement/alarm?exportTime=' + exportTime; break;
                case 'order': window.location.href = '/statement/workOrder?exportTime=' + exportTime; break;
                case 'energy': window.location.href = '/statement/energy?exportTime=' + exportTime; break;
            }

        };
        if(confirm("是否导出？")){
            operation();
        }else{

        }
     })

});

