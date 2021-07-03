//原本的陣列
let data = [{ type: true, content: "coding" }, { type: false, content: "買漫畫" }, { type: true, content: "寫履歷" }, ];
//DOM
const add = document.querySelector('.add');
const addValue = document.querySelector('.new');
const list = document.querySelector('.list');
const allToDo = document.querySelector('.allToDo');
const complete = document.querySelector('.complete'); //全部
const btn = document.querySelectorAll('.btn')
const clearAll = document.querySelector('.clearAll');
let btnActive = document.querySelector('.btnActive');

//新增資料
add.addEventListener("click", function(e) {
    //console.log(e.target)
    //console.log(addValue.value);
    if (addValue.value == '') {
        alert('請輸入待辦事項');
        return
    }
    let newValue = {
        type: false,
        content: addValue.value
    }
    data.push(newValue)
    addValue.value = '';
    //console.log(data);

    console.log(btnActive);
    btn.forEach(function(item, index) {
        btn[index].classList.remove('btnActive')
    })
    reorganize()

    // btn[0].setAttribute('btnActive')

})

//初始化
function reorganize() {
    let str = "";
    let li = "";
    data.forEach(function(item, index) {
        if (item.type == false) {
            li = `<li data-num='${index}'><input type="checkbox" data-check='${index}'><label class='checkbox'>${item.content}</label><img data-img='${index}' class='del' src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="刪除"></li>`;

        } else {
            li = `<li data-num='${index}' class='checkboxActive'><input type="checkbox" checked data-check='${index}'><label class='checkbox'>${item.content}</label><img data-img='${index}' class='del' src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="刪除"></li>`;
        }
        str += li;
    })
    list.innerHTML = str;
    doNum();
    clearAll.textContent = '清除所有項目';
    borerBottom(0);
    //console.log(num);
}
reorganize();

function toDo() {
    let str = "";
    data.forEach(function(item, index) {
        if (item.type == false) {
            let li = `<li data-num='${index}'><input type="checkbox" data-check='${index}'><label class='checkbox'>${item.content}</label><img data-img='${index}' class='del' src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="刪除"></li>`;
            str += li;
        };
    });
    list.innerHTML = str;
    clearAll.textContent = '全部勾選已完成';
    borerBottom(1);
    doNum();
}

function done() {

    let str = "";
    data.forEach(function(item, index) {
        if (item.type == true) {
            let li = `<li data-num='${index}' class='checkboxActive'><input type="checkbox" checked data-check='${index}'><label class='checkbox'>${item.content}</label><img data-img='${index}' class='del' src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="刪除"></li>`;
            str += li;
        }
    });
    list.innerHTML = str;
    clearAll.textContent = '刪除已完成項目';
    borerBottom(2);
    doneNum();
}
//待完成項目
function doNum() {
    let num = 0;
    data.forEach(function(item, index) {
        if (item.type == false) {
            num++
        }
    })
    allToDo.innerHTML = `${num}個待完成項目`
}

//已完成項目
function doneNum() {
    let num = 0;
    data.forEach(function(item, index) {
        if (item.type == true) {
            num++
        }
    })
    allToDo.innerHTML = `${num}個已完成項目`
}


//list事件，點checkBox點選&&刪除項目
list.addEventListener("click", function(e) {
    //console.log(e.target.nodeName);

    if (e.target.nodeName != "INPUT" && e.target.nodeName != "IMG") {
        return
    }
    switch (e.target.nodeName) {
        case "INPUT":
            let checkNum = e.target.getAttribute("data-check");
            let lil = e.target.parentElement;
            if (e.target.checked == true) {
                //console.log(checkNum);
                data[checkNum].type = true;
                lil.setAttribute('class', 'checkboxActive');
                doNum();
                done();
            } else {
                data[checkNum].type = false;
                lil.classList.remove('checkboxActive')
                toDo();
                doNum();
            }
            break
        case "IMG":

            let imgNum = e.target.getAttribute("data-img");
            data.splice(imgNum, 1);
            console.log(btnActive.textContent);
            if (btnActive.textContent == "全部") {
                reorganize();
            } else if (btnActive.textContent == "待完成") {
                toDo();
            } else if (btnActive.textContent == "已完成") {
                done();
            }
            break
    }
    //console.log(e);
})

//清除
clearAll.addEventListener("click", function() {
    if (clearAll.textContent === '刪除已完成項目') {
        data = data.filter(function(item, index, array) {
            return item.type == false;
        });
        reorganize();
    } else if (clearAll.textContent === '全部勾選已完成') {
        data.forEach(function(item, index, array) {
            item.type = true;
        })
        done();
    } else if (clearAll.textContent === '清除所有項目') {
        data = [];
        reorganize();

    }
})


//全部 待完成 已完成 按鈕
complete.addEventListener("click", function(e) {
    //console.log(e.target.textContent);
    if (e.target.textContent == "全部") {
        reorganize();
    } else if (e.target.textContent == "待完成") {
        toDo();
    } else if (e.target.textContent == "已完成") {
        done();
    }
})

function borerBottom(e) {
    btn.forEach(function(item, index) {
        btn[index].classList.remove('btnActive')
    })
    btn[e].setAttribute('class', 'btnActive');
}