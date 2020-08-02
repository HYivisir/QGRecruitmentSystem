// 这是框架的主要事件，可共用

// 域名
var domain = "http://39.98.41.126:30008";

function catchLi(){
    let oli = document.getElementsByClassName('side-tabs');
    oli[0].addEventListener('click',()=>{
        location.assign('statistic.html')
    },true)
    oli[1].addEventListener('click',()=>{
        location.assign('enrollInfo.html')
    },true)
    oli[2].addEventListener('click',()=>{
        location.assign('testResult.html')
    },true)
    oli[3].addEventListener('click',()=>{
        location.assign('noticeStatus.html')
    },true)
    oli[4].addEventListener('click',()=>{
        location.assign('notitemplate.html')
    },true)
}



/*
    method : get 或者 post 方法
    url    ：上传地址
    data   ：上传的数据集合
    success：成功的回调函数
    error  ：失败的回调函数
*/
function $ajax({ method = "get", url, data, success, error }) {
    //生成对象
    let xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch (error) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (data) {
        data = querystring(data);
    }

    if (method == "get" && data) {
        url += "?" + data;
    }

    //建立连接
    xhr.open(method, url, true);

    //发送请求
    if (method == "get") {
        xhr.send();
    } else {
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded;charset=utf-8");
        xhr.setRequestHeader("QGer", "I am a Qger");
        xhr.send(data);
    }

    //响应
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                //回调函数
                if (success)
                    success(xhr.responseText);
            } else {
                if (error)
                    error(xhr.responseText);
            }
        }
    }
}

function querystring(obj) {
    let str = "";
    for (let attr in obj) {
        str += attr + "=" + obj[attr] + "&";
    }
    return str.substring(0, str.length - 1);
}




// 将字符串转化为数组
function str2Arr(stringObj) {
    stringObj = stringObj.replace(/([\w,]*)/, "$1");
    if (stringObj.indexOf("[") == 0) {
        stringObj = stringObj.substring(1, stringObj.length - 1);
    }
    var arr = stringObj.split("},");
    var newArray = [];
    for (var i = 0; i < arr.length; i++) {

        if (i != arr.length - 1) {
            var arrOne = arr[i] + '}';
            newArray.push(arrOne);
        } else {
            var arrOne = arr[i];
            newArray.push(arrOne);
        }

    }
    return newArray;
};



/* 当前页面全选 */
/* page： 页数 */
/* one: 一页几个信息 */
function selectAllByPage(page, one) {
    let selectAll = document.querySelector('.select-all');
    let choose = document.getElementsByClassName('choose');

    selectAll.onclick = function () {
        if (!this.checked) {
            for (let i = (page - 1) * one; i < choose.length && i < (page - 1) * one + one; i++) {
                choose[i].checked = false
            }
        } else {
            for (let i = (page - 1) * one; i < choose.length && i < (page - 1) * one + one; i++) {
                choose[i].checked = true
            }
        }
    }
}

/* 点击tr选中 */
function clickTrClicked() {
    let tr = document.getElementsByTagName("tr");
    let cho = document.getElementsByClassName("choose");
    for (let i = 1; i < tr.length; i++) {
        tr[i].onclick = function () {
            cho[i - 1].checked = (cho[i - 1].checked ? false : true);
        }
        cho[i - 1].onclick = function () {
            cho[i - 1].checked = (cho[i - 1].checked ? false : true);
        }
    }
}

// 获取cookie
function getCookie(name) {
    var reg = RegExp(name + '=([^;]+)');
    var arr = document.cookie.match(reg);
    if (arr) {
        return arr[1];
    } else {
        return '';
    }
}

// 设置cookie
function setCookie(name, value, day) {
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires=' + date;
};

// 删除cookie
function delCookie(name) {
    setCookie(name, null, -1);
}

// 是否登录
function isLogined(){
    let user = localStorage.getItem('user');
    let pwd = localStorage.getItem('token');

    $.ajax({
        url: domain + '/login',
        methods: 'POST',
        data:{
            username : user,
            password : pwd
        },
        headers:{
            'QGer': 'I am a QGer'
        },
        success:(res)=>{
            res = JSON.parse(res);
            if(!res.status){
                delCookie('username');
                delCookie('password');
                location.assign('../error/unLog.html')
            }
        },
        error: (xhr,status,thrown)=>{
            if(xhr.status == 404){
                location.assign('../error/404.html');
            }else{
                location.assign('../error/500.html');
            }
        }
    })
}


// 退出登录
function exit(){
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    location.assign('../index.html');
}