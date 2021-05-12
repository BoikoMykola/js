let arrList = [];
let letter = '';

// Генерация массива букв
function randomMath() {
    let arr = [];
    const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    let max = letters.length - 1;
    for (let i = 0; i < 5; i++) {
        let newLetter = '';
        do {
            let position = Math.floor(Math.random() * max);
            newLetter = letters.substring(position, position + 1);
        } while (arr.find(item => item === newLetter))
        arr.push(newLetter)

    }
    return arr;
}

//Слушатель загрузки страницы
document.addEventListener("DOMContentLoaded", getSelect);

//Функция вывода на экран элемента select с буквами массива.
function getSelect() {
    let arr = randomMath();
    let variant = document.getElementById('variants');
    let select = document.createElement("select");
    select.options[select.options.length] = new Option("Select letter", "letter");
    select.options[0].disabled = true;
    arr.forEach(item => {
        select.options[select.options.length] = new Option(item, item);
    })
    let form = document.createElement("form")
    form.appendChild(select)
    variant.appendChild(form);

    select.addEventListener("change", function () {
        letter = this.value;
        sendRequest();
    }, false);

}

//Функция запроса информации с файла .json
function sendRequest() {
    let request;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open("GET", "list.json");
    request.onerror = function () {
        alert("Ошибка");
    }
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            localStorage.list = this.response;
            arrList = JSON.parse(localStorage.list);
            let newArrList = getList(arrList);
            if (newArrList.length === 0) {
                empty()
            } else {
                viewList(newArrList);
            }
        }
    }
}

//Функция получения массива имен на указанную букву.
function getList(arrList) {
    let newArrList = [];
    arrList.forEach(item => {
        if (item.name[0] === letter) {
            newArrList.push(item.name)
        }
    })
    return newArrList;
}

//Функция вывода на экран списка имен на указанную букву.
function viewList(list) {
    let mainList = document.createElement("ul");
    mainList.innerText = `The list of names for letter ${letter}.`;
    list.forEach(item => {
        let newElem = document.createElement("li");
        newElem.innerText = item;
        mainList.appendChild(newElem);
    })
    let variant = document.getElementById("list");
    let newElement = document.createElement("div");
    newElement.setAttribute('id', 'list');
    newElement.appendChild(mainList);
    variant.replaceWith(newElement);
}

//Функция вывода на экран информации об отсутствии в базе имен на указанную букву.
function empty() {
    let variant = document.getElementById("list");
    let newElement = document.createElement("div");
    newElement.setAttribute('id', 'list');
    newElement.innerText = 'There are no names for this letter in the database.';
    variant.replaceWith(newElement)
}