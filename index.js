const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoPending = document.querySelector(".js-toDoPending"),
      toDoFinished = document.querySelector(".js-toDoFinished");

const PENDING_LS = "pendingList";
const FINISHED_LS = "finishedList";

let pendingList = [];
let finishedList = [];



function savePendingList(){
    localStorage.setItem(PENDING_LS, JSON.stringify(pendingList));
}

function saveFinishedList(){
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishedList));
}

function moveFinishedToPending(event){
    const li = event.target.parentNode;
    const toDoItem = li.querySelector("span").innerText;
    deleteFinished(event);
    inputPending(toDoItem);
}

function movePendingToFinished(event){
    const li = event.target.parentNode;
    const toDoItem = li.querySelector("span").innerText;
    deletePending(event);
    inputFinished(toDoItem);
}

function deleteFinished(event) {
    const li = event.target.parentNode;
    toDoFinished.removeChild(li);
    console.log(toDoFinished, "삭제후남은 html");
    const cleanFinished = finishedList.filter(function (item) {
        console.log(item.id, li.id, "비교과정");
        return item.id !== parseInt(li.id);
      });
    console.log(cleanFinished, "비교후 남은것출력");
    finishedList = cleanFinished;
    console.log(finishedList);
    saveFinishedList();
}

function inputFinished(inputText) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const moveBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const newId = Math.floor(Math.random()*999999999);

    moveBtn.addEventListener("click", moveFinishedToPending);
    delBtn.addEventListener("click", deleteFinished);

    span.innerText = inputText;
    moveBtn.innerText = "◀";
    delBtn.innerText = "❌";
    
    li.appendChild(span);
    li.appendChild(moveBtn);
    li.appendChild(delBtn);
    li.id = newId;
    toDoFinished.appendChild(li);

    const FinishedObj = {
        text: inputText,
        id: newId
    }

    finishedList.push(FinishedObj);
    saveFinishedList();
}


function deletePending(event) {
    const li = event.target.parentNode;
    toDoPending.removeChild(li);
    console.log(toDoPending, "삭제후남은 html");
    const cleanPendings = pendingList.filter(function (item) {
        console.log(item.id, li.id, "비교과정");
        return item.id !== parseInt(li.id);
      });
    console.log(cleanPendings, "비교후 남은것출력");
    pendingList = cleanPendings;
    console.log(pendingList);
    savePendingList();
}

function inputPending(inputText) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const moveBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const newId = Math.floor(Math.random()*999999999);

    moveBtn.addEventListener("click", movePendingToFinished);
    delBtn.addEventListener("click", deletePending);

    span.innerText = inputText;
    moveBtn.innerText = "▶";
    delBtn.innerText = "❌";
    
    li.appendChild(span);
    li.appendChild(moveBtn);
    li.appendChild(delBtn);
    li.id = newId;
    toDoPending.appendChild(li);

    const pendingObj = {
        text: inputText,
        id: newId
    }

    pendingList.push(pendingObj);
    savePendingList();
}

function handleSubmit(event) {
    event.preventDefault();
    const currnetValue = toDoInput.value;
    inputPending(currnetValue);
    toDoInput.value = "";
}

function loadPendingList() {
    const loadedPending = localStorage.getItem(PENDING_LS);
    if(loadedPending !== null) {
        const parsedPending = JSON.parse(loadedPending);
        parsedPending.forEach( function(item) {
            inputPending(item.text);
        });
    }
}

function loadFinishedList() {
    const loadedFinished = localStorage.getItem(FINISHED_LS);
    if(loadedFinished !== null) {
        const parsedFinished = JSON.parse(loadedFinished);
        parsedFinished.forEach( function(item) {
            inputFinished(item.text);
        });
    }
}

function init() {
    loadPendingList();
    loadFinishedList();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
