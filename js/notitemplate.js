window.onload = function () {

    catchLi();

    /* 获取需要多次使用的id */
    let addSec = document.getElementById("noti-sec");
    let addClose = document.getElementById("noti-add-close");
    let sendNoti = document.getElementById("noti-sub");
    let notiMain = document.getElementById("enroll-info");
    let addText = addSec.querySelector(".noti-sec-main");
    let addTitle = addSec.querySelector(".noti-input");

    /* 数据回写 */
    $.ajax({
        method: "POST",
        headers: {
            'QGer': 'I am a QGer'
        },
        url: domain + "/model/list",
        success: function (result) {
            let obj = JSON.parse(result);
            let noti = JSON.parse(obj.data);

            let newNoti = `
                    <div class="noti-div">
                        <div class="noti-main">
                            <div>#请在需要填写的地方使用#</div>
                            <br>
                            <div>占位符：</div>
                            <div>名字：#name#</div>
                            <div>地点：#address#</div>
                            <div>时间：#time#</div>
                            <br>
                            <div>#较长信息可以滚动查看#</div>
                        </div>
                        <div class="noti-name">模板使用注意事项</div>
                    </div>
            `;
            for (let i in noti) {
                /* 修复最后输入回车和空格而出现的bug */
                if (noti[i].content.split("<div>").length > noti[i].content.split("</div>").length) {
                    noti[i].content += "</div>"
                } else if (noti[i].content.split("<div>").length < noti[i].content.split("</div>").length) {
                    noti[i].content = noti[i].content.substring(0, noti[i].content.length - 5);
                }

                console.log(noti[i].content);

                newNoti = newNoti + `
                    <div class="noti-div">
                        <div class="hide id-here">${noti[i].id}</div> 
                        <div class="noti-de">
                            <svg viewBox="0 0 16 13">
                                <g transform="translate(1.000000, 0.000000)" fill="white">
                                    <path
                                        d="M10.164,11.063 C9.982,11.063 9.845,10.991 9.776,10.922 L8.009,9.157 L6.314,10.852 C6.248,10.918 6.095,10.998 5.891,10.998 C5.738,10.998 5.507,10.952 5.288,10.733 C5.067,10.513 5.018,10.295 5.017,10.153 C5.013,9.965 5.086,9.823 5.157,9.753 L6.881,8.028 L5.201,6.35 C5.049,6.197 4.922,5.723 5.321,5.325 C5.546,5.1 5.767,5.053 5.914,5.053 C6.097,5.053 6.234,5.125 6.301,5.194 L8.009,6.9 L9.705,5.204 C9.773,5.137 9.925,5.058 10.129,5.058 C10.283,5.058 10.514,5.104 10.733,5.324 C11.111,5.703 11.035,6.134 10.864,6.304 L9.138,8.03 L10.875,9.766 C10.942,9.834 11.021,9.986 11.021,10.19 C11.021,10.344 10.976,10.573 10.756,10.792 C10.531,11.016 10.311,11.063 10.164,11.063 L10.164,11.063 L10.164,11.063 Z">
                                    </path>
                                </g>
                            </svg>
                        </div>
                        <div class="noti-main">
                            ${noti[i].content}
                        </div>
                        <div class="noti-name">${noti[i].title}</div>
                        <div class="noti-change">
                            <svg t="1596024524831" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="3436">
                                <path
                                    d="M853.319 551.563c0-18.85 15.28-34.132 34.131-34.132s34.132 15.28 34.132 34.132V802.1c0 65.223-48.815 119.462-110.928 119.462H196.279c-62.112 0-110.928-54.24-110.928-119.462V204.791c0-65.221 48.816-119.462 110.928-119.462H465.83c18.85 0 34.133 15.281 34.133 34.133s-15.281 34.132-34.133 34.132H196.28c-22.715 0-42.665 22.167-42.665 51.198V802.1c0 29.031 19.95 51.198 42.664 51.198h614.375c22.714 0 42.665-22.167 42.665-51.198V551.563z m-303.01-4.109c-12.523 14.09-34.097 15.358-48.186 2.835s-15.358-34.098-2.835-48.186l341.32-383.985c12.522-14.089 34.097-15.358 48.186-2.834s15.357 34.097 2.834 48.186L550.31 547.454z"
                                    p-id="3437">
                                </path>
                            </svg>
                        </div>
                    </div>
                `;
            }
            /* 新增框 */
            newNoti += `
                    <div id="noti-add">
                        <svg t="1596026190951" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1303">
                            <path
                                d="M511.3 736.2c-20.7 0-37.3-16.7-37.3-37.3V325.5c0-20.6 16.7-37.3 37.3-37.3 20.6 0 37.3 16.7 37.3 37.3v373.3c0.1 20.7-16.6 37.4-37.3 37.4"
                                p-id="1304"></path>
                            <path
                                d="M698 549.5H324.7c-20.7 0-37.3-16.7-37.3-37.3 0-20.6 16.7-37.3 37.3-37.3H698c20.6 0 37.3 16.7 37.3 37.3 0 20.6-16.7 37.3-37.3 37.3"
                                p-id="1305"></path>
                            <path
                                d="M510.8 960.2c-118.7 0-231-45.9-316.3-131.2C91.1 725.6 45.6 582.5 69.6 436.5 101 244.4 258.4 92.8 452.3 67.9c154.5-19.7 305.5 39.5 404.2 158.6 13.2 15.9 10.9 39.4-5 52.6-15.9 13.2-39.4 10.9-52.6-5-82.2-99.2-208-148.8-337.2-132.1-161.4 20.7-292.3 146.8-318.5 306.6-20 122 17.9 241.3 104.1 327.5 86.2 86.2 205.6 124.1 327.5 104.1C735 854 864.3 717.2 882.3 555c4.2-37.3 2.8-74.6-3.7-110.8-2.6-14.1-6-28.2-10.3-41.7-6-19.8 5.1-40.6 24.8-46.6 19.8-6.2 40.6 5 46.6 24.7 5 16.3 9.2 33.2 12.2 50.2 8 43.4 9.5 88 4.6 132.4C934.6 761.2 782.6 921.9 587 954c-25.6 4.1-51 6.2-76.2 6.2"
                                p-id="1306"></path>
                        </svg>
                        <div>点击新增</div>
                    </div>
            `;
            notiMain.innerHTML += newNoti;

            /* 增加点击事件 */
            addMubanClick();
            addDeleteClick();
        },
        error: function (msg) {
            let obj = JSON.parse(msg);
            alert(obj.status);
        }
    })


    /* 事件委托 */
    notiMain.onclick = function (ev) {
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;

        /* 修改模板 */
        if (target.nodeName.toLowerCase() == "svg") {
            if (target.parentElement.className == "noti-change") {
                let myNoti = target.parentElement.parentElement
                let id = myNoti.querySelector(".id-here").innerHTML;
                /* 回写内容 */
                let text = myNoti.querySelector(".noti-main").innerHTML;
                addText.innerHTML = text;
                let tit = myNoti.querySelector(".noti-name").innerHTML;
                addTitle.value = tit;
                addSec.classList.remove("hide");

                /* 三秒内提交一次 */
                let isClick = true;
                sendNoti.onclick = function () {
                    if (isClick) {
                        isClick = false;
                        /* 将空格换成字符串 */
                        addText.innerHTML = addText.innerHTML.replace(/&nbsp;/g, " ");

                        $ajax({
                            method: "post",
                            url: domain + "/model/update",
                            data: {
                                "id": id,
                                "title": addTitle.value,
                                "content": addText.innerHTML
                                //"content": txt.value
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
                        });
                        setTimeout(() => {
                            isClick = true;
                        }, 3000);
                    }
                }
            }
        }
    }

    /* 新增模板 */
    function addMubanClick() {
        document.getElementById("noti-add").onclick = function () {
            /* 打开的同时清除数据 */
            addSec.classList.remove("hide");
            addSec.querySelector(".noti-sec-main").innerHTML = "";
            addSec.querySelector(".noti-input").setAttribute("value", "");

            /* 三秒内提交一次 */
            let isClick = true;
            sendNoti.onclick = function () {
                if (isClick) {
                    isClick = false;
                    let tit = addSec.querySelector(".noti-input").value;
                    /* 将空格换成字符串 */
                    addText.innerHTML = addText.innerHTML.replace(/&nbsp;/g, " ");
                    $ajax({
                        method: "post",
                        url: domain + "/model/save",
                        data: {
                            "title": tit,
                            "content": addText.innerHTML
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
                    });
                    setTimeout(() => {
                        isClick = true;
                    }, 3000);
                }
            }
        }

        /* 关闭section */
        addClose.onclick = function () {
            addSec.classList.add("hide");
        }
    }

    /* 添加删除事件 */
    function addDeleteClick() {
        let isDe = document.getElementById("noti-isde");
        let isDelete = document.querySelectorAll(".noti-de");
        /* 是否确认删除 */
        for (let i in isDelete) {
            isDelete[i].onclick = function () {
                isDe.classList.remove("hide");
                let id = this.parentElement.querySelector(".id-here").innerHTML;
                /* 点击确定就ajax */
                isDe.querySelector(".de-sub").onclick = function () {
                    $ajax({
                        method: "post",
                        url: domain + "/model/remove",
                        data: {
                            id: id
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

        /* 关闭删除框 */
        isDe.querySelector(".sec-de").onclick = function () {
            isDe.classList.add("hide");
        }
    }
}

