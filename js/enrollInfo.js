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


    var addStuBtn = document.getElementById('opt-add-stu');
    addStuBtn.onclick = function(){
        tab(optTabs[2]);
        optPanes[0].style.display = 'none';
        optPanes[1].style.display = 'none';
        optPanes[2].style.display = 'flex'
    }


    // 录入新的学生信息

    // 添加信息
    

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
            "isTeamed": addItems[19].value,
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
        })
    }


    // 获取学生列表
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
                tdQQ    = document.createElement('td');
            tdName .innerText = stuArr[i].name;
            tdClass.innerText = stuArr[i].majorClass;
            tdNum  .innerText = stuArr[i].studentNum;
            tdGroup.innerText = stuArr[i].group;
            tdPhone.innerText = stuArr[i].phoneNum;
            tdQQ   .innerText = stuArr[i].qq;

            // 添加到tr
            tdInput.appendChild(check);
            fragment.appendChild(tdInput);
            fragment.appendChild(tdName);
            fragment.appendChild(tdClass);
            fragment.appendChild(tdGroup);
            fragment.appendChild(tdPhone);
            fragment.appendChild(tdQQ);

            tr.appendChild(fragment);
            Tfragment.appendChild(tr);
        }
        table.appendChild(Tfragment)
    });


    // 全选功能
    selectAll();
}

