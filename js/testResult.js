window.onload = function(){
    var changeScoreBtn = document.getElementById('opt-change-score');
    var changePassBtn = document.getElementById('opt-change-pass');
    var sendMsgBtn = document.getElementById('opt-send-msg');

    // 弹窗
    var scoreSection = document.getElementById('secti-score');
    var passSection = document.getElementById('secti-pass');
    var msgSection = document.getElementById('secti-send-msg');

    // 弹窗事件
    changeScoreBtn.onclick = function(){
        scoreSection.classList.remove('hide');
    }
    changePassBtn.onclick = function(){
        passSection.classList.remove('hide');
    }
    sendMsgBtn.onclick = function(){
        msgSection.classList.remove('hide');
    }

    // 关窗事件
    var sections = document.getElementsByClassName('secti');
    var closeBtn = document.getElementsByClassName('sec-de');
    var submitBtn = document.getElementsByClassName('de-sub');

    for(var i=0;i<sections.length;i++){
        let index = i;
        submitBtn[index].onclick = function(){
            sections[index].classList.add('hide');
        };
        closeBtn[index].onclick = function(){
            sections[index].classList.add('hide');
        }
    }
}