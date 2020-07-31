window.onload = function(){
    tagTab();
    // 录入新的学生信息
    addStu();
    // 获取学生列表
    getStuList();
    // 全选功能
    selectAll();
    //搜索
    searchStu();
}

// 标签页切换
function tagTab(){

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
    
    
        var addStuBtn = document.getElementById('opt-add-stu');
        addStuBtn.onclick = function(){
            tab(optTabs[2]);
            optPanes[0].style.display = 'none';
            optPanes[1].style.display = 'none';
            optPanes[2].style.display = 'flex'
        }
}

//请求学生列表
function getStuList(){
    let listPromise = new Promise(resolve=>{
        $.ajax({
            url: domain + '/stu/list',
            methods: 'POST',
            success:(result)=>{
                resolve(result);
            }
        })
    });
    listPromise.then(result=>{
        result = JSON.parse(result);
        let Tfragment = document.createDocumentFragment();
        let table = document.getElementById('opt-table-info');
        let stuArr = str2Arr(result.data);
        for(let i=0;i<stuArr.length;i++){
            let fragment = document.createDocumentFragment();
            let tr = document.createElement('tr');
            let tdInput = document.createElement('td');
            let check = document.createElement('input');
            check.type = 'checkbox';
            check.classList.add('choose');
            let tdName  = document.createElement('td'),
                tdClass = document.createElement('td'),
                tdNum   = document.createElement('td'),
                tdGroup = document.createElement('td'),
                tdPhone = document.createElement('td'),
                tdQQ    = document.createElement('td'),
                tdInfo  = document.createElement('td'),
                tdDel   = document.createElement('td');
            tdName .innerText = JSON.parse(stuArr[i]).name;
            tdClass.innerText = JSON.parse(stuArr[i]).majorClass;
            tdNum  .innerText = JSON.parse(stuArr[i]).studentNum;
            tdGroup.innerText = JSON.parse(stuArr[i]).group;
            tdPhone.innerText = JSON.parse(stuArr[i]).phoneNum;
            tdQQ   .innerText = JSON.parse(stuArr[i]).qq;
            tdInfo .innerHTML = `
            <div class="detail-svg">
                <svg t="1596162887434" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2093">
                    <path d="M734.7 862H289.3c-49.6 0-90-40.4-90-90V252c0-49.6 40.4-90 90-90h445.4c49.6 0 90 40.4 90 90v520c0 49.6-40.4 90-90 90zM289.3 222c-16.5 0-30 13.5-30 30v520c0 16.5 13.5 30 30 30h445.4c16.5 0 30-13.5 30-30V252c0-16.5-13.5-30-30-30H289.3z" p-id="2094"></path>
                    <path d="M706 373H314c-16.6 0-30-13.4-30-30s13.4-30 30-30h392c16.6 0 30 13.4 30 30s-13.4 30-30 30zM706 500H314c-16.6 0-30-13.4-30-30s13.4-30 30-30h392c16.6 0 30 13.4 30 30s-13.4 30-30 30zM547 629H314c-16.6 0-30-13.4-30-30s13.4-30 30-30h233c16.6 0 30 13.4 30 30s-13.4 30-30 30z" p-id="2095"></path>
                </svg>
            </div>
            `;

            tdDel  .innerHTML = `
            <div class="detail-svg">
            <svg t="1596164421670" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3143"><path d="M416 384c-19.2 0-32 12.8-32 32v320c0 19.2 12.8 32 32 32s32-12.8 32-32v-320c0-19.2-12.8-32-32-32z" p-id="3144"></path><path d="M928 192h-224v-32c0-54.4-41.6-96-96-96h-192c-54.4 0-96 41.6-96 96v32h-224c-19.2 0-32 12.8-32 32s12.8 32 32 32h64v608c0 54.4 41.6 96 96 96h512c54.4 0 96-41.6 96-96v-608h64c19.2 0 32-12.8 32-32s-12.8-32-32-32z m-544-32c0-19.2 12.8-32 32-32h192c19.2 0 32 12.8 32 32v32h-256v-32z m416 704c0 19.2-12.8 32-32 32h-512c-19.2 0-32-12.8-32-32v-608h576v608z" p-id="3145"></path><path d="M608 384c-19.2 0-32 12.8-32 32v320c0 19.2 12.8 32 32 32s32-12.8 32-32v-320c0-19.2-12.8-32-32-32z" p-id="3146"></path></svg>
            </div>
            `

            // 把学号保存在tdInfo和tdDel的属性里
            tdInfo.setAttribute('stunum',JSON.parse(stuArr[i]).studentNum);
            tdDel.setAttribute('stunum',JSON.parse(stuArr[i]).studentNum);
            tdInfo.classList.add('pointer');
            tdDel.classList.add('pointer');
            tdInfo.onclick = function(){
                //获取详细信息
                toDetail(this.getAttribute('stunum'));
            }

            tdDel.onclick = function(){
                if(confirm("确定删除该学生吗？")){
                    delStu(this.getAttribute('stunum'));
                }
            }
            // 添加到tr
            tdInput.appendChild(check);
            fragment.appendChild(tdInput);
            fragment.appendChild(tdName);
            fragment.appendChild(tdClass);
            fragment.appendChild(tdNum)
            fragment.appendChild(tdGroup);
            fragment.appendChild(tdPhone);
            fragment.appendChild(tdQQ);
            fragment.appendChild(tdInfo);
            fragment.appendChild(tdDel);

           
            tr.appendChild(fragment);
            tr.classList.add('opt-table-tr');
            Tfragment.appendChild(tr);
        }
        table.appendChild(Tfragment)
    });
}


//新增学生信息
function addStu(){
    var submitBtn = document.getElementById('opt-add-submit');
    submitBtn.onclick = function(){
        let addItems = document.getElementsByClassName('opt-form-adds');

        let addData = {
            "name" : addItems[0].value,
            "gender" : addItems[3].value,
            "age" : addItems[1].value,
            "dormitory" : addItems[4].value,
            "classRank" : addItems[7].value,
            "grade" : addItems[9].value,
            "majorClass" : addItems[12].value,
            "duty" : addItems[10].value,
            "isFailed" : addItems[13].value,
            "Ctheory" : addItems[16].value,
            "Cexperiment" : addItems[2].value,
            "english" : addItems[5].value,
            "gradePoint" : addItems[8].value,
            "explanation" : addItems[18].value,
            "email" : addItems[11].value,
            "phoneNum" : addItems[14].value,
            "qq": addItems[17].value,
            "experience" : addItems[22].value,
            "selfEvaluation" : addItems[23].value,
            "exampleThing" : addItems[24].value,
            "reasonForQg" : addItems[25].value,
            "groupId" : addItems[6].value,
            "isTeam": addItems[19].value,
            "studentNum" : addItems[15].value,
            "hobby" : addItems[20].value,
            "motto" : addItems[21].value
        }
        let promise = new Promise(resolve=>{
            $.ajax({
                url: domain + '/stu/save',
                data: addData,
                methods: 'POST',
                contentType: 'application/json',
                success: (result)=>{
                    resolve(result);
                }
            })
        });

        promise.then(result=>{
            result = JSON.parse(result);
            if(result.status == true){
                alert(result.message);
                location.reload(false)
            }else{
                alert(result.message + "请确定无漏填的值再重试！");
            }
        });

        this.disabled = true;
        
    }
}

// 请求详细信息
function toDetail(stunum){
    let detailPromise = new Promise(resolve=>{
        $.ajax({
            url: domain + '/stu/select',
            data: {studentNum : stunum},
            methods: 'POST',
            success: function(result){
                resolve(result);
            }
        })
    });

    detailPromise.then(result=>{
        result = JSON.parse(result)
        if(result.status == true){
            // 跳转到详细页面
            var optTabs = document.getElementsByClassName('opt-tabs');
            var optPanes = document.getElementsByClassName('opt-pane');
            tab(optTabs[1]);
            optPanes[0].style.display = 'none';
            optPanes[2].style.display = 'none';
            optPanes[1].style.display = 'flex';

            let details = document.getElementsByClassName('opt-form-detail');
            let stuobj = JSON.parse(result.data);

            details[0].innerText = stuobj.name;
            details[1].innerText = stuobj.age;
            details[2].innerText = stuobj.cexperiment;
            details[3].innerText = stuobj.gender;
            details[4].innerText = stuobj.dormitory;
            details[5].innerText = stuobj.english;
            details[6].innerText = stuobj.group;
            details[7].innerText = stuobj.classRank;
            details[8].innerText = stuobj.gradePoint;
            details[9].innerText = stuobj.grade;
            details[10].innerText = stuobj.duty;
            details[11].innerText = stuobj.email;
            details[12].innerText = stuobj.majorClass;
            details[13].innerText = stuobj.isFailed;
            details[14].innerText = stuobj.phoneNum;
            details[15].innerText = stuobj.studentNum;
            details[16].innerText = stuobj.ctheory;
            details[17].innerText = stuobj.qq;
            details[18].value = stuobj.explanation;
            details[19].value = stuobj.isTeam;
            details[20].value = stuobj.hobby;
            details[21].value = stuobj.motto;
            details[22].value = stuobj.experience;
            details[23].value = stuobj.selfEvaluation;
            details[24].value = stuobj.exampleThing;
            details[25].value = stuobj.reasonForQg;

        }else{
            alert('请求详细信息失败！')
        }
    })

    
}


// 根据学号删除学生
function delStu(stuNum){
    $.ajax({
        url: domain + '/stu/remove',
        methods: 'POST',
        data: {studentNum : stuNum},
        success: function(res){
            res = JSON.parse(res);
            if(res.status == true){
                location.reload();
            }else{
                alert('删除失败，请刷新后重试！');
            }
        }
    })
}

//搜索学生
function searchStu(){
    let searchBtn = document.getElementById('opt-s-btn');
    searchBtn.onclick = function(){
        let searchInput = document.getElementById('opt-input');
        let stus = document.getElementsByClassName('opt-table-tr');
        let optTable = document.getElementById('opt-table-info')
        while(stus.length != 0){
            optTable.removeChild(stus[0]);
        }

        if(searchInput.value == '' || searchInput.value == null){
            getStuList();
        }else{
            let getPromise = new Promise(resolve=>{
                $.ajax({
                    url: domain + '/stu/condition',
                    data: {condition : searchInput.value},
                    methods: 'POST',
                    success: function(result){
                        resolve(result);    
                    }
                })
            });

            getPromise.then(result=>{
                result = JSON.parse(result);
                // console.log(res);
                if(result.status){
                    let Tfragment = document.createDocumentFragment();
                    let table = document.getElementById('opt-table-info');
                    let stuArr = str2Arr(result.data);
                    for(let i=0;i<stuArr.length;i++){
                        let fragment = document.createDocumentFragment();
                        let tr = document.createElement('tr');
                        let tdInput = document.createElement('td');
                        let check = document.createElement('input');
                        check.type = 'checkbox';
                        check.classList.add('choose');
                        let tdName  = document.createElement('td'),
                            tdClass = document.createElement('td'),
                            tdNum   = document.createElement('td'),
                            tdGroup = document.createElement('td'),
                            tdPhone = document.createElement('td'),
                            tdQQ    = document.createElement('td'),
                            tdInfo  = document.createElement('td'),
                            tdDel   = document.createElement('td');
                        tdName .innerText = JSON.parse(stuArr[i]).name;
                        tdClass.innerText = JSON.parse(stuArr[i]).majorClass;
                        tdNum  .innerText = JSON.parse(stuArr[i]).studentNum;
                        tdGroup.innerText = JSON.parse(stuArr[i]).group;
                        tdPhone.innerText = JSON.parse(stuArr[i]).phoneNum;
                        tdQQ   .innerText = JSON.parse(stuArr[i]).qq;
                        tdInfo .innerHTML = `
                        <div class="detail-svg">
                            <svg t="1596162887434" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2093">
                                <path d="M734.7 862H289.3c-49.6 0-90-40.4-90-90V252c0-49.6 40.4-90 90-90h445.4c49.6 0 90 40.4 90 90v520c0 49.6-40.4 90-90 90zM289.3 222c-16.5 0-30 13.5-30 30v520c0 16.5 13.5 30 30 30h445.4c16.5 0 30-13.5 30-30V252c0-16.5-13.5-30-30-30H289.3z" p-id="2094"></path>
                                <path d="M706 373H314c-16.6 0-30-13.4-30-30s13.4-30 30-30h392c16.6 0 30 13.4 30 30s-13.4 30-30 30zM706 500H314c-16.6 0-30-13.4-30-30s13.4-30 30-30h392c16.6 0 30 13.4 30 30s-13.4 30-30 30zM547 629H314c-16.6 0-30-13.4-30-30s13.4-30 30-30h233c16.6 0 30 13.4 30 30s-13.4 30-30 30z" p-id="2095"></path>
                            </svg>
                        </div>
                        `;

                        tdDel  .innerHTML = `
                        <div class="detail-svg">
                        <svg t="1596164421670" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3143"><path d="M416 384c-19.2 0-32 12.8-32 32v320c0 19.2 12.8 32 32 32s32-12.8 32-32v-320c0-19.2-12.8-32-32-32z" p-id="3144"></path><path d="M928 192h-224v-32c0-54.4-41.6-96-96-96h-192c-54.4 0-96 41.6-96 96v32h-224c-19.2 0-32 12.8-32 32s12.8 32 32 32h64v608c0 54.4 41.6 96 96 96h512c54.4 0 96-41.6 96-96v-608h64c19.2 0 32-12.8 32-32s-12.8-32-32-32z m-544-32c0-19.2 12.8-32 32-32h192c19.2 0 32 12.8 32 32v32h-256v-32z m416 704c0 19.2-12.8 32-32 32h-512c-19.2 0-32-12.8-32-32v-608h576v608z" p-id="3145"></path><path d="M608 384c-19.2 0-32 12.8-32 32v320c0 19.2 12.8 32 32 32s32-12.8 32-32v-320c0-19.2-12.8-32-32-32z" p-id="3146"></path></svg>
                        </div>
                        `

                        // 把学号保存在tdInfo和tdDel的属性里
                        tdInfo.setAttribute('stunum',JSON.parse(stuArr[i]).studentNum);
                        tdDel.setAttribute('stunum',JSON.parse(stuArr[i]).studentNum);
                        tdInfo.classList.add('pointer');
                        tdDel.classList.add('pointer');
                        tdInfo.onclick = function(){
                            //获取详细信息
                            toDetail(this.getAttribute('stunum'));
                        }

                        tdDel.onclick = function(){
                            if(confirm("确定删除该学生吗？")){
                                delStu(this.getAttribute('stunum'));
                            }
                        }
                        // 添加到tr
                        tdInput.appendChild(check);
                        fragment.appendChild(tdInput);
                        fragment.appendChild(tdName);
                        fragment.appendChild(tdClass);
                        fragment.appendChild(tdNum)
                        fragment.appendChild(tdGroup);
                        fragment.appendChild(tdPhone);
                        fragment.appendChild(tdQQ);
                        fragment.appendChild(tdInfo);
                        fragment.appendChild(tdDel);

                    
                        tr.appendChild(fragment);
                        tr.classList.add('opt-table-tr');
                        Tfragment.appendChild(tr);
                    }
                    table.appendChild(Tfragment)
                    
                }else{
                    alert('无查询结果！');
                    getStuList();
                }
            })
        }
    }
}

//筛选组别
// function classifyGroup(){
//     let csfBtn = document.getElementById('opt-select-group');
//     csfBtn.onchange = function(){
//         let group = csfBtn.value;
//         let groupPromise = new Promise(resolve=>{
//             $.ajax({
//                 url: domain + ''
//             })
//         })
//     }
// }