window.onload = function(){
    catchLi();
    genderChart();
}

// 男女比例
function genderChart(){
    var myChart = echarts.init(document.getElementById('opt-gender'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '总报名人数男女比例'
        },
        tooltip: {},
        legend: {
            data:['男生','女生'],
            orient: 'vertical',
            top: 'center',
            left: '50'
        },
        series : [
            {
                name: '男生女生比例',
                type: 'pie',
                radius: '55%',
                
                data:[
                    {value:235, name:'男生'},
                    {value:274, name:'女生'}
                ]
            }
        ],
        //设置调色盘
        color:['#9b83e1', '#ec9399','#e9d7b3', '#eeab7e','#f8e086','#a1dda7','#69cad0','#76b2e8','#b989e4','#ea9e8c','#db708f','#cde781'],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}