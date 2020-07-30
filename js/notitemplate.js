/* 提交修改或删除模板的时候刷新页面 */

window.onload = function () {
    /* 获取需要多次使用的id */
    let add = document.getElementById("noti-add");
    let addSec = document.getElementById("noti-sec");
    let addClose = document.getElementById("noti-add-close");
    let isDe = document.getElementById("noti-isde");
    let sendNoti = document.getElementById("noti-sub");

    /* 打开添加的section */
    add.onclick = function () {
        /* 打开的同时清除数据 */
        addSec.classList.remove("hide");
        addSec.querySelector(".noti-sec-main").innerHTML = "";
        addSec.querySelector(".noti-input").setAttribute("value", "");

        /* 点击发送就ajax */
        sendNoti.onclick = function () {
            alert("我是第" + this + "，我发送了！");
        }
    }

    /* 关闭add的section */
    addClose.onclick = function () {
        addSec.classList.add("hide");
    }

    /* 打开修改 */
    let change = document.getElementsByClassName("noti-change");
    for (let i in change) {
        change[i].onclick = function () {
            /* 取值回写 */
            let parenet = this.parentElement;
            let text = parenet.querySelector(".noti-main").innerHTML;
            addSec.querySelector(".noti-sec-main").innerHTML = text;
            let tit = parenet.querySelector(".noti-name").innerHTML;
            console.log(tit);
            addSec.querySelector(".noti-input").setAttribute("value", tit);
            addSec.classList.remove("hide");

            /* 点击发送就ajax */
            sendNoti.onclick = function () {
                alert("我是第" + i + "个标签，我发送了！");
            }
        }
    }

    /* 确认删除 */
    let isDelete = document.querySelectorAll(".noti-de");
    for (let i in isDelete) {
        isDelete[i].onclick = function () {
            isDe.classList.remove("hide");
            /* 点击确定就ajax */
            isDe.querySelector(".de-sub").onclick = function () {
                alert("我是第" + i + "个标签，我没了！");
            }
        }
    }

    /* 关闭删除框 */
    isDe.querySelector(".sec-de").onclick = function () {
        isDe.classList.add("hide");
    }
}

