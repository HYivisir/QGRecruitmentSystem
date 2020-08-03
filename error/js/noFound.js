window.onload = function(){

    let timer = document.getElementById('time');
    let sign = 4;
    setInterval(function (){
        timer.innerHTML = sign;
        if(sign>0){
            sign--;
        }else{
            sign=0;
        }      
    },1000);

    //跳回主页
    setTimeout(()=>{
        location.assign('../pages/statistic.html');
    },5000);

    
}