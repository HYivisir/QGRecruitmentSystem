window.onload = function(){
    //跳回主页
    setTimeout(()=>{
        location.assign('../index.html');
    },5000);

    let timer = document.getElementById('time');
    let sign = 5;
    setInterval(function (){
        timer.innerHTML = sign;
        if(sign>0){
            sign--;
        }else{
            sign = 0;
        }      
    },1000);
}