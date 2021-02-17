layui.use(['layer', 'admin', 'ax', 'func','laydate'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var func = layui.func;
    var laydate = layui.laydate;
    var table = layui.table;
    var myChart;

    window.statisticsObj = {

    };

    statisticsObj.maxDate = null;
    statisticsObj.minDate = null;

    statisticsObj.initStatistics = function (data, type, barGap) {
        $('#showMain').empty();
        $('#showMain').append('<div id="main" style="height: 585px;width: 1100px;"></div>');

        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = statisticsObj.getOption(data, type, barGap);

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    };

    /**
     * 自定义 图形 类型 和 自动填充数据
     * @param data
     * @param type
     * @returns {{grid: {left: string, width: string, top: string, height: string}, xAxis: {type: string, axisLine: {lineStyle: {color: string}}, axisTick: {show: boolean}}, yAxis: {axisLine: {lineStyle: {color: string, width: number}}, axisTick: {show: boolean}, splitLine: {lineStyle: {color: string}}}, legend: {textStyle: {color: string}}, tooltip: {}, dataset: {source: [null,null,null,null,null,null,null]}, series: [null,null,null]}}
     */
    statisticsObj.getOption = function (data, type, barGap) {
        return {
            grid: {
                left: "5%",
                width: "70%",
                top: "10%",
                height: "60%"
            },
            xAxis: {
                type: 'category',// x 轴类型
                axisLine: {//轴线
                    lineStyle: {
                        color: '#0A6ADB'
                    }
                },
                axisTick: {//坐标轴刻度相关设置。
                    show: false//不显示 刻度
                }
            },
            yAxis: {
                axisLine: {//轴线
                    lineStyle: {
                        color: '#0857B2',
                        width: 0
                    }
                },
                axisTick: {//坐标轴刻度相关设置。
                    show: false//不显示 刻度
                },
                splitLine: {//背景网格线
                    lineStyle: {
                        color: "#032D5A"
                    }
                }
            },
            legend: {
                textStyle: {
                    color: "#FF83FA"
                }
            },
            tooltip: {},
            dataset: {
                source: data
            },
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                {
                    type: type,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#47B0FF'
                            }, {
                                offset: 1,
                                color: '#0C75FA'
                            }])
                        }
                    },
                    barWidth: 10,//柱条宽度
                    barGap: barGap//柱间间距

                },
                {
                    type: type,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#B2FF66'
                            }, {
                                offset: 1,
                                color: '#52FCBE'
                            }])
                        }
                    },
                    barWidth: 10,//柱条宽度
                    barGap: barGap//柱间间距
                }/*,
                {type: type}*/
            ]
        };
    };

    /**
     * 当前选中的时间
     * [
     ['product', '2015', '2016', '2017'],
     ['Matcha Latte', 43.3, 85.8, 93.7],
     ['Milk Tea', 83.1, 73.4, 55.1],
     ['Cheese Cocoa', 86.4, 65.2, 82.5],
     ['Walnut Brownie1'],
     ['Walnut Brownie2'],
     ['Walnut Brownie3']
     ]
     * @param currentChooseTime
     */
    statisticsObj.initTime = function (date, type) {
        var data = [];
        data.push(['product', '理论用电', '实际用电']);
        var timeType = $('#statisticsTime').val();
        switch (timeType) {
            case 'day': {//本月的多少天，比如32号没数据就先空着
                var dayTempYear = parseInt(date.year);
                var dayTempMonth = parseInt(date.month);
                //选中 日期(比如选中了 3月 1日) --> dayTempDay = 1;
                var dayTempDay = parseInt(date.date);
                //选中当前月一个月有多少天（dayOfChooseMonth = 3月 31天）
                var dayNumberOfChooseMonth;
                var currentDate = new Date();
                currentDate.setFullYear(dayTempYear, dayTempMonth, 0);
                dayNumberOfChooseMonth = currentDate.getDate();

                var ajax = new $ax(Feng.ctxPath + '/energy/statistics/selectList', function (getData) {
                    /*Feng.success("删除成功!");*/

                    var tempDate = getData.data;
                    for (var j = 1; j <= dayNumberOfChooseMonth; j++) {
                        if (j <= tempDate.length) {
                            data.push([j, tempDate[j - 1].theoryElectricity, tempDate[j - 1].actualElectricity]);
                        } else {
                            data.push([j]);
                        }
                    }

                }, function (getData) {
                    /*Feng.error("操作失败!" + data.responseJSON.message + "!");*/

                });
                ajax.set("startTime", dayTempYear + '-' + dayTempMonth + '-1');
                ajax.set("endTime", dayTempYear + '-' + dayTempMonth + '-' + dayTempDay);
                ajax.start();
                statisticsObj.initStatistics(data, type, "20%");
            } break;
            case 'week': {//本月的
                var startYear,
                    endYear,
                    startMonth,
                    endMonth,
                    startDay,
                    endDay,
                    weekTempYear = parseInt(date.year),
                    weekTempMonth = parseInt(date.month),
                    weekNumber = 0,//默认累加一星期
                    dayNumberOfChooseMonth,
                    currentDate = new Date();
                //第三个参数 为正数，month 取值 0 - 11
                //          为负数，month取值 1- 12
                currentDate.setFullYear(weekTempYear, weekTempMonth - 1, 1);
                //本月的第一天是星期几
                var firstOfMonth = currentDate.getDay();
                //默认星期天 为 0 ，在这里我将他赋值为 7
                firstOfMonth = firstOfMonth === 0 ? 7 : firstOfMonth;


                currentDate.setFullYear(weekTempYear, weekTempMonth, 0);
                //最后一天星期几
                var lastOfMonth = currentDate.getDay();
                //默认星期天 为 0 ，在这里我将他赋值为 7
                lastOfMonth = lastOfMonth === 0 ? 7 : lastOfMonth;


                //本月的总天数
                dayNumberOfChooseMonth = currentDate.getDate();

                //得到本月总星期数 包括往前 衍生 一星期
                weekNumber = parseInt((dayNumberOfChooseMonth - (7 - firstOfMonth + 1)) / 7) + 1;


                //默认本月不是12月(影响 年 和 月)，默认最后一天不是星期天（影响 年 月 天 星期），
                weekNumber++;
                endYear = weekTempYear;
                endMonth = weekTempMonth + 1;
                endDay = 7 - lastOfMonth;
                //如果本月是12月且默认最后一天不是星期天，跳年，跳月
                if (weekTempMonth === 12) {
                    endYear = weekTempYear + 1;
                    endMonth = 1;
                }
                //如果是最后一天是星期天，就不存在多累加一星期，不跳月，不跳年
                if (lastOfMonth === 7) {
                    weekNumber--;
                    endYear = weekTempYear;
                    endDay = dayNumberOfChooseMonth;
                    endMonth = weekTempMonth;
                }

                //默认本月不是1月(影响 年 和 月)，默认最开始一天不是星期一（影响 年 月 天）
                startYear = weekTempYear;
                startMonth = weekTempMonth - 1;
                //上个月是 30天还是31天
                currentDate.setFullYear(weekTempYear, weekTempMonth - 1, 0);
                //上个月的总天数 - (本月的第一天是星期几 - 1)
                startDay = currentDate.getDate() - (firstOfMonth - 1) + 1;
                //如果本月是1月且默认最开始一天不是星期一 跳年 跳月
                if (weekTempMonth === 1) {
                    startYear = weekTempYear - 1;
                    startMonth = 12;
                }
                //如果是最开始一天是星期一，不跳月，不跳年
                if (firstOfMonth === 1) {
                    startYear = weekTempYear;
                    startMonth = weekTempMonth;
                    startDay = 1;
                }

                var ajax = new $ax(Feng.ctxPath + '/energy/statistics/selectList', function (getData) {

                    var tempDate = getData.data;
                    var tempTheoryElectricity = 0;
                    var tempActualElectricity = 0;
                    for (var j = 1; j <= tempDate.length; j++) {

                        tempTheoryElectricity += parseInt(tempDate[j - 1].theoryElectricity);
                        tempActualElectricity += parseInt(tempDate[j - 1].actualElectricity);
                        if (j % 7 === 0) {
                            data.push([j / 7, tempTheoryElectricity, tempActualElectricity]);
                            tempTheoryElectricity = 0;
                            tempActualElectricity = 0;
                        }
                    }

                }, function (getData) {
                    /*Feng.error("操作失败!" + data.responseJSON.message + "!");*/

                });
                ajax.set("startTime", startYear + '-' + startMonth + '-' + startDay);
                ajax.set("endTime", endYear + '-' + endMonth + '-' + endDay);
                ajax.start();

                statisticsObj.initStatistics(data, type, "80%");
            } break;
            case 'month': {//本年的12个月，比如13月还没数据就先空着
                var monthTempYear = parseInt(date.year);
                var monthTempMonth = parseInt(date.month);

                var currentDate = new Date();

                currentDate.setFullYear(monthTempYear, monthTempMonth, 0);
                var endDay = currentDate.getDate();

                var ajax = new $ax(Feng.ctxPath + '/energy/statistics/selectListGroupByMonth', function (getData) {

                    var tempDate = getData.data;
                    var numberOfMonth = 0;
                    for (var i = 1; i <= tempDate.length; i++) {
                        numberOfMonth = parseInt(((tempDate[i - 1].createTime).split('-'))[1]);
                        data.push([numberOfMonth, parseInt(tempDate[i - 1].theoryElectricity), parseInt(tempDate[i - 1].actualElectricity)]);
                    }
                    for (++numberOfMonth; numberOfMonth <= 12; numberOfMonth++)
                        data.push([numberOfMonth, 0, 0]);

                }, function (getData) {
                });
                ajax.set("startTime", monthTempYear + '-' + '1' + '-' + '1');
                ajax.set("endTime", monthTempYear + '-' + monthTempMonth + '-' + endDay);
                ajax.start();

                statisticsObj.initStatistics(data, type, "80%");
            } break;
            case 'year': {//当前年加前两年
                var yearTempYear = parseInt(date.year);

                var ajax = new $ax(Feng.ctxPath + '/energy/statistics/selectListGroupByYear', function (getData) {

                    var tempDate = getData.data;
                    var numberOfYear = 0;
                    for (var i = 1; i <= tempDate.length; i++) {
                        numberOfYear = parseInt(((tempDate[i - 1].createTime).split('-'))[0]);
                        data.push([numberOfYear, parseInt(tempDate[i - 1].theoryElectricity), parseInt(tempDate[i - 1].actualElectricity)]);
                    }
                    /*for (++numberOfMonth; numberOfMonth <= 12; numberOfMonth++)
                        data.push([numberOfMonth, 0, 0]);*/

                }, function (getData) {
                });
                ajax.set("startTime", (yearTempYear - 2) + '-' + '1' + '-' + '1');
                ajax.set("endTime", yearTempYear + '-' + '12' + '-' + '31');
                ajax.start();
                statisticsObj.initStatistics(data, type, "80%");
            } break;
        }
    };

    statisticsObj.initPage = function () {

        var ajax = new $ax(Feng.ctxPath + '/energy/analysis/getMaxAndMinDate', function (getData) {
            var tempData = getData.data;
            statisticsObj.maxDate = tempData[0];
            statisticsObj.minDate = tempData[1];
        }, function (getData) {

        });
        ajax.start();

        var obj;
        var arr;
        arr = statisticsObj.maxDate.split('-');
        obj = {
            "year": arr[0],
            "month": arr[1],
            "date": arr[2]
        };

        //初始化折线图
        statisticsObj.initTime(obj, $('#statisticsType').val());
    };

    statisticsObj.initPage();


    /**
     * 监听 下拉框 柱形图还是折线图
     */
    $('#statisticsType').change(function () {

        var obj;
        var arr;
        var chooseDate = $('#statisticsDate').val();
        arr = chooseDate != null && chooseDate != "" ? chooseDate.split('-') : statisticsObj.maxDate.split('-');
        obj = {
            "year": arr[0],
            "month": arr[1],
            "date": arr[2]
        };
        statisticsObj.initTime(obj, $('#statisticsType').val());
    });


    /**
     * 初始化 日历控件
     */
    var statisticsTime = laydate.render({
        elem: '#statisticsDate',
        range: false,
        type:'date',
        max: statisticsObj.maxDate,
        min: statisticsObj.minDate,
        max: Feng.currentDate(),
        showBottom: false,
        done: function(value, date){
            statisticsObj.initTime(date, $('#statisticsType').val());
        }
        ,change: function(value, date){
            /*statisticsTime.hint("change"); //在控件上弹出value值*/
            var timeType = $('#statisticsTime').val();
            switch (timeType) {
                case 'week': {
                    $('#statisticsDate').val(date.year + '-' + date.month);
                } break;
                case 'month': {
                    $('#statisticsDate').val(date.year + '-' + date.month);
                } break;
                case 'year': {
                    $('#statisticsDate').val(date.year);
                } break;
            }
            statisticsObj.initTime(date, $('#statisticsType').val());
        }
    });

    /**
     * 监听 下拉框 选择按天还是按年
     */
    $('#statisticsTime').change(function () {
        var timeType = $('#statisticsTime').val();
        switch (timeType) {
            case 'day': {//本月的多少天，比如32号没数据就先空着
                statisticsTime.config.type = 'date';
            } break;
            case 'week': {//本月的
                statisticsTime.config.type = 'month';
            } break;
            case 'month': {//本年的12个月，比如13月还没数据就先空着
                statisticsTime.config.type = 'month';
            } break;
            case 'year': {//当前年加前两年
                statisticsTime.config.type = 'year';
            } break;
        };
    });


    /*$('#btnAdd').on('click', function () {
        var ajax = new $ax(Feng.ctxPath + '/energy/analysis/insertList', function (data) {
                /!*Feng.success("删除成功!");*!/
                var tempDate = data;
            }, function (data) {
                /!*Feng.error("操作失败!" + data.responseJSON.message + "!");*!/

            });
        ajax.start();
    })*/

});