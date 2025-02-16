
let l = "O"

function setPage(){
    setAds()
    setMenu()
    checkAccount()
}

async function setMenu() {
    const adCon = document.getElementById("menu-container");
    const htmlText = await (await fetch("components/menu.html")).text();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlText;
    const template = tempDiv.querySelector('template');
    const clone = template.content.cloneNode(true);
    adCon.appendChild(clone);
}

async function setAds() {
    const adCon = document.getElementById("right-container");
    const htmlText = await (await fetch("components/ads.html")).text();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlText;
    const template = tempDiv.querySelector('template');
    const maxAds = Math.floor(adCon.getBoundingClientRect().height / (253 + 80));
    for (let i = 0; i < maxAds; i++) {
        const clone = template.content.cloneNode(true);
        adCon.appendChild(clone);
    }
}

async function setActiveFunction(componentFilePath) {
    const adCon = document.getElementById("main-container");
    const htmlText = await (await fetch(componentFilePath)).text();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlText;
    const template = tempDiv.querySelector('template');
    const clone = template.content.cloneNode(true);
    adCon.appendChild(clone);
}


function getActiveL(){
    if (l === "O"){
        l="X"
        return "O"
    }else {
        l="O"
        return "X"
    }
}

function checkAccount(){
    let loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        document.getElementById("loggedInAccount").textContent = loggedInUser;
        document.getElementById("logged-in").style.display = "flex";
        document.getElementById("logged-out").style.display = "none";

    } else {
        document.getElementById("logged-in").style.display = "none";
        document.getElementById("logged-out").style.display = "flex";
    }

    // Handle logout
    document.getElementById("logout-button").addEventListener("click", function() {
        localStorage.removeItem("loggedInUser");
    });
}
