var domain = "http://175.24.120.68/recruit";

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

// 记住我
window.onload = function () {
    let oUser = document.getElementById('username');
    let oPwd = document.getElementById('password');
    let oRem = document.getElementById('rem');
    let oRemme = document.getElementById('rem-me');
    let oSumit = document.getElementById('log-in');
    let closebtn = document.getElementsByClassName('close-btn');
    let delePane = document.getElementById('dele-pane');
    // 弹窗事件
    for(let i=0;i<closebtn.length;i++){
        closebtn[i].onclick = function(){
            delePane.classList.add('hide');
        }
    }

    oRemme.onclick = function(){
        oRem.checked = !oRem.checked;
    }
    if (getCookie('username') && getCookie('password')) {
        oUser.value = getCookie('username');
        oPwd.value = getCookie('password');
        oRem.checked = true;
    };
    // 如果未勾选则清除cookie
    oRem.onchange = function () {
        if (!this.checked) {
            delCookie('username');
            delCookie('password');
        }
    };

    // 按登录按钮时
    oSumit.onclick = function () {

        let promise = new Promise(resolve=>{
            $.ajax({
                url: domain + '/login',
                methods: 'POST',
                xhrFields: {
                    withCredentials: true
                },
                headers:{
                    'QGer': 'I am a QGer'
                },
                data:{
                    username: oUser.value,
                    password: oPwd.value
                },
                success: result=>{
                    resolve(result);
                }
            })
        });

        promise.then(result=>{
            result = JSON.parse(result)
            if(result.status == true){
                if(oRem.checked){
                    setCookie('username' ,oUser.value,7);
                    setCookie('password' ,result.message,7);
                }else{
                    setCookie('username' ,oUser.value,1);
                    setCookie('password' ,result.message,1);
                }
                location.assign('pages/statistic.html')
            
            }else{
                delePane.classList.remove('hide');
                oUser.value = '';
                oPwd.value = '';
                oRem.checked = false;
                delCookie('username');
                delCookie('password');
            }
        })
    }
}
