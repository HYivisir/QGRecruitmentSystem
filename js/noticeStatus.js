window.onload = function () {
    /* 回写数据 */
    $.ajax({
        method: "POST",
        url: domain + "/test/list",
        success: function (result) {
            let obj = JSON.parse(result);
            console.log(obj);
            let myTr = JSON.parse(obj.data);

            let newTr = "";
            for (let i in myTr) {
                console.log(myTr[i]);
            }
        },
        error: function (msg) {
            let obj = JSON.parse(msg);
            alert(obj.status);
        }
    })
}