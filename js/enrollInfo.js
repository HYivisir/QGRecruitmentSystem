window.onload = function () {
    // 检验是否登录
    isLogined();
    tagTab();
    // 录入新的学生信息
    addStu();
    // 获取学生列表
    getStuList();
    //搜索
    searchStu();
    //筛选
    classifyGroup();
    // 页面跳转
    toPage()
    // 批量导出
    outputStu()
    catchLi();
    // 表单验证
    let addItems = document.getElementsByClassName('opt-form-adds');
    checkBlur(addItems);
    let editItems = document.getElementsByClassName('opt-form-edit');
    checkBlur(editItems);
    // 退出功能
    document.getElementById('header-exit').onclick = function(){
        exit();
    }

    // 弹窗
    let pane = document.getElementById('alert-info');
    let closeBtn = document.getElementsByClassName('close-btn');
    closeBtn[0].onclick = function(){
        pane.classList.add('hide');
    }
    closeBtn[1].onclick = function(){
        pane.classList.add('hide');
    }
}
// 标签切换
function tab(target) {
    var tabs = document.getElementsByClassName('opt-tabs');
    var panes = document.getElementsByClassName('opt-pane');
    var tabsArr = [];
    for (var i = 0; i < tabs.length; i++) {
        tabsArr.push(tabs[i]);
    }

    var index = tabsArr.indexOf(target);
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('opt-active');
        panes[i].classList.remove('in');
    }
    target.classList.add('opt-active');
    panes[index].classList.add('in');
}


// 标签页切换
function tagTab() {

    var optTabs = document.getElementsByClassName('opt-tabs');
    var optPanes = document.getElementsByClassName('opt-pane');
    optTabs[0].onclick = function () {
        tab(this);
        optTabs[1].classList.add('hide');
        optTabs[2].classList.add('hide');
        optTabs[3].classList.add('hide');
        optPanes[0].classList.remove('hide');
        optPanes[1].classList.add('hide');
        optPanes[2].classList.add('hide');
        optPanes[3].classList.add('hide');
    }
    optTabs[1].onclick = function () {
        tab(this);
        optTabs[1].classList.remove('hide');
        optTabs[2].classList.add('hide');
        optTabs[3].classList.add('hide');
        optPanes[0].classList.add('hide');
        optPanes[1].classList.remove('hide');
        optPanes[2].classList.add('hide');
        optPanes[3].classList.add('hide');
    }
    optTabs[2].onclick = function () {
        tab(this);
        optTabs[1].classList.add('hide');
        optTabs[2].classList.remove('hide');
        optTabs[3].classList.add('hide');
        optPanes[0].classList.add('hide');
        optPanes[1].classList.add('hide');
        optPanes[2].classList.remove('hide');
        optPanes[3].classList.add('hide');
    }
    optTabs[3].onclick = function () {
        tab(this);
        optTabs[1].classList.add('hide');
        optTabs[2].classList.add('hide');
        optTabs[3].classList.remove('hide');
        optPanes[0].classList.add('hide');
        optPanes[1].classList.add('hide');
        optPanes[2].classList.add('hide');
        optPanes[3].classList.remove('hide');
    }

    let addStuBtn = document.getElementById('opt-add-stu');
    addStuBtn.onclick = function () {
        tab(optTabs[2]);
        optPanes[0].classList.add('hide');
        optPanes[1].classList.add('hide');
        optPanes[2].classList.remove('hide');
        optPanes[3].classList.add('hide');
        optTabs[1].classList.add('hide');
        optTabs[2].classList.remove('hide');
        optTabs[3].classList.add('hide');
    }
}

//请求学生列表
function getStuList() {
    let listPromise = new Promise(resolve => {
        $.ajax({
            url: domain + '/stu/list',
            xhrFields: {
                withCredentials: true // 发送Ajax时，Request header中会带上 Cookie 信息。
            },
            headers: {
                'QGer': 'I am a QGer',
            },
            methods: 'POST',
            success: (result) => {
                resolve(result);
            },
            error: (xhr, status, thrown) => {
                if (xhr.status == 404) {
                    location.assign('../error/404.html');
                } else {
                    location.assign('../error/500.html');
                }
            }
        })
    });
    listPromise.then(result => {
        AddToList(result);
    });
}


//新增学生信息
function addStu() {
    var submitBtn = document.getElementById('opt-add-submit');
    submitBtn.onclick = function () {
        let addItems = document.getElementsByClassName('opt-form-adds');
        // 校验表单
        let agepass = checkRange(addItems[1],15,25),
            theorypass = checkRange(addItems[16],0,100),
            experimentpass = checkRange(addItems[2],0,100),
            englishpass = checkRange(addItems[5],0,100),
            pointpass = checkRange(addItems[8],0,5.0),
            emailpass = checkEmail(addItems[11]),
            rankpass = checkRange(addItems[7],0,20000),
            phonepass = checkLength(addItems[14],11),
            stunumpass = checkLength(addItems[15],10);
        for(var i=0;i<18;i++){
            isNull(addItems[i])
        }
            
        for(let i=0;i<18;i++){
            if(!isNull(addItems[i])){
                return false;
            }
        }    
        if(agepass && theorypass && experimentpass && englishpass && pointpass && emailpass && rankpass && phonepass && stunumpass)
        {   
            //成功
        } else {
            window.scrollTo(0, 0)
            return;
        }

        let addData = {
            "name": addItems[0].value,
            "gender": addItems[3].value,
            "age": addItems[1].value,
            "dormitory": addItems[4].value,
            "classRank": addItems[7].value,
            "grade": addItems[9].value,
            "majorClass": addItems[12].value,
            "duty": addItems[10].value,
            "isFailed": addItems[13].value,
            "Ctheory": addItems[16].value,
            "Cexperiment": addItems[2].value,
            "english": addItems[5].value,
            "gradePoint": addItems[8].value,
            "explanation": addItems[18].value,
            "email": addItems[11].value,
            "phoneNum": addItems[14].value,
            "qq": addItems[17].value,
            "experience": addItems[22].value,
            "selfEvaluation": addItems[23].value,
            "exampleThing": addItems[24].value,
            "reasonForQg": addItems[25].value,
            "groupId": addItems[6].value,
            "isTeam": addItems[19].value,
            "studentNum": addItems[15].value,
            "hobby": addItems[20].value,
            "motto": addItems[21].value
        }
        let promise = new Promise(resolve => {
            $.ajax({
                url: domain + '/stu/save',
                data: addData,
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    'QGer': 'I am a QGer'
                },
                methods: 'POST',
                contentType: 'application/json',
                success: (result) => {
                    resolve(result);
                },
                error: (xhr, status, thrown) => {
                    if (xhr.status == 404) {
                        location.assign('../error/404.html');
                    } else {
                        location.assign('../error/500.html');
                    }
                }
            })
        });

        promise.then(result => {
            result = JSON.parse(result);
            if (result.status == true) {
                // alert(result.message);
                location.reload(false)
            } else {
                alert(result.message + "请确定无漏填的值再重试！");
            }
        });

        this.disabled = true;

    }
}

// 请求详细信息
function toDetail(stunum) {
    let detailPromise = new Promise(resolve => {
        $.ajax({
            url: domain + '/stu/select',
            data: { studentNum: stunum },
            xhrFields: {
                withCredentials: true
            },
            headers: {
                'QGer': 'I am a QGer'
            },
            methods: 'POST',
            success: function (result) {
                resolve(result);
            },
            error: (xhr, status, thrown) => {
                if (xhr.status == 404) {
                    location.assign('../error/404.html');
                } else {
                    location.assign('../error/500.html');
                }
            }
        })
    });

    detailPromise.then(result => {
        result = JSON.parse(result)
        if (result.status == true) {
            // 跳转到详细页面
            var optTabs = document.getElementsByClassName('opt-tabs');
            var optPanes = document.getElementsByClassName('opt-pane');
            tab(optTabs[1]);
            optTabs[1].classList.remove('hide');
            optTabs[2].classList.add('hide');
            optTabs[3].classList.add('hide');
            optPanes[0].classList.add('hide');
            optPanes[1].classList.remove('hide');
            optPanes[2].classList.add('hide');
            optPanes[3].classList.add('hide');

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

        } else {
            alert('请求详细信息失败！')
        }
    })


}

// 跳转修改信息页面
function toEdit(stunum) {

    // 回写数据
    let detailPromise = new Promise(resolve => {
        $.ajax({
            url: domain + '/stu/select',
            data: { studentNum: stunum },
            xhrFields: {
                withCredentials: true
            },
            headers: {
                'QGer': 'I am a QGer'
            },
            methods: 'POST',
            success: function (result) {
                resolve(result);
            },
            error: (xhr, status, thrown) => {
                if (xhr.status == 404) {
                    location.assign('../error/404.html');
                } else {
                    location.assign('../error/500.html');
                }
            }
        })
    });

    detailPromise.then(result => {
        result = JSON.parse(result)
        if (result.status == true) {
            // 跳转到修改页面
            var optTabs = document.getElementsByClassName('opt-tabs');
            var optPanes = document.getElementsByClassName('opt-pane');
            tab(optTabs[3]);
            optTabs[1].classList.add('hide');
            optTabs[2].classList.add('hide');
            optTabs[3].classList.remove('hide');
            optPanes[0].classList.add('hide');
            optPanes[1].classList.add('hide');
            optPanes[2].classList.add('hide');
            optPanes[3].classList.remove('hide');

            let details = document.getElementsByClassName('opt-form-edit');
            let stuobj = JSON.parse(result.data);

            details[0].value = stuobj.name;
            details[1].value = stuobj.age;
            details[2].value = stuobj.cexperiment;
            details[3].value = stuobj.gender;
            details[4].value = stuobj.dormitory;
            details[5].value = stuobj.english;
            details[6].value = stuobj.groupId;
            details[7].value = stuobj.classRank;
            details[8].value = stuobj.gradePoint;
            details[9].value = stuobj.grade;
            details[10].value = stuobj.duty;
            details[11].value = stuobj.email;
            details[12].value = stuobj.majorClass;
            details[13].value = stuobj.isFailed;
            details[14].value = stuobj.phoneNum;
            details[15].value = stuobj.studentNum;
            details[16].value = stuobj.ctheory;
            details[17].value = stuobj.qq;
            details[18].value = stuobj.explanation;
            details[19].value = stuobj.isTeam;
            details[20].value = stuobj.hobby;
            details[21].value = stuobj.motto;
            details[22].value = stuobj.experience;
            details[23].value = stuobj.selfEvaluation;
            details[24].value = stuobj.exampleThing;
            details[25].value = stuobj.reasonForQg;

        } else {
            alert('请求详细信息失败！')
        }
    })


    // 修改信息
    editStu();
}

// 修改信息
function editStu() {
    var editBtn = document.getElementById('opt-edit-submit');
    editBtn.onclick = function () {
        let addItems = document.getElementsByClassName('opt-form-edit');
        // 校验表单
        let agepass = checkRange(addItems[1],15,25),
            theorypass = checkRange(addItems[16],0,100),
            experimentpass = checkRange(addItems[2],0,100),
            englishpass = checkRange(addItems[5],0,100),
            pointpass = checkRange(addItems[8],0,5.0),
            emailpass = checkEmail(addItems[11]),
            rankpass = checkRange(addItems[7],0,20000),
            phonepass = checkLength(addItems[14],11),
            stunumpass = checkLength(addItems[15],10);
        for(var i=0;i<18;i++){
            isNull(addItems[i])
        }
        
        for(let i=0;i<18;i++){
            if(!isNull(addItems[i])){
                return false;
            }
        }    

        
        if(agepass && theorypass && experimentpass && englishpass && pointpass && emailpass && rankpass && phonepass && stunumpass)
        {   
            //成功
        } else {
            window.scrollTo(0, 0)
            return;
        }
        let addData = {
            "name": addItems[0].value,
            "gender": addItems[3].value,
            "age": addItems[1].value,
            "dormitory": addItems[4].value,
            "classRank": addItems[7].value,
            "grade": addItems[9].value,
            "majorClass": addItems[12].value,
            "duty": addItems[10].value,
            "isFailed": addItems[13].value,
            "Ctheory": addItems[16].value,
            "Cexperiment": addItems[2].value,
            "english": addItems[5].value,
            "gradePoint": addItems[8].value,
            "explanation": addItems[18].value,
            "email": addItems[11].value,
            "phoneNum": addItems[14].value,
            "qq": addItems[17].value,
            "experience": addItems[22].value,
            "selfEvaluation": addItems[23].value,
            "exampleThing": addItems[24].value,
            "reasonForQg": addItems[25].value,
            "groupId": addItems[6].value,
            "isTeam": addItems[19].value,
            "studentNum": addItems[15].value,
            "hobby": addItems[20].value,
            "motto": addItems[21].value
        }
        let promise = new Promise(resolve => {
            $.ajax({
                url: domain + '/stu/update',
                data: addData,
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    'QGer': 'I am a QGer'
                },
                methods: 'POST',
                contentType: 'application/json',
                success: (result) => {
                    resolve(result);
                },
                error: (xhr, status, thrown) => {
                    if (xhr.status == 404) {
                        location.assign('../error/404.html');
                    } else {
                        location.assign('../error/500.html');
                    }
                }
            })
        });

        promise.then(result => {
            result = JSON.parse(result);
            if (result.status == true) {
                // alert(result.message);
                location.reload(false)
            } else {
                alert(result.message + "请确定无漏填的值再重试！");
            }
        });

        this.disabled = true;

    }
}

// 根据学号删除学生
function delStu(stuNum) {
    $.ajax({
        url: domain + '/stu/remove',
        methods: 'POST',
        xhrFields: {
            withCredentials: true
        },
        headers: {
            'QGer': 'I am a QGer'
        },
        data: { studentNum: stuNum },
        success: function (res) {
            res = JSON.parse(res);
            if (res.status == true) {
                location.reload();
            } else {
                alert('删除失败，请刷新后重试！');
            }
        },
        error: (xhr, status, thrown) => {
            if (xhr.status == 404) {
                location.assign('../error/404.html');
            } else {
                location.assign('../error/500.html');
            }
        }
    })
}

//搜索学生
function searchStu() {
    let searchBtn = document.getElementById('opt-s-btn');
    searchBtn.onclick = function () {
        let searchInput = document.getElementById('opt-input');
        let stus = document.getElementsByClassName('opt-table-tr');
        let optTable = document.getElementById('opt-table-info')
        while (stus.length != 0) {
            optTable.removeChild(stus[0]);
        }

        if (searchInput.value == '' || searchInput.value == null) {
            getStuList();
        } else {
            let getPromise = new Promise(resolve => {
                $.ajax({
                    url: domain + '/stu/condition',
                    data: { condition: searchInput.value },
                    xhrFields: {
                        withCredentials: true
                    },
                    methods: 'POST',
                    success: function (result) {
                        resolve(result);
                    },
                    error: (xhr, status, thrown) => {
                        if (xhr.status == 404) {
                            location.assign('../error/404.html');
                        } else {
                            location.assign('../error/500.html');
                        }
                    }
                })
            });

            getPromise.then(result => {
                AddToList(result);
            })
        }
    }
}

//筛选组别
function classifyGroup() {
    let csfBtn = document.getElementById('opt-select-group');
    csfBtn.onchange = function () {
        let stus = document.getElementsByClassName('opt-table-tr');
        let optTable = document.getElementById('opt-table-info')
        while (stus.length != 0) {
            optTable.removeChild(stus[0]);
        }
        let group = csfBtn.value;
        let groupPromise = new Promise(resolve => {
            $.ajax({
                url: domain + '/stu/condition',
                methods: 'POST',
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    'QGer': 'I am a QGer'
                },
                data: { condition: group },
                success: function (result) {
                    resolve(result);
                },
                error: (xhr, status, thrown) => {
                    if (xhr.status == 404) {
                        location.assign('../error/404.html');
                    } else {
                        location.assign('../error/500.html');
                    }
                }
            })
        });

        groupPromise.then(result => {
            AddToList(result);
        })
    }
}


// 将获取的学生添加至列表
function AddToList(result) {
    result = JSON.parse(result);
    // console.log(res);
    if (result.status) {
        let Tfragment = document.createDocumentFragment();
        let table = document.getElementById('opt-table-info');
        let stuArr = str2Arr(result.data);
        for (let i = 0; i < stuArr.length; i++) {
            let fragment = document.createDocumentFragment();
            let tr = document.createElement('tr');
            let tdInput = document.createElement('td');
            let check = document.createElement('input');
            check.type = 'checkbox';
            check.classList.add('choose');
            let tdName = document.createElement('td'),
                tdClass = document.createElement('td'),
                tdNum = document.createElement('td'),
                tdGroup = document.createElement('td'),
                tdPhone = document.createElement('td'),
                tdQQ = document.createElement('td'),
                tdInfo = document.createElement('td'),
                tdEdit = document.createElement('td'),
                tdDel = document.createElement('td');
            tdName.innerText = JSON.parse(stuArr[i]).name;
            tdClass.innerText = JSON.parse(stuArr[i]).majorClass;
            tdNum.innerText = JSON.parse(stuArr[i]).studentNum;
            tdGroup.innerText = JSON.parse(stuArr[i]).group;
            tdPhone.innerText = JSON.parse(stuArr[i]).phoneNum;
            tdQQ.innerText = JSON.parse(stuArr[i]).qq;
            tdInfo.innerHTML = `
            <div class="detail-svg">
                <svg t="1596162887434" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2093">
                    <path d="M734.7 862H289.3c-49.6 0-90-40.4-90-90V252c0-49.6 40.4-90 90-90h445.4c49.6 0 90 40.4 90 90v520c0 49.6-40.4 90-90 90zM289.3 222c-16.5 0-30 13.5-30 30v520c0 16.5 13.5 30 30 30h445.4c16.5 0 30-13.5 30-30V252c0-16.5-13.5-30-30-30H289.3z" p-id="2094"></path>
                    <path d="M706 373H314c-16.6 0-30-13.4-30-30s13.4-30 30-30h392c16.6 0 30 13.4 30 30s-13.4 30-30 30zM706 500H314c-16.6 0-30-13.4-30-30s13.4-30 30-30h392c16.6 0 30 13.4 30 30s-13.4 30-30 30zM547 629H314c-16.6 0-30-13.4-30-30s13.4-30 30-30h233c16.6 0 30 13.4 30 30s-13.4 30-30 30z" p-id="2095"></path>
                </svg>
            </div>
            `;
            tdEdit.innerHTML = `
            <div class="detail-svg">
            <svg t="1596265341305" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5295" width="16" height="16"><path d="M457.117144 914.291885m22.307317 0l522.210626 0q22.307317 0 22.307316 22.307317l0 65.093481q0 22.307317-22.307316 22.307317l-522.210626 0q-22.307317 0-22.307317-22.307317l0-65.093481q0-22.307317 22.307317-22.307317Z" p-id="5296"></path><path d="M639.964002 712.063261m22.307317 0l339.363768 0q22.307317 0 22.307316 22.307316l0 65.093482q0 22.307317-22.307316 22.307316l-339.363768 0q-22.307317 0-22.307317-22.307316l0-65.093482q0-22.307317 22.307317-22.307316Z" p-id="5297"></path><path d="M0 872.419955V987.430628a36.569372 36.569372 0 0 0 36.569372 36.569372h114.827826a73.138743 73.138743 0 0 0 51.562814-21.941623l535.92414-535.92414a73.138743 73.138743 0 0 0 0-103.491321l-77.527068-77.527068a73.138743 73.138743 0 0 0-103.491321 0L21.941623 821.039988A73.138743 73.138743 0 0 0 0 872.419955zM925.022253 21.450679l77.527068 77.527068a73.138743 73.138743 0 0 1 0 103.491321l-79.355536 79.355537a73.138743 73.138743 0 0 1-103.308475 0l-77.709915-77.709915a73.138743 73.138743 0 0 1 0-103.308475l79.355537-79.355536a73.138743 73.138743 0 0 1 103.491321 0z" p-id="5298"></path></svg>
            </div>
            `;

            tdDel.innerHTML = `
            <div class="detail-svg">
                <svg t="1596164421670" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3143"><path d="M416 384c-19.2 0-32 12.8-32 32v320c0 19.2 12.8 32 32 32s32-12.8 32-32v-320c0-19.2-12.8-32-32-32z" p-id="3144"></path><path d="M928 192h-224v-32c0-54.4-41.6-96-96-96h-192c-54.4 0-96 41.6-96 96v32h-224c-19.2 0-32 12.8-32 32s12.8 32 32 32h64v608c0 54.4 41.6 96 96 96h512c54.4 0 96-41.6 96-96v-608h64c19.2 0 32-12.8 32-32s-12.8-32-32-32z m-544-32c0-19.2 12.8-32 32-32h192c19.2 0 32 12.8 32 32v32h-256v-32z m416 704c0 19.2-12.8 32-32 32h-512c-19.2 0-32-12.8-32-32v-608h576v608z" p-id="3145"></path><path d="M608 384c-19.2 0-32 12.8-32 32v320c0 19.2 12.8 32 32 32s32-12.8 32-32v-320c0-19.2-12.8-32-32-32z" p-id="3146"></path></svg>
            </div>
            `
            tdNum.classList.add('ch-num')

            // 把学号保存在属性里
            tdInfo.setAttribute('stunum', JSON.parse(stuArr[i]).studentNum);
            tdEdit.setAttribute('stunum', JSON.parse(stuArr[i]).studentNum);
            tdDel.setAttribute('stunum', JSON.parse(stuArr[i]).studentNum);
            tdInfo.classList.add('pointer');
            tdDel.classList.add('pointer');
            tdDel.classList.add('pointer');
            tdInfo.onclick = function (event) {
                event.stopPropagation();
                //获取详细信息
                toDetail(this.getAttribute('stunum'));
            };

            tdEdit.onclick = function (event) {
                event.stopPropagation();
                // 前往修改页面
                toEdit(this.getAttribute('stunum'));
            }

            tdDel.onclick = function (event) {
                event.stopPropagation();
                if (confirm("确定删除该学生吗？")) {
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
            fragment.appendChild(tdEdit);
            fragment.appendChild(tdDel);


            tr.appendChild(fragment);
            tr.classList.add('opt-table-tr');
            Tfragment.appendChild(tr);
        }
        table.appendChild(Tfragment)

        // 分页渲染
        diviPage(stuArr);
        addPageChange()

        // 全选事件
        selectAllByPage();
        clickTrClicked();

    } else {
        alert('无查询结果！');
        getStuList();
    }


}



// 当前页面
var nowPage = 1;

// 分页显示
function diviPage(stuArr) {
    // 页数
    let totalPage = Math.ceil(stuArr.length / 15);
    // 往ul中添加页码
    let ul = document.getElementById('opt-page-ul');
    let pages = '';
    for (let i = 1; i <= totalPage; i++) {
        pages += `<li class="opt-page-tab pointer" >${i}</li>`;
    }
    ul.innerHTML = pages;
    appearPage(nowPage);
}

// 根据页码显示
function appearPage(page) {
    let tbody = document.getElementById("opt-table-info");
    let pages = document.getElementById("opt-page-ul");
    let myTr = tbody.getElementsByTagName("tr");
    document.querySelector('.select-all').checked = false;
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
    if (pageLi[nowPage - 1])
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
function toPage() {
    let thepage = document.getElementById('opt-topage');
    setTimeout(function () {
        let pages = document.getElementsByClassName('opt-page-tab');
        let maxpage = pages.length;
        thepage.onkeypress = function (event) {
            if (event.keyCode == 13) {
                let num = parseInt(thepage.value)
                if (num > 0 && num <= maxpage) {
                    appearPage(num);
                } else {
                    appearPage(pages.length);
                }
            }
        }
    }, 4000)
}


/* 当前页面全选 */
function selectAllByPage() {
    let selectAll = document.querySelector('.select-all');
    let choose = document.getElementsByClassName('choose');

    selectAll.onclick = function () {
        if (!this.checked) {
            for (let i = (nowPage - 1) * 15; i < choose.length && i < (nowPage - 1) * 15 + 15; i++) {
                choose[i].checked = false;
            }
        } else {
            for (let i = (nowPage - 1) * 15; i < choose.length && i < (nowPage - 1) * 15 + 15; i++) {
                choose[i].checked = true;
            }
        }
    }
}

// 导出学生信息
function outputStu() {
    let outBtn = document.getElementById('opt-output');
    outBtn.onclick = function () {
        if (getSelect()) {
            window.open(domain + '/stu/export?studentNumSerial=' + getSelect());
        } else {
            alert('请选择需要导出的学生');
        }

    }
}

/* 获取所有的选中框对应的人的学号，返回xxx-xxx字符串 */
function getSelect() {
    let all = document.querySelectorAll(".choose");
    let allStudentNum = document.querySelectorAll(".ch-num");
    let str = "";
    for (let i = 0; i < all.length; i++) {
        if (all[i].checked) {
            str += (allStudentNum[i].innerHTML + "-");
        }
    }
    return str.substring(0, str.length - 1);
}

// 校验范围
function checkRange(course, min, max) {
    if (course.value > max || course.value < min) {
        course.style.color = 'red'
        return false;
    } else {
        course.style.color = 'black';
        return true;
    }
}

// 校验邮箱
function checkEmail(email) {
    if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email.value)) {
        email.style.color = 'red';
        return false;
    } else {
        email.style.color = 'black';
        return true;
    }
}


// 校验必填字段
function isNull(obj){
    if(obj.value == '' || obj.value == null || obj.value == undefined){
        obj.classList.add('alert-input');
        let pane = document.getElementById('alert-info');
        pane.classList.remove('hide');
        return false;
    }
    obj.classList.remove('alert-input');
    return true;
}


// 校验学号和电话号码长度
function checkLength(obj,maxLength){
    if (obj.value.length < maxLength) {
        obj.style.color = 'red'
        return false;
    } else {
        obj.style.color = 'black';
        return true;
    }
}

// 选框过滤
function checkBlur(obj){
    obj[1].addEventListener('blur',function(){
        checkRange(obj[1],15,25)
    });
    obj[16].addEventListener('blur',function(){
        checkRange(obj[16],0,100)
    });
    obj[2].addEventListener('blur',function(){
        checkRange(obj[2],0,100)
    });
    obj[5].addEventListener('blur',function(){
        checkRange(obj[5],0,100)
    });
    obj[8].addEventListener('blur',function(){
        checkRange(obj[8],0,5.0)
    });
    obj[11].addEventListener('blur',function(){
        checkEmail(obj[11])
    });
    obj[7].addEventListener('blur',function(){
        checkRange(obj[7],0,20000)
    });
    obj[14].addEventListener('blur',function(){
        checkLength(obj[14],11)
    });
    obj[15].addEventListener('blur',function(){
        checkLength(obj[15],10);
    });

    for(var i=0;i<18;i++){
        obj[i].addEventListener('blur',(ev)=>{
            isNullWithout(ev.target);
        })
    }

}

// 无提示的检测
function isNullWithout(obj){
    if(obj.value == '' || obj.value == null || obj.value == undefined){
        obj.classList.add('alert-input');
        return false;
    }
    obj.classList.remove('alert-input');
    return true;
}