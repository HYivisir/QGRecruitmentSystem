// 这是框架的主要事件，可共用

function tab(target){
    var tabs = document.getElementsByClassName('opt-tabs');
    var panes = document.getElementsByClassName('opt-pane');
    var tabsArr = [];
    for(var i=0;i<tabs.length;i++){
        tabsArr.push(tabs[i]);
    }

    var index = tabsArr.indexOf(target);
    for(var i=0;i<tabs.length;i++){
        tabs[i].classList.remove('opt-active');
        panes[i].classList.remove('in');
    }
    target.classList.add('opt-active');
    panes[index].classList.add('in');
}

window.onload = function(){
    
    // 全选功能
    var selectAll = document.getElementsByClassName('select-all');
    var choose = document.getElementsByClassName('choose');
    for(var i=0;i<selectAll.length;i++){
        selectAll[i].onclick=function(){
            if(!this.checked){
                for(var i=0;i<choose.length;i++){
                    choose[i].checked = false
                }
            }else{
                for(var i=0;i<choose.length;i++){
                    choose[i].checked = true
                }
            }
        }
    }
}