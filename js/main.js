// 这是框架的主要事件，可共用

// 域名
var domain = "http://39.98.41.126:30008";

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



// 标签切换
function tab(target) {
    var tabs = document.getElementsByClassName('opt-tabs');
    var panes = document.getElementsByClassName('opt-pane');
    var tabsArr = [];
    for (var i = 0; i < tabs.length; i++) {
        tabsArr.push(tabs[i]);
    }

    var index = tabsArr.indexOf(target);
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('opt-active');
        panes[i].classList.remove('in');
    }
    target.classList.add('opt-active');
    panes[index].classList.add('in');
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

// 全选功能 放到各自的js文档最后，保证页面渲染完成后再执行
function selectAll() {
    var selectAll = document.getElementsByClassName('select-all');
    var choose = document.getElementsByClassName('choose');
    for (var i = 0; i < selectAll.length; i++) {
        selectAll[i].onclick = function () {
            if (!this.checked) {
                for (var i = 0; i < choose.length; i++) {
                    choose[i].checked = false
                }
            } else {
                for (var i = 0; i < choose.length; i++) {
                    choose[i].checked = true
                }
            }
        }
    }
}

window.onload = function () {
    selectAll()
}

/* 当前页面全选 */
/* page： 页数 */
/* 一页是个框 */
function selectAllByPage(page) {
    let selectAll = document.querySelector('.select-all');
    let choose = document.getElementsByClassName('choose');

    selectAll.onclick = function () {
        if (!this.checked) {
            for (let i = (page - 1) * 10; i < choose.length && i < (page - 1) * 10 + 10; i++) {
                choose[i].checked = false
            }
        } else {
            for (let i = (page - 1) * 10; i < choose.length && i < (page - 1) * 10 + 10; i++) {
                choose[i].checked = true
            }
        }
    }
}