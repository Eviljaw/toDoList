const form = document.querySelector(".js-welcome-input"),
    input = form.querySelector("input"),
    toDoHeader = document.querySelector(".js-toDoHeader"),
    welcome = document.querySelector(".welcome");

const USER_LS = "currentuser"

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintName(currentValue);
    saveName(currentValue);
    welcome.classList.add("hide-element");
}

function paintName(text){
    toDoHeader.innerText = `Hello, ${text}.`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS)
    if(currentUser === null){
        form.addEventListener("submit", handleSubmit);
    }else{
        welcome.classList.add("hide-element");
        paintName(currentUser);
    }
}

function init(){
    loadName();
}

init();