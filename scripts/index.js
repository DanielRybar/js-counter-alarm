let actualTime;
let time;
let hoursForm;
let minutesForm;
let secondsForm;;
let btn;
let settedTime;
let settedTimeElement;
let countDownElement;
let countDown;
let countDownInterval;
let isProgress;
let progressBar;
let wakeUp;
let audio;

const init = () => {
    actualTime = document.getElementById("actualTime");
    hoursForm = document.getElementById("hours");
    minutesForm = document.getElementById("minutes");
    secondsForm = document.getElementById("seconds");
    btn = document.getElementById("processBtn");
    settedTimeElement = document.getElementById("settedTime");
    countDownElement = document.getElementById("countDown");
    progressBar = document.getElementById("progressBar");
    isProgress = document.getElementById("isProgress");
    wakeUp = document.getElementById("wakeUp");
    audio = new Audio("./sounds/wakeUpSound.wav");
    setInterval(getActualTime, 100); // zavola funkci getActualTime kazdych 100 milisekund

    btn.disabled = true;
    btn.addEventListener("click", (e) => { 
        e.preventDefault(); 
        settedTime = new Date();
        settedTime.setHours(hoursForm.value);
        settedTime.setMinutes(minutesForm.value);
        settedTime.setSeconds(secondsForm.value);
        console.log(settedTime);
        if(settedTime <= time) 
        {
            settedTimeElement.innerHTML = "Nelze";
            countDownElement.innerHTML = "";
            wakeUp.innerHTML = "";
            isProgress.classList.remove("progress");
            progressBar.style.width = "0%";
            clearInterval(countDownInterval);
        }
        else 
        {
            settedTimeElement.innerHTML = formatTime(settedTime);
            wakeUp.innerHTML = "";
            countDownInterval = setInterval(getCountDown, 100);
        }
    });

    hoursForm.addEventListener("input", (e) => {
        validateInput(e, "hours", btn);
    });
    hoursForm.addEventListener("change", (e) => {
        validateInput(e, "hours", btn);
    });
    hoursForm.addEventListener("paste", (e) => {
        validateInput(e, "hours", btn);
    });
    hoursForm.addEventListener("keypress", (e) => {
        validateInput(e, "hours", btn);
    });

    minutesForm.addEventListener("input", (e) => {
        validateInput(e, "minutes", btn);
    });
    minutesForm.addEventListener("change", (e) => {
        validateInput(e, "minutes", btn);
    });
    minutesForm.addEventListener("paste", (e) => {
        validateInput(e, "minutes", btn);
    });
    minutesForm.addEventListener("keypress", (e) => {
        validateInput(e, "minutes", btn);
    });

    secondsForm.addEventListener("input", (e) => {
        validateInput(e, "seconds", btn);
    });
    secondsForm.addEventListener("change", (e) => {
        validateInput(e, "seconds", btn);
    });
    secondsForm.addEventListener("paste", (e) => {
        validateInput(e, "seconds", btn);
    });
    secondsForm.addEventListener("keypress", (e) => {
        validateInput(e, "seconds", btn);
    });
}

const formatTime = (timeValue) => {
    let hours = timeValue.getHours();
    let minutes = timeValue.getMinutes();
    let seconds = timeValue.getSeconds();
    if(hours < 10) hours = "0" + hours;
    if(minutes < 10) minutes = "0" + minutes;
    if(seconds < 10) seconds = "0" + seconds;
    return (hours.toString() + ":" + minutes.toString() + ":" + seconds.toString());
}

const getActualTime = () => {
    time = new Date();
    actualTime.innerHTML = formatTime(time);
}

const getCountDown = () => {
    //console.log(settedTime + "-" + time);
    countDown = (settedTime.getSeconds() + settedTime.getMinutes() * 60 + settedTime.getHours() * 3600) - (time.getSeconds() + time.getMinutes() * 60 + time.getHours() * 3600);
    countDownElement.innerHTML = "Zbývá " + countDown + " sekund";
    if(countDown <= 10 && countDown > 0) 
    {
        isProgress.classList.add("progress");
        progressBar.style.width = countDown * 10 + "%";
    }
    else if(countDown === 0) 
    {
        audio.play();
        wakeUp.innerHTML = "Budíček!";
        clearInterval(countDownInterval);
        countDownElement.innerHTML = "";
        progressBar.style.width = "0%";
        isProgress.classList.remove("progress");
    }
}

const validateInput = (e, parameter, button) => {
    if(parameter === "hours" && (e.target.value >= 24 || e.target.value < 1 || e.target.value === ""))
    {
        e.target.style.border = "3px solid crimson";
        button.disabled = true;
    }
    else if((parameter === "minutes" || parameter === "seconds") && (e.target.value >= 60 || e.target.value < 0 || e.target.value === ""))
    {
        e.target.style.border = "3px solid crimson";
        button.disabled = true;
    }
    else 
    {
        e.target.style.border = "3px solid green";
        button.disabled = false;
    }
}

window.addEventListener("DOMContentLoaded", init);