window.onload = function () {
    isLogined();
    getAllNoti();
    getClasInfo();
    toPage();
    catchLi();

    // 修改状态
    let submit = document.getElementById('sec-submit');
    submit.onclick = function(){
        // 修改状态
        let stunum = document.getElementById('sec-stunum');
        let type = document.getElementById('sec-type');
        let status = document.getElementById('sec-status');
        let typeid = 0;
        // 判断类型
        if(type.innerText == '一轮面试'){
            typeid = 1;
        }else if(type.innerText == '二轮面试'){
            typeid = 2;
        }else{
            typeid = 3;
        };

        let data = {
            studentNumSerial : stunum.innerText,
            typeId : typeid,
            isPassed : status.value
        };
        console.log(data)
        $.ajax({
            url: domain + '/test/batchUpdatePs',
            headers:{
                'QGer': 'I am a QGer'
            },
            methods: 'POST',
            data: data,
            success: function(result){
                result = JSON.parse(result);
                location.reload();
            },
            error: (xhr,status,thrown)=>{
                if(xhr.status == 404){
                    location.assign('../error/404.html');
                }else{
                    location.assign('../error/500.html');
                }
            }
        })
    }

    // 关闭弹窗
    let pane = document.getElementById('secti-edit');
    let close = document.getElementById('sec-close');
    close.onclick = function(){
        pane.classList.add('hide')
    }
}


// 获取通知状态
function getAllNoti(){
    let listPromise = new Promise(resolve=>{
        $.ajax({
            url: domain + '/test/list',
            headers:{
                'QGer': 'I am a QGer'
            },
            methods: 'POST',
            success:(result)=>{
                resolve(result);
            },
            error: (xhr,status,thrown)=>{
                if(xhr.status == 404){
                    location.assign('../error/404.html');
                }else{
                    location.assign('../error/500.html');
                }
            }
        })
    });
    listPromise.then(result=>{
        ajaxAddToTable(result);
    });
}


// 将数据添加至表格(ajax用)
function ajaxAddToTable(result){
    result = JSON.parse(result);
    // console.log(res);
    if(result.status){

        let stuArr = str2Arr(result.data);
        addToTable(stuArr);
        
    }else{
        alert('无查询结果！');
        getStuList();
    }
}

// 回写数据(参数是对象数组)
function addToTable(stuArr){
    let Tfragment = document.createDocumentFragment();
    let table = document.getElementById('opt-table-info');
    for(let i=0;i<stuArr.length;i++){
        let fragment = document.createDocumentFragment();
        let tr = document.createElement('tr');

        let tdName      = document.createElement('td'),
            tdGender    = document.createElement('td'),
            tdNum       = document.createElement('td'),
            tdType      = document.createElement('td'),
            tdGroup     = document.createElement('td'),
            tdIspass    = document.createElement('td'),
            tdNotiInfo  = document.createElement('td'),
            tdStatus    = document.createElement('td'),
            tdQQ        = document.createElement('td'),
            tdEdit      = document.createElement('td');
        if(typeof stuArr[i] != 'object'){
            stuArr[i] = JSON.parse(stuArr[i]);
        }
        tdName      .innerText = stuArr[i].name;
        tdGender    .innerText = stuArr[i].gender;
        tdNum       .innerText = stuArr[i].studentNum;
        tdType      .innerText = stuArr[i].type;
        tdGroup     .innerText = stuArr[i].group;
        tdIspass    .innerText = stuArr[i].isPassed;
        tdNotiInfo  .innerText = stuArr[i].information;
        tdStatus    .innerText = stuArr[i].isRead;
        tdQQ        .innerText = stuArr[i].qq;

        tdEdit      .innerHTML = `
        <div class="detail-svg">
        <svg t="1596182901537" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2032"><path d="M799.5 927.3H156.3c-32.3 0-58.5-26.3-58.5-58.5V225.7c0-32.3 26.3-58.5 58.5-58.5h517.4c11.4 0 20.7 9.3 20.7 20.7s-9.3 20.7-20.7 20.7H156.3c-9.4 0-17.1 7.7-17.1 17.1v643.1c0 9.4 7.7 17.1 17.1 17.1h643.1c9.4 0 17.1-7.7 17.1-17.1v-493c0-11.4 9.3-20.7 20.7-20.7s20.7 9.3 20.7 20.7v493c0.1 32.3-26.1 58.5-58.4 58.5z" fill="#333333" p-id="2033"></path><path d="M552 493.6c-5.3 0-10.6-2-14.6-6.1-8.1-8.1-8.1-21.2 0-29.3l355.3-355.3c8.1-8.1 21.2-8.1 29.3 0 8.1 8.1 8.1 21.2 0 29.3L566.6 487.5c-4.1 4.1-9.4 6.1-14.6 6.1z" fill="#333333" p-id="2034"></path></svg>
        </div>
        `;

        tdEdit.classList.add('pointer');
        tdEdit.setAttribute('stuNum',stuArr[i].studentNum);
        tdEdit.setAttribute('type',stuArr[i].type);
        tdEdit.onclick = function(){
            // 显示修改状态页面
            let pane = document.getElementById("secti-edit");
            let stunum = document.getElementById('sec-stunum');
            let type = document.getElementById('sec-type');
            pane.classList.remove('hide');
            stunum.innerHTML = this.getAttribute('stuNum');
            type.innerHTML = this.getAttribute('type');
        }

        // 添加到tr
        fragment.appendChild(tdName);
        fragment.appendChild(tdGender);
        fragment.appendChild(tdNum);
        fragment.appendChild(tdType);
        fragment.appendChild(tdGroup);
        fragment.appendChild(tdIspass);
        fragment.appendChild(tdNotiInfo);
        fragment.appendChild(tdStatus);
        fragment.appendChild(tdQQ);
        fragment.appendChild(tdEdit);

    
        tr.appendChild(fragment);
        tr.classList.add('opt-table-tr');
        Tfragment.appendChild(tr);
    }
    table.appendChild(Tfragment);

    // 分页渲染
    diviPage(stuArr);
    addPageChange()
}

// 筛选
function getClasInfo(){
    let classifyBtn = document.getElementById('opt-classify');


    classifyBtn.onclick = function(){
        let groupname = document.getElementById('group').value;
        console.log(groupname)
        let listPromise = new Promise(resolve=>{
            $.ajax({
                url: domain + '/test/groupby',
                headers:{
                    'QGer': 'I am a QGer'
                },
                data:{group : groupname},
                methods: 'POST',
                success:(result)=>{
                    resolve(result);
                },
                error: (xhr,status,thrown)=>{
                    if(xhr.status == 404){
                        location.assign('../error/404.html');
                    }else{
                        location.assign('../error/500.html');
                    }
                }
            })
        });
        listPromise.then(result=>{
            // 删除所有学生
            let stus = document.getElementsByClassName('opt-table-tr');
            let optTable = document.getElementById('opt-table-info')
            while(stus.length != 0){
                optTable.removeChild(stus[0]);
            }
            // 分组并渲染
            classify(result)
        });
    }
}

//分组并渲染
function classify(result){
    result = JSON.parse(result);
    let stuArr = str2Arr(result.data);
    let isRead = document.getElementById('isread'),
    rounds = document.getElementById('rounds'),
    ispass = document.getElementById('ispass');
    let objStu = [];
    let stu = null;
    // 根据条件渲染
    if(isRead.value == 0 && rounds.value == 0 && ispass.value == 0 ){
        for(let i=0;i<stuArr.length;i++){
            stu = JSON.parse(stuArr[i])
            objStu.push(stu);
        }
    }else if(isRead.value != 0 && rounds.value == 0 && ispass.value == 0){
        for(let i=0;i<stuArr.length;i++){
            stu = JSON.parse(stuArr[i])
            if(stu.isRead == isRead.value){
                objStu.push(stu);
            }
        }
    }else if(isRead.value == 0 && rounds.value != 0 && ispass.value == 0){
        for(let i=0;i<stuArr.length;i++){
            stu = JSON.parse(stuArr[i])
            if(stu.type == rounds.value){
                objStu.push(stu);
            }
        }
    }else if(isRead.value == 0 && rounds.value == 0 && ispass.value != 0){
        for(let i=0;i<stuArr.length;i++){
            stu = JSON.parse(stuArr[i])
            if(stu.isPassed == ispass.value){
                objStu.push(stu);
            }
        }
    }else if(isRead.value != 0 && rounds.value != 0 && ispass.value == 0){
        for(let i=0;i<stuArr.length;i++){
            stu = JSON.parse(stuArr[i])
            if(stu.isRead == isRead.value && stu.type == rounds.value){
                objStu.push(stu);
            }
        }
    }else if(isRead.value != 0 && rounds.value == 0 && ispass.value != 0){
        for(let i=0;i<stuArr.length;i++){
            stu = JSON.parse(stuArr[i])
            if(stu.isRead == isRead.value && stu.isPassed == ispass.value){
                objStu.push(stu);
            }
        }
    }else if(isRead.value == 0 && rounds.value != 0 && ispass.value != 0){
        for(let i=0;i<stuArr.length;i++){
            stu = JSON.parse(stuArr[i])
            if(stu.type == rounds.value && stu.isPassed == ispass.value){
                objStu.push(stu);
            }
        }
    }else if(isRead.value != 0 && rounds.value != 0 && ispass.value != 0){
        for(let i=0;i<stuArr.length;i++){
            stu = JSON.parse(stuArr[i])
            if(stu.isRead == isRead.value && stu.type == rounds.value && stu.isPassed == ispass.value){
                objStu.push(stu);
            }
        }
    };

    // 渲染到页面;
    addToTable(objStu);
}

// 当前页面
var nowPage = 1;

// 分页显示
function diviPage(stuArr){
    // 页数
    let totalPage = Math.ceil(stuArr.length/15);
    // 往ul中添加页码
    let ul = document.getElementById('opt-page-ul');
    let pages = '';
    for(let i=1;i<=totalPage;i++){
        pages += `<li class="opt-page-tab pointer" >${i}</li>`;
    }
    ul.innerHTML = pages;
    appearPage(nowPage);
}

// 根据页码显示
function appearPage(page){
    let tbody = document.getElementById("opt-table-info");
    let pages = document.getElementById("opt-page-ul");
    let myTr = tbody.getElementsByTagName("tr");
    for (let i in myTr) {
        if (i >= (page - 1) * 15 && i < myTr.length && i < (page - 1) * 15 + 15) {
            myTr[i].classList.remove("hide");
        } else {
            if (myTr[i].classList)
                myTr[i].classList.add("hide")
        }
    }
    /* 修改当前页面的页码颜色 */
    let pageLi = pages.getElementsByTagName("li");
    pageLi[nowPage - 1].classList.remove("page-chose");
    pageLi[page - 1].classList.add("page-chose");
    /* 修改当前页面 */
    nowPage = page;
}

function addPageChange() {
    /* 点击123 */
    let pages = document.getElementById("opt-page-ul");
    let pageLi = pages.getElementsByTagName("li");
    for (let i = 0; i < pageLi.length; i++) {
        pageLi[i].onclick = function () {
            appearPage(this.innerHTML)
        }
    }
    /* 上一页 */
    document.querySelector(".opt-footer-pre").onclick = function () {
        if (nowPage != 1) {
            appearPage(nowPage - 1);
        }
    }
    /* 下一页 */
    document.querySelector(".opt-footer-nxt").onclick = function () {
        if (nowPage != pageLi.length) {
            appearPage(nowPage + 1);
        }
    }
}


// 页面跳转
function toPage() {
       let thepage = document.getElementById('opt-topage');
       setTimeout(function () {
           let pages = document.getElementsByClassName('opt-page-tab');
           let maxpage = pages.length;
           thepage.onkeypress = function (event) {
               if (event.keyCode == 13) {
                   let num = parseInt(thepage.value)
                   if (num > 0 && num <= maxpage) {
                       appearPage(num);
                   } else {
                       appearPage(pages.length);
                   }
               }
           }
       }, 4000)
}