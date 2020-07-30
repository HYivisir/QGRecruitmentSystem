// 这是框架的主要事件，可共用

// 域名
var domain = "http://39.98.41.126:30008";
    
// 标签切换
function tab(target){
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
    for ( var i = 0; i < arr.length; i++) {  
        var arrOne = arr[i]+'}';  
        newArray.push(arrOne);  
    }  
    return newArray;  
};  

// 全选功能 放到各自的js文档最后，保证页面渲染完成后再执行
function selectAll(){
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