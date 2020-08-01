window.onload = function () {
    getAllNoti()
}


// 获取通知状态
function getAllNoti(){
    let listPromise = new Promise(resolve=>{
        $.ajax({
            url: domain + '/test/list',
            methods: 'POST',
            success:(result)=>{
                resolve(result);
            }
        })
    });
    listPromise.then(result=>{
        addToTable(result);
    });
}


// 将数据添加至表格
function addToTable(result){
    result = JSON.parse(result);
    // console.log(res);
    if(result.status){
        let Tfragment = document.createDocumentFragment();
        let table = document.getElementById('opt-table-info');
        let stuArr = str2Arr(result.data);
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
            tdName      .innerText = JSON.parse(stuArr[i]).name;
            tdGender    .innerText = JSON.parse(stuArr[i]).gender;
            tdNum       .innerText = JSON.parse(stuArr[i]).studentNum;
            tdType      .innerText = JSON.parse(stuArr[i]).type;
            tdGroup     .innerText = JSON.parse(stuArr[i]).group;
            tdIspass    .innerText = JSON.parse(stuArr[i]).isPassed;
            tdNotiInfo  .innerText = JSON.parse(stuArr[i]).information;
            tdStatus    .innerText = JSON.parse(stuArr[i]).isRead;
            tdQQ        .innerText = JSON.parse(stuArr[i]).qq;

            tdEdit      .innerHTML = `
            <div class="detail-svg">
            <svg t="1596182901537" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2032"><path d="M799.5 927.3H156.3c-32.3 0-58.5-26.3-58.5-58.5V225.7c0-32.3 26.3-58.5 58.5-58.5h517.4c11.4 0 20.7 9.3 20.7 20.7s-9.3 20.7-20.7 20.7H156.3c-9.4 0-17.1 7.7-17.1 17.1v643.1c0 9.4 7.7 17.1 17.1 17.1h643.1c9.4 0 17.1-7.7 17.1-17.1v-493c0-11.4 9.3-20.7 20.7-20.7s20.7 9.3 20.7 20.7v493c0.1 32.3-26.1 58.5-58.4 58.5z" fill="#333333" p-id="2033"></path><path d="M552 493.6c-5.3 0-10.6-2-14.6-6.1-8.1-8.1-8.1-21.2 0-29.3l355.3-355.3c8.1-8.1 21.2-8.1 29.3 0 8.1 8.1 8.1 21.2 0 29.3L566.6 487.5c-4.1 4.1-9.4 6.1-14.6 6.1z" fill="#333333" p-id="2034"></path></svg>
            </div>
            `;

            tdEdit.classList.add('pointer');

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
        table.appendChild(Tfragment)
        
    }else{
        alert('无查询结果！');
        getStuList();
    }
}

// 筛选
function getClasInfo(){
    let classifyBtn = document.getElementById('opt-classify');
    let groupname = document.getElementById('grpup');
    classifyBtn.onclick = function(){
        let listPromise = new Promise(resolve=>{
            $.ajax({
                url: domain + '/test/groupby',
                data:{group : groupname},
                methods: 'POST',
                success:(result)=>{
                    resolve(result);
                }
            })
        });
        listPromise.then(result=>{
            // 分组并渲染
        });
    }
}

//分组并渲染
function classify(result){
    let origin = result;
    result = JSON.parse(result);
    let stuArr = str2Arr(result.data);
    let isRead = document.getElementById('isread'),
    rounds = document.getElementById('rounds'),
    ispass = document.getElementById('ispass');
    let objStu = [];

    // 根据条件渲染
    if(isRead.value == 0 && rounds == 0 && ispass == 0 ){
        addToTable(origin);
    }else if(isRead.value != 0 && rounds == 0 && ispass == 0){
        for(let i=0;i<stuArr.length;i++){
            let stu = JSON.parse(stuArr[i])
            if(stu.isRead == isRead.value){
                objStu.push(stuArr[i]);
            }
        }
    }else if(isRead.value == 0 && rounds != 0 && ispass == 0){
        for(let i=0;i<stuArr.length;i++){
            let stu = JSON.parse(stuArr[i])
            if(stu.type == rounds.value){
                objStu.push(stuArr[i]);
            }
        }
    }
    // }else if(isRead.value == 0 && rounds == 0 && ispass != 0){
        
    // }else if(isRead.value != 0 && rounds != 0 && ispass == 0){
        
    // }else if(isRead.value != 0 && rounds == 0 && ispass != 0){
        
    // }else if(isRead.value == 0 && rounds != 0 && ispass != 0){
        
    // }else if(isRead.value != 0 && rounds != 0 && ispass != 0){
        
    // }


}