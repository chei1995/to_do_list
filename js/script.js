const text = document.querySelector('.text');
const save = document.querySelector('.save');
const list = document.querySelector('.list');
const del = document.querySelector('.del');
console.log(list);
let listAry = [];

save.addEventListener('click', function(e) {
    //let newData = `<li data-num='0'>${text.value}button class='del'>刪除</button></li>`;
    //console.log(newData);
    //let obj = {};
    //obj.content = text.value;
    listAry.push({ content: `${text.value}` });
    newList();
    //listAry.push(obj);
})

function newList() {
    let data = "";
    listAry.forEach(function(item, index) {
        let listHTML = `<li>${item.content}<button class='del' data-num=${index}>刪除</button></li>`;
        data += listHTML;
    });
    list.innerHTML = data;
}

list.addEventListener('click', function(e) {
    if (e.target.getAttribute("class") !== "del") {
        return;
    }
    let dataNum = e.target.getAttribute("data-num");
    console.log(dataNum)

    listAry.splice(dataNum, 1);
    newList();
})