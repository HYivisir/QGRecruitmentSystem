window.onload = function(){
    // 标签页切换
    var optTabs = document.getElementsByClassName('opt-tabs');
    var optPanes = document.getElementsByClassName('opt-pane');
    optTabs[0].onclick = function(){
        tab(this);
        optPanes[1].style.display = 'none';
        optPanes[2].style.display = 'none';
        optPanes[0].style.display = 'flex'
    }
    optTabs[1].onclick = function(){
        tab(this);
        optPanes[0].style.display = 'none';
        optPanes[2].style.display = 'none';
        optPanes[1].style.display = 'flex'
    }
    optTabs[2].onclick = function(){
        tab(this);
        optPanes[0].style.display = 'none';
        optPanes[1].style.display = 'none';
        optPanes[2].style.display = 'flex'
    }

}