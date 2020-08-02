window.onload = function () {

    catchLi();

    /* 当前页面页码 */
    let nowPage = 1;
    /* 当前页面轮次id，通过搜索按钮修改 */
    let nowType = "笔试";

    var changeScoreBtn = document.getElementById('opt-change-score');
    var changePassBtn = document.getElementById('opt-change-pass');
    var sendMsgBtn = document.getElementById('opt-send-msg');

    // 弹窗
    var scoreSection = document.getElementById('secti-score');
    var passSection = document.getElementById('secti-pass');
    var msgSection = document.getElementById('secti-send-msg');

    // 弹窗事件
    changeScoreBtn.onclick = function () {
        scoreSection.classList.remove('hide');
    }
    changePassBtn.onclick = function () {
        passSection.classList.remove('hide');
    }
    sendMsgBtn.onclick = function () {
        msgSection.classList.remove('hide');
    }

    /* 搜索的时候回写固定选择框的内容 */
    function changeAllTypeInSec() {
        let passS = document.querySelectorAll(".passScr");
        for (let i = 0; i < passS.length; i++) {
            passS[i].getElementsByTagName("option")[0].innerHTML = nowType;
        }

    }

    // 关窗事件
    var sections = document.getElementsByClassName('secti');
    var closeBtn = document.getElementsByClassName('sec-de');
    var submitBtn = document.getElementsByClassName('de-sub');

    for (var i = 0; i < sections.length; i++) {
        let index = i;
        submitBtn[index].onclick = function () {
            sections[index].classList.add('hide');
        };
        closeBtn[index].onclick = function () {
            sections[index].classList.add('hide');
        }
    }

    /* 数据回写 */
    let tbody = document.getElementById("tbody");
    let pages = document.getElementById("search-pages");
    $.ajax({
        method: "POST",
        headers:{
            'QGer': 'I am a QGer'
        },
        url: domain + "/test/list",
        success: function (result) {
            let obj = JSON.parse(result);
            let res = JSON.parse(obj.data);

            /* 回写表格 */
            let newTr = ``;
            for (let i in res) {
                newTr += returnTrString(res[i].name,
                    res[i].studentNum,
                    res[i].group,
                    res[i].evaluation,
                    res[i].type,
                    res[i].score,
                    res[i].isPassed);
            }
            newTr = newTr.replace(/null/g, "");
            tbody.innerHTML = newTr;

            /* 回写页码 */
            let pageInner = ``;
            for (let i = 1; i <= Math.ceil(res.length / 15); i++) {
                pageInner += `
                <li class="opt-page-tab">${i}</li>
                `;
            }
            pages.innerHTML = pageInner;

            /* 当前页面显示 */
            appearNowPage(1);

            /* 添加事件 */
            addDele();//删除按钮
            addChange();//修改按钮
            addPageChange();//页面切换
            selectAllByPage();//当前页面全选
            clickTrClicked();//点击tr选中
        },
        error: function (msg) {
            let obj = JSON.parse(msg);
            alert(obj.status);
        }
    });

    /* 批量录入成绩 */
    document.getElementById("all-add-score").onclick = function () {
        /* 获取信息 */
        let str = getSelect();
        let score = document.getElementById("score-num").value;

        $ajax({
            method: "post",
            url: domain + "/test/batchUpdateScore",
            data: {
                studentNumSerial: str,
                typeId: getTypeId(nowType),
                score: score
            },
            success: function (result) {
                let obj = JSON.parse(result);
                if (obj.status) {
                    scoreSection.classList.add("hide");
                    searchTandG.click();
                }
            },
            error: function (msg) {
                let obj = JSON.parse(msg);
                alert(obj.message);
            }
        });
    }

    /* 批量通过 */
    document.getElementById("all-change-pass").onclick = function () {
        /* 获取信息 */
        let str = getSelect();
        let pass = document.getElementById("is-pass-select");
        pass = pass.options[pass.selectedIndex].value;

        $ajax({
            method: "post",
            url: domain + "/test/batchUpdatePs",
            data: {
                studentNumSerial: str,
                typeId: getTypeId(nowType),
                isPassed: pass
            },
            success: function (result) {
                let obj = JSON.parse(result);
                if (obj.status) {
                    passSection.classList.add("hide");
                    searchTandG.click();
                }
            },
            error: function (msg) {
                let obj = JSON.parse(msg);
                alert(obj.message);
            }
        });
    }

    /* 添加删除 */
    function addDele() {
        let btn = document.querySelectorAll(".tr-de");
        for (let i in btn) {
            btn[i].onclick = function (event) {
                event.stopPropagation();
                if (confirm("是否确定删除该结果")) {
                    let td = this.parentElement.parentElement.getElementsByTagName("td");
                    let id = getTypeId(td[5].innerHTML);
                    let studentNum = td[2].innerHTML;
                    $ajax({
                        method: "post",
                        url: domain + "/test/remove",
                        data: {
                            studentNum: studentNum,
                            typeId: id
                        },
                        success: function (result) {
                            let obj = JSON.parse(result);
                            if (obj.status)
                                searchTandG.click();
                        },
                        error: function (msg) {
                            let obj = JSON.parse(msg);
                            alert(obj.message);
                        }
                    })
                }
            }
        }
    }

    /* 点击修改后数据回写，不进行页面刷新 */
    /* 添加修改 */
    function addChange() {
        let btn = document.querySelectorAll(".tr-change");
        for (let i in btn) {
            btn[i].onclick = function (event) {
                event.stopPropagation();
                let noti = document.getElementById("section-change");
                noti.classList.remove("hide");
                /* 获取页面数据 */
                let td = this.parentElement.parentElement.getElementsByTagName("td");
                let id = getTypeId(td[5].innerHTML);

                /* 数据回写 */
                document.querySelectorAll(".passScr")[2].getElementsByTagName("option")[0].innerHTML = td[5].innerHTML;
                let input = noti.getElementsByTagName("input");//姓名、成绩、提交
                let select = noti.getElementsByTagName("select");//类型、状态
                let myTextarea = noti.getElementsByTagName("textarea")[0];//评价
                input[0].value = td[1].innerHTML;
                input[1].value = td[6].innerHTML;
                myTextarea.value = td[4].innerHTML;

                select[1].options[0].selected = true;
                for (let j = 0; j < select[1].options.length; j++) {
                    if (td[7].innerHTML == select[1].options[j].value) {
                        select[1].options[j].selected = true;
                    }
                }

                input[2].onclick = function () {
                    let isPassed = select[1].options[select[1].selectedIndex];
                    $ajax({
                        method: "post",
                        url: domain + "/test/update",
                        data: {
                            "studentNum": td[2].innerHTML,
                            "typeId": id,
                            "score": input[1].value,
                            "isPassed": isPassed.value,
                            "evaluation": myTextarea.value
                        },
                        success: function (result) {
                            let obj = JSON.parse(result);
                            if (obj.status) {
                                noti.classList.add("hide");
                                /* 评价、成绩、状态回写 */
                                td[4].innerHTML = myTextarea.value;
                                td[6].innerHTML = input[1].value;
                                if (isPassed.value == 'null')
                                    td[7].innerHTML = "";
                                else
                                    td[7].innerHTML = isPassed.value;
                            }
                        },
                        error: function (msg) {
                            console.log(msg);
                            let obj = JSON.parse(msg);
                            alert(obj.message);
                        }
                    })
                }
            }
        }
    }

    /* 添加页码的点击事件 */
    function addPageChange() {
        /* 点击123 */
        let pageLi = pages.getElementsByTagName("li");
        for (let i = 0; i < pageLi.length; i++) {
            pageLi[i].onclick = function () {
                appearNowPage(this.innerHTML)
            }
        }
        /* 上一页 */
        document.querySelector(".opt-footer-pre").onclick = function () {
            if (nowPage != 1) {
                appearNowPage(nowPage - 1);
            }
        }
        /* 下一页 */
        document.querySelector(".opt-footer-nxt").onclick = function () {
            if (nowPage != pageLi.length) {
                appearNowPage(nowPage + 1);
            }
        }
    }

    /* 搜索框 */
    document.getElementById("search-input").onclick = function () {
        let txt = document.getElementById("opt-input").value;
        $ajax({
            method: "POST",
            url: domain + "/test/groupby",
            data: {
                group: txt
            },
            success: function (result) {
                let obj = JSON.parse(result);
                let res = JSON.parse(obj.data);

                /* 回写表格 */
                let newTr = ``;
                for (let i in res) {
                    newTr += returnTrString(res[i].name,
                        res[i].studentNum,
                        res[i].group,
                        res[i].evaluation,
                        res[i].type,
                        res[i].score,
                        res[i].isPassed);
                }
                newTr = newTr.replace(/null/g, "");
                tbody.innerHTML = newTr;

                /* 回写页码 */
                let pageInner = ``;
                for (let i = 1; i <= Math.ceil(res.length / 15); i++) {
                    pageInner += `
                    <li class="opt-page-tab">${i}</li>
                    `;
                }
                pages.innerHTML = pageInner;

                /* 当前页面显示 */
                appearNowPage(1);

                /* 添加事件 */
                addDele();
                addChange();
                addPageChange();
                selectAllByPage();
                clickTrClicked();//点击tr选中

                /* 隐藏批量操作的按钮 */
                document.getElementById("opt-change-score").classList.add("hide");
                document.getElementById("opt-change-pass").classList.add("hide");
            },
            error: function (msg) {
                let obj = JSON.parse(msg);
                alert(obj.status);
            }
        });
    }

    /* 获取轮次id */
    function getTypeId(str) {
        if (str == "一轮面试") return 1;
        if (str == "二轮面试") return 2;
        if (str == "笔试") return 3;
    }

    let searchTandG = document.getElementById("search-TandG");
    /* 按组别和轮次搜索 */
    function searchByTypeAndGroup() {
        searchTandG.onclick = function () {
            /* 获取选项框信息 */
            let tbody = document.getElementById("tbody");
            let tName = document.getElementById("search-type");
            tName = tName.options[tName.selectedIndex].innerHTML;
            let gName = document.getElementById("search-group");
            gName = gName.options[gName.selectedIndex].innerHTML;

            $.ajax({
                method: "POST",
                url: domain + "/test/list",
                headers:{
                    'QGer': 'I am a QGer'
                },
                success: function (result) {
                    let obj = JSON.parse(result);
                    let res = JSON.parse(obj.data);

                    let newTr = ``;
                    let count = 0;
                    for (let i in res) {
                        /* 判断 */
                        if (tName == res[i].type && gName == res[i].group) {
                            count++;
                            newTr += returnTrString(res[i].name,
                                res[i].studentNum,
                                res[i].group,
                                res[i].evaluation,
                                res[i].type,
                                res[i].score,
                                res[i].isPassed);
                        }
                    }
                    newTr = newTr.replace(/null/g, "");
                    tbody.innerHTML = newTr;
                    nowType = tName;
                    changeAllTypeInSec();

                    /* 回写页码 */
                    let pageInner = ``;
                    for (let i = 1; i <= Math.ceil(count / 15); i++) {
                        pageInner += `
                <li class="opt-page-tab">${i}</li>
                `;
                    }
                    pages.innerHTML = pageInner;

                    /* 添加点击事件 */
                    addDele();
                    addChange();
                    clickTrClicked();//点击tr选中

                    /* 显示批量操作的按钮 */
                    document.getElementById("opt-change-score").classList.remove("hide");
                    document.getElementById("opt-change-pass").classList.remove("hide");
                },
                error: function (msg) {
                    let obj = JSON.parse(msg);
                    alert(obj.status);
                }
            });
        }
    }
    searchByTypeAndGroup()

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

    /* 当前页面显示 */
    function appearNowPage(page) {
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
        if (pageLi[nowPage - 1].classList)
            pageLi[nowPage - 1].classList.remove("page-chose");
        pageLi[page - 1].classList.add("page-chose");
        /* 修改当前页面 */
        nowPage = page;
    }

    // 页面跳转
    function toPage() {
        let thepage = document.getElementById('opt-topage');
        setTimeout(function () {
            let pages = document.getElementsByClassName('opt-page-tab');
            let maxpage = pages[pages.length - 1].innerHTML;
            thepage.onkeypress = function (event) {
                if (thepage.value > 0 && thepage.value <= maxpage && event.keyCode == 13) {
                    appearNowPage(thepage.value);
                }else{
                    appearPage(pages.length-1);
                }
            }
        }, 4000)
    }
    toPage();

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

    /* tr的内容 */
    function returnTrString(name, studentNum, group, evaluation, type, score, isPassed) {
        return `
                                    <tr>
                                        <td><input type="checkbox" name="" class="choose"></td>
                                        <td>${name}</td>
                                        <td class="ch-num">${studentNum}</td>
                                        <td>${group}</td>
                                        <td>${evaluation}</td>
                                        <td>${type}</td>
                                        <td>${score}</td>
                                        <td>${isPassed}</td>
                                        <td>
                                            <svg class="tr-change" t="1596188186738" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg" p-id="2935" fill="" height="17.5px">
                                                <path
                                                    d="M768.928 334.016l-94.208-94.208L300.544 614.016l-4.416 98.592 98.592-4.416 374.208-374.176zM862.048 777.472H246.048a44.16 44.16 0 0 0-44 44 44.16 44.16 0 0 0 44 44h616a44.16 44.16 0 0 0 44-44c0-24.192-19.776-44-44-44zM787.712 315.2l-94.208-94.208 26.4-26.4a39.488 39.488 0 0 1 55.648 0l38.56 38.56a39.488 39.488 0 0 1 0 55.648l-26.4 26.4z"
                                                    p-id="2936"></path>
                                            </svg>
                                        </td>
                                        <td>
                                            <svg class="tr-de" t="1596187499364" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg" p-id="2161" fill="" height="17.5px">
                                                <path
                                                    d="M517.59 21.609c-100.299 0-181.703 79.514-185.167 179.34H98.603c-25.979 0-47.235 21.099-47.235 47.236 0 25.98 21.099 47.237 47.236 47.237h52.117v528.416c0 99.196 67.233 180.285 150.37 180.285h423.55c82.98 0 150.37-80.616 150.37-180.285V295.737h47.236c25.98 0 47.236-21.1 47.236-47.237 0-25.98-21.099-47.236-47.236-47.236H702.441C699.449 101.124 617.888 21.61 517.59 21.61z m-96.677 179.34c3.464-51.172 45.19-90.85 96.834-90.85s93.37 39.835 96.362 90.85H420.913z m-119.98 714.842c-29.444 0-61.88-37.789-61.88-91.953V295.737h547.311V824.31c0 54.007-32.436 91.954-61.88 91.954H300.933v-0.473z m0 0"
                                                    p-id="2162"></path>
                                                <path
                                                    d="M364.387 802.267c21.57 0 39.363-21.571 39.363-48.653V476.022c0-27.082-17.635-48.654-39.363-48.654-21.572 0-39.364 21.572-39.364 48.654v277.592c0 26.924 17.32 48.653 39.364 48.653z m142.496 0c21.571 0 39.363-21.571 39.363-48.653V476.022c0-27.082-17.635-48.654-39.363-48.654-21.571 0-39.364 21.572-39.364 48.654v277.592c0 26.924 17.793 48.653 39.364 48.653z m149.896 0c21.571 0 39.364-21.571 39.364-48.653V476.022c0-27.082-17.635-48.654-39.364-48.654-21.571 0-39.363 21.572-39.363 48.654v277.592c0 26.924 17.162 48.653 39.363 48.653z m0 0"
                                                    p-id="2163"></path>
                                            </svg>
                                        </td>
                                    </tr>
                                `
    }
}
