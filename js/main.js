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
    var optTabs = document.getElementsByClassName('opt-tabs');
    var optPanes = document.getElementsByClassName('opt-pane');
    optTabs[0].onclick = function(){
        tab(this);
        optPanes[1].style.display = 'none';
        optPanes[0].style.display = 'flex'
    }
    optTabs[1].onclick = function(){
        tab(this);
        optPanes[0].style.display = 'none';
        optPanes[1].style.display = 'flex'
    }

}