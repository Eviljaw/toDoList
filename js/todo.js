const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");

const TODO_LS = "toDoList";

let itemList = [];



function saveItemList(){
    localStorage.setItem(TODO_LS, JSON.stringify(itemList));
}

function deleteItem(event) {
    const li = event.target.parentNode;
    toDoList.removeChild(li);
    const cleanItem = itemList.filter(function (item) {
        return item.id !== parseInt(li.id);
      });
    itemList = cleanItem;
    saveItemList();
}

function drawLineThrough(event) {
    const currentClass = event.target.classList[1];
    const childSpan = event.target.parentNode.childNodes[1]
    if(currentClass === "fa-square"){
        event.target.classList.remove("fa-square");
        event.target.classList.add("fa-check-square");
        childSpan.classList.add("line-through", "finish-color");
    }else{
        event.target.classList.remove("fa-check-square");
        event.target.classList.add("fa-square");
        childSpan.classList.remove("line-through", "finish-color");
    }
    

}

function inputList(inputText) {
    const li = document.createElement("li");
    const finishBtn = document.createElement("i");
    const span = document.createElement("span");
    const delBtn = document.createElement("i");
    const newId = Math.floor(Math.random()*999999999);

    finishBtn.addEventListener("click", drawLineThrough);
    delBtn.addEventListener("click", deleteItem);

    finishBtn.classList.add("far", "fa-square");
    span.innerText = inputText;
    delBtn.classList.add("far", "fa-minus-square");

    
    li.appendChild(finishBtn);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);

    const itemObj = {
        text: inputText,
        id: newId
    }

    itemList.push(itemObj);
    saveItemList();
}

function handleSubmit(event) {
    event.preventDefault();
    const currnetValue = toDoInput.value;
    inputList(currnetValue);
    toDoInput.value = "";
}

function loadItemList() {
    const loadedList = localStorage.getItem(TODO_LS);
    if(loadedList !== null) {
        const parsedList = JSON.parse(loadedList);
        parsedList.forEach( function(item) {
            inputList(item.text);
        });
    }
}

function init() {
    loadItemList();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
