window.onload = function () {
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



    /* 当前页面页码 */
    let nowPage = 1;



    /* 数据回写 */
    let tbody = document.getElementById("tbody");
    let pages = document.getElementById("search-pages");
    $.ajax({
        method: "POST",
        url: domain + "/test/list",
        success: function (result) {
            let obj = JSON.parse(result);
            let res = JSON.parse(obj.data);

            /* 回写表格 */
            let newTr = ``;
            for (let i in res) {
                newTr += `
                                    <tr class="">
                                        <td><input type="checkbox" name="" class="choose"></td>
                                        <td>${res[i].name}</td>
                                        <td>${res[i].studentNum}</td>
                                        <td>${res[i].group}</td>
                                        <td>${res[i].evaluation}</td>
                                        <td>${res[i].type}</td>
                                        <td>${res[i].score}</td>
                                        <td>${res[i].isPassed}</td>
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
                `;
            }
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
            addPageChange();//页面切换
            selectAllByPage();//当前页面全选

        },
        error: function (msg) {
            let obj = JSON.parse(msg);
            alert(obj.status);
        }
    });

    /* 批量录入成绩 */
    document.getElementById("all-add-score").onclick = function() {
        /* 获取页面所有选中的人的学号 */
    }


    /* 添加删除 */
    function addDele() {
        let btn = document.querySelectorAll(".tr-de");
        for (let i in btn) {
            btn[i].onclick = function () {
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
                                location.reload();
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
                    newTr += `
                                        <tr class="">
                                            <td><input type="checkbox" name="" class="choose"></td>
                                            <td>${res[i].name}</td>
                                            <td>${res[i].studentNum}</td>
                                            <td>${res[i].group}</td>
                                            <td>${res[i].evaluation}</td>
                                            <td>${res[i].type}</td>
                                            <td>${res[i].score}</td>
                                            <td>${res[i].isPassed}</td>
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
                    `;
                }
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
                addPageChange();
                selectAllByPage();

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

    /* 按组别和轮次搜索 */
    function searchByTypeAndGroup() {
        document.getElementById("search-TandG").onclick = function () {
            /* 获取选项框信息 */
            let tbody = document.getElementById("tbody");
            let tName = document.getElementById("search-type");
            tName = tName.options[tName.selectedIndex].innerHTML;
            let gName = document.getElementById("search-group");
            gName = gName.options[gName.selectedIndex].innerHTML;

            $.ajax({
                method: "POST",
                url: domain + "/test/list",
                success: function (result) {
                    let obj = JSON.parse(result);
                    let res = JSON.parse(obj.data);

                    let newTr = ``;
                    for (let i in res) {
                        /* 判断 */
                        if (tName == res[i].type && gName == res[i].group)
                            newTr += `
                                    <tr>
                                        <td><input type="checkbox" name="" class="choose"></td>
                                        <td>${res[i].name}</td>
                                        <td>${res[i].studentNum}</td>
                                        <td>${res[i].group}</td>
                                        <td>${res[i].evaluation}</td>
                                        <td>${res[i].type}</td>
                                        <td>${res[i].score}</td>
                                        <td>${res[i].isPassed}</td>
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
                `;
                    }
                    tbody.innerHTML = newTr;
                    /* 添加点击事件 */
                    addDele();
                    //add
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
        pageLi[nowPage - 1].classList.remove("page-chose");
        pageLi[page - 1].classList.add("page-chose");
        /* 修改当前页面 */
        nowPage = page;
    }
}

