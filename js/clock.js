const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector(".clock-times"),
    clockDates = clockContainer.querySelector(".clock-days");
const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
"JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI",
"SAT"];

function getDates(){
    const date = new Date();
    const dayNum = date.getDay();
    const monthNum = date.getMonth();
    const myDate = date.getDate();
    const myDay = dayNames[dayNum];
    const myMonth = monthNames[monthNum];

    clockDates.innerText = `${myDay} ${myMonth} ${myDate}`;
}

function getTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTitle.innerHTML = 
    `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds}`;
}

function init(){
    getTime();
    getDates();
    setInterval(getTime,1000);
}


init();