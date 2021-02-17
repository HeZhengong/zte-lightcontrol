layui.use(['layer', 'admin', 'ax', 'func','laydate'], function () {
    var $ = layui.$;
    var $ax = layui.ax;
    var func = layui.func;
    var laydate = layui.laydate;
    var table = layui.table;
    var myChart;

    window.analysisObj = {

    };

    analysisObj.maxDate = null;
    analysisObj.minDate = null;

    analysisObj.initAnalysis = function (data, type, barGap) {
        $('#showMain').empty();
        $('#showMain').append('<div id="main" style="height: 585px;width: 1100px;"></div>');

        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = analysisObj.getOption(data, type, barGap);

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    };

    /**
     * 自定义 图形 类型 和 自动填充数据
     * @param data
     * @param type
     * @returns {{grid: {left: string, width: string, top: string, height: string}, xAxis: {type: string, axisLine: {lineStyle: {color: string}}, axisTick: {show: boolean}}, yAxis: {axisLine: {lineStyle: {color: string, width: number}}, axisTick: {show: boolean}, splitLine: {lineStyle: {color: string}}}, legend: {textStyle: {color: string}}, tooltip: {}, dataset: {source: [null,null,null,null,null,null,null]}, series: [null,null,null]}}
     */
    analysisObj.getOption = function (data, type, barGap) {
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

                }
                /*,
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
                },
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
                                color: '#47B0FF'
                            }, {
                                offset: 1,
                                color: '#0C75FA'
                            }])
                        }
                    },
                    barWidth: 10,//柱条宽度
                    barGap: barGap//柱间间距

                }*/
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
    analysisObj.initTime = function (date, type) {
        var data = [],
            startTime = "",
            endTime = "";

        var timeType = $('#statisticsTime').val();
        switch (timeType) {
            case 'day': {//当天的数据
                var dayTempYear = parseInt(date.year);
                var dayTempMonth = parseInt(date.month);
                var dayTempDay = parseInt(date.date);

                data.push(['product', dayTempYear + "-" + dayTempMonth + "-" + dayTempDay]);

                startTime = dayTempYear + '-' + dayTempMonth + '-' + dayTempDay;
                endTime = dayTempYear + '-' + dayTempMonth + '-' + dayTempDay;

            } break;
            case 'week': {//当前天所占的所在星期
                var startYear, startMonth, startDay, endYear, endMonth, endDay,
                    //本月总天数
                    dayNumberOfChooseMonth,
                    //选中的当天是星期几
                    chooseDay,
                    weekTempYear = parseInt(date.year), weekTempMonth = parseInt(date.month), weekTempDay = parseInt(date.date), currentDate = new Date();
                //第三个参数 为正数，month 取值 0 - 11
                //          为负数，month取值 1- 12
                currentDate.setFullYear(weekTempYear, weekTempMonth - 1, weekTempDay);
                //选中的当天是星期几
                chooseDay = currentDate.getDay();
                //默认星期天 为 0 ，在这里我将他赋值为 7
                chooseDay = chooseDay === 0 ? 7 : chooseDay;

                //默认情况 是 点中的这个星期在本月范围内，不跳月，不跳年
                endYear = weekTempYear;
                endMonth = weekTempMonth;
                endDay = weekTempDay + (7 - chooseDay);

                currentDate.setFullYear(weekTempYear, weekTempMonth, 0);
                //本月的总天数
                dayNumberOfChooseMonth = currentDate.getDate();
                //特殊情况 点中的这个星期 往后衍生一个月
                if (weekTempDay + (7 - chooseDay) > dayNumberOfChooseMonth) {
                    endMonth = weekTempMonth + 1;
                    endDay = weekTempDay + (7 - chooseDay) - dayNumberOfChooseMonth;
                    //特殊情况 点中的这个星期 往后衍生一个月 且跨年
                    if (weekTempMonth === 12) {
                        endYear = weekTempYear + 1;
                        endMonth = 1;
                    }
                }
                //默认情况 是 点中的这个星期在本月范围内，不跳月，不跳年
                startYear = weekTempYear;
                startMonth = weekTempMonth;
                startDay = weekTempDay - (chooseDay - 1);


                //特殊情况 选中的当天星期数 > 当天 号数，往前衍生 一个月
                if (chooseDay > weekTempDay) {
                    currentDate.setFullYear(weekTempYear, weekTempMonth - 1, 0);
                    //上个月的总天数
                    dayNumberOfChooseMonth = currentDate.getDate();

                    startMonth = weekTempMonth - 1;
                    startDay = dayNumberOfChooseMonth - (chooseDay - weekTempDay) + 1;
                    //特殊情况 点中的这个星期 往后衍生一个月 且跨年
                    if (weekTempMonth === 1) {
                        startYear = weekTempYear - 1;
                        startMonth = 12;
                    }
                }

                data.push(['product', startYear + "-" + startMonth + "-" + startDay + " : " + endYear + "-" + endMonth + "-" + endDay]);

                startTime = startYear + '-' + startMonth + '-' + startDay;
                endTime = endYear + '-' + endMonth + '-' + endDay;

            } break;
            case 'month': {
                var endDay, monthTempYear = parseInt(date.year), monthTempMonth = parseInt(date.month), currentDate = new Date();

                data.push(['product', monthTempYear + "-" + monthTempMonth]);

                currentDate.setFullYear(monthTempYear, monthTempMonth, 0);
                //最后一天星期几
                endDay = currentDate.getDate();

                startTime = monthTempYear + '-' + monthTempMonth + '-' + '1';
                endTime = monthTempYear + '-' + monthTempMonth + '-' + endDay;

            } break;
            case 'year': {//当前年加前两年
                var yearTempYear = parseInt(date.year);
                startTime = yearTempYear + '-1' + '-1';
                endTime = yearTempYear + '-12' + '-31';

                data.push(['product', "" + yearTempYear + ""]);

            } break;
        }
        analysisObj.ajaxFunc(startTime, endTime, data);
        analysisObj.initAnalysis(data, type, 10);
    };

    /**
     * ajax
     * @param startTime
     * @param endTime
     * @param data
     */
    analysisObj.ajaxFunc = function (startTime, endTime, data) {
        var ajax = new $ax(Feng.ctxPath + '/energy/analysis/selectList', function (getData) {
            var tempData = getData.data;
            data.push(
                ["理论用电",    parseInt(tempData[0].theoryElectricity)],
                ["实际用电",    parseInt(tempData[0].actualElectricity)],
                ["节省用电",    parseInt(tempData[0].saveElectricity)],
                ["节省净水",    parseInt(tempData[0].saveWater)],
                ["CO2减排",     parseInt(tempData[0].cO2)],
                ["SO2减排",     parseInt(tempData[0].sO2)],
                ["节省柴油",    parseInt(tempData[0].saveDerv)],
                ["节省标准煤",   parseInt(tempData[0].saveCoal)]
            );
        }, function (getData) {

        });
        ajax.set("startTime", startTime);
        ajax.set("endTime", endTime);
        ajax.start();
    };

    analysisObj.initPage = function () {

        var ajax = new $ax(Feng.ctxPath + '/energy/analysis/getMaxAndMinDate', function (getData) {
            var tempData = getData.data;
            analysisObj.maxDate = tempData[0];
            analysisObj.minDate = tempData[1];
        }, function (getData) {

        });
        ajax.start();

        var obj;
        var arr;
        arr = analysisObj.maxDate.split('-');
        obj = {
            "year": arr[0],
            "month": arr[1],
            "date": arr[2]
        };

        //初始化折线图
        analysisObj.initTime(obj, $('#statisticsType').val());
    };

    analysisObj.initPage();

    /**
     * 监听 下拉框 柱形图还是折线图
     */
    $('#statisticsType').change(function () {

        var obj;
        var arr;
        var chooseDate = $('#statisticsDate').val();
        arr = chooseDate != null && chooseDate != "" ? chooseDate.split('-') : analysisObj.maxDate.split('-');
        obj = {
            "year": arr[0],
            "month": arr[1],
            "date": arr[2]
        };
        analysisObj.initTime(obj, $('#statisticsType').val());
    });


    var statisticsTime = laydate.render({
        elem: '#statisticsDate',
        range: false,
        type:'date',
        /*format: 'yyyy',*/
        max: analysisObj.maxDate,
        min: analysisObj.minDate,
        showBottom: false,
        done: function(value, date){
            analysisObj.initTime(date, $('#statisticsType').val());
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
            analysisObj.initTime(date, $('#statisticsType').val());
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
                statisticsTime.config.type = 'date';
            } break;
            case 'month': {//本年的12个月，比如13月还没数据就先空着
                statisticsTime.config.type = 'month';
            } break;
            case 'year': {//当前年加前两年
                statisticsTime.config.type = 'year';
            } break;
        };
    });



});