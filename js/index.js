// 获取cookie
function getCookie(name){
    var reg = RegExp(name + '=([^;]+)');
    var arr = document.cookie.match(reg);
    if(arr){
        return arr[1];
    }else{
        return '';
    }
}

// 设置cookie
function setCookie(name , value,day){
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires=' + date;
};

// 删除cookie
function delCookie(name){
    setCookie(name,null,-1);
}

// 记住我
window.onload = function (){
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var oRem = document.getElementById('rem');
    var oSumit = document.getElementById('log-in');
    if(getCookie('username') && getCookie('password')){
        username.value = getCookie('username');
        password.value = getCookie('password');
        oRem.checked = true;
    };
    // 如果未勾选则清除cookie
    oRem.onchange = function(){
        if(!this.checked){
            delCookie('username');
            delCookie('password');
        }
    };

    // 按登录按钮时
    oSumit.onclick = function(){
        if(oRem.checked){
            setCookie('username',username.value,7);
            setCookie('password',password.value,7);
        }
    }
}


