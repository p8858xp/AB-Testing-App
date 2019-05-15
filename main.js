window.onload = loadMe();

function loadMe(){
    let colorVal = "";
    const cookies = getCookies();
    // check to see if the user has already visited this page before
    // if the user has not, get a random color of red or blue and set
    // the cookies to that color and a counter of 1
    if (cookies["_color"] == null){
        colorVal = Math.random() > 0.5 ? "red" : "blue";
        setCookies(colorVal, 1);
        displayCounter(1);
        displayBall(colorVal);
      }
    // get the cookies for this user and return the red/blue ball
    else {
        colorVal = cookies["_color"];
        // get the current counter and increment it by 1, color stays the same
        const currCount = parseInt(cookies["_counter"]);
        setCookies(colorVal, currCount + 1);
        displayCounter(currCount + 1);
        displayBall(colorVal);
    }
}

function getCookies(){
    let cookieObj = {};
    const kv = document.cookie.split(';');
    for(let i in kv) {
      const cookie = kv[i].split("=");
      cookieObj[cookie[0].trim()] = cookie[1];
    }
    return cookieObj;
}

function setCookies(colorVal, counterVal){
    let cookieObj = {};
    cookieObj["_color"] = colorVal;
    cookieObj["_counter"] = counterVal;
    let cookieString = "";
    for (let key in cookieObj){
        cookieString = key + "=" + cookieObj[key] + ";expires=Fri, 31 Dec 9999 23:59:59 UTC; path=/";
        document.cookie = cookieString;
    }
}

function displayBall(colorVal){
    // create ball element
    if (colorVal == "red"){
        const redBall = document.createElement("div");
        redBall.classList.add('red','ball');
        document.getElementsByClassName("main")[0].appendChild(redBall);
        const shadow = document.createElement("div");
        shadow.classList.add('shadow');
        document.getElementsByClassName("main")[0].appendChild(shadow);
        document.getElementById('counter').classList.add('redCounter');
        document.getElementById('reset').classList.add('redButton');
        // give a bluish background color
        document.querySelector("body").style.backgroundColor = "#7BCFF9"
    }
    else if (colorVal == "blue"){
        const blueBall = document.createElement("div");
        blueBall.classList.add('blue','ball');
        document.getElementsByClassName("main")[0].appendChild(blueBall);
        const shadow = document.createElement("div");
        shadow.classList.add('shadow');
        document.getElementsByClassName("main")[0].appendChild(shadow);
        document.getElementById('counter').classList.add('blueCounter');
        document.getElementById('reset').classList.add('blueButton');
        // give a reddish background color
        document.querySelector("body").style.backgroundColor = "#F07171"
    }
}

function displayCounter(counter){
    document.getElementById("counter").textContent = counter;
}

// Add a click listener for when the reset button is clicked
// Delete the stored cookies by expiring them and load the page again
this.document.getElementById("reset").addEventListener("click",function(){
    document.cookie = "_color=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "_counter=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    // remove ball node and shadow nodes from the DOM when resetting and also remove the counter classes before loading page
    if (document.getElementsByClassName('main')[0].children[0] != undefined && document.getElementsByClassName('main')[0].children[1] != undefined){
        document.getElementsByClassName('main')[0].children[0].remove();
        document.getElementsByClassName('main')[0].children[0].remove();
        if (document.getElementById('counter').classList.contains("blueCounter") && document.getElementById('reset').classList.contains('blueButton')){
            document.getElementById('counter').classList.remove("blueCounter");
            document.getElementById('reset').classList.remove("blueButton");
            document.querySelector("body").removeAttribute("style");
        }
        else if (document.getElementById('counter').classList.contains("redCounter") && document.getElementById('reset').classList.contains('redButton')){
            document.getElementById('counter').classList.remove("redCounter");
            document.getElementById('reset').classList.remove("redButton");
            document.querySelector("body").removeAttribute("style");
        }
    }
    loadMe();
});






