window.onload = function(){
    isLogined();
    catchLi();
    // 退出功能
    document.getElementById('header-exit').onclick = function(){
        exit();
    }
    // 生成图表

    let promise = new Promise(resolve=>{
        $.ajax({
            url: domain + '/graphic',
            methods: 'POST',
            headers:{
                'QGer': 'I am a QGer'
            },
            success:(res)=>{
                resolve(res);
            },
            error: (xhr,status,thrown)=>{
                if(xhr.status == 404){
                    location.assign('../error/404.html');
                }else{
                    location.assign('../error/500.html');
                }
            }
        })
    });

    promise.then(res=>{
        res = JSON.parse(res);
        data = JSON.parse(res.data);
        group = data.groupNum;
        console.log(data.writtenNoPassed)
        twoChoiceChart('opt-gender','报名人数男女比例','男','女',data.maleNum,data.femaleNum);
        twoChoiceChart('opt-written','笔试通过状态','通过','未通过',data.writtenPassed,data.writtenNoPassed);
        twoChoiceChart('opt-first','一轮通过状态','通过','未通过',data.firstRoundPassed,data.firstRoundNoPassed);
        twoChoiceChart('opt-second','二轮通过状态','通过','未通过',data.secondRoundPassed,data.secondRoundNoPassed);
        groupChart(group.前端组,group.后台组,group.图形组,group.数据挖掘组,group.嵌入式组,group.移动组,group.设计组)
    })
}

// 两种选择的比例图
function twoChoiceChart(oId,oTitle,oFirst,oSecond,oFdigit,oSdigit){
    var myChart = echarts.init(document.getElementById(oId));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: oTitle,
            x: 10,
            y: 10
        },
        tooltip: {},
        legend: {
            data:[oFirst,oSecond],
            formatter: function(name) {
                var index = 0;
                var clientlabels = [oFirst,oSecond];
                var clientcounts = [oFdigit,oSdigit];
                clientlabels.forEach(function(value,i){
                    if(value == name){
                        index = i;
                    }
                });
                return name + "  " + clientcounts[index];
            },
            orient: 'vertical',
            top: 'bottom',
            right: '20px'
        },
        series : [
            {
                name: oTitle,
                type: 'pie',
                radius: '50%',
                label : {
                    　　　　normal : {
                    　　　　　　formatter: '{b}: ({d}%)',
                    　　　　　　textStyle : {
                    　　　　　　　　fontWeight : 'normal',
                    　　　　　　　　fontSize : 15
                    　　　　　　}
                    　　　　}
                    　　},
                data:[
                    {value:oFdigit, name:oFirst},
                    {value:oSdigit, name:oSecond}
                ]
            }
        ],
        //设置调色盘
        color:['#69cad0','#ec9399','#f8e086','#a1dda7','#9b83e1','#e9d7b3', '#eeab7e','#76b2e8','#b989e4','#ea9e8c','#db708f','#cde781'],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

// 组别
function groupChart(Dfront,Dback,Dgraphic,Dstatis,Dembed,Dmobile,Ddesign){
    var myChart = echarts.init(document.getElementById('opt-group'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '各组人员数量统计',
            x: 10,
            y: 10
        },
        tooltip: {},
        legend: {
            data:['前端组','后台组','图形组','数据挖掘组','嵌入式组','移动组','设计组'],
            formatter: function(name) {
                var index = 0;
                var clientlabels = ['前端组','后台组','图形组','数据挖掘组','嵌入式组','移动组','设计组'];
                var clientcounts = [Dfront,Dback,Dgraphic,Dstatis,Dembed,Dmobile,Ddesign];
                clientlabels.forEach(function(value,i){
                    if(value == name){
                        index = i;
                    }
                });
                return name + " " + clientcounts[index];
            },
            orient: 'vertical',
            top: 'bottom',
            right: '0'
        },
        series : [
            {
                name: '各组人员数量统计',
                type: 'pie',
                radius: '50%',
                label : {
                    　　　　normal : {
                    　　　　　　formatter: '{b}: ({d}%)',
                    　　　　　　textStyle : {
                    　　　　　　　　fontWeight : 'normal',
                    　　　　　　　　fontSize : 13
                    　　　　　　}
                    　　　　}
                    　　},
                data:[
                    {value:Dfront, name:'前端组'},
                    {value:Dback, name:'后台组'},
                    {value:Dgraphic, name:'图形组'},
                    {value:Dstatis, name:'数据挖掘组'},
                    {value:Dembed, name:'嵌入式组'},
                    {value:Dmobile, name:'移动组'},
                    {value:Ddesign, name:'设计组'},
                ]
            }
        ],
        //设置调色盘
        color:['#f8e086','#a1dda7','#9b83e1', '#ec9399','#e9d7b3', '#eeab7e','#69cad0','#76b2e8','#b989e4','#ea9e8c','#db708f','#cde781'],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
