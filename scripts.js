
function setPage(){
    setMenu()
    checkAccount()
    setupIframe()
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
    if(adCon.getBoundingClientRect().height > (253 + 80))
    for (let i = 0; i < maxAds; i++) {
        const clone = template.content.cloneNode(true);
        adCon.appendChild(clone);
    }
}


function checkAccount(){
    let loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        document.getElementById("loggedInAccount").textContent = loggedInUser;
        document.getElementById("logged-in").style.display = "flex";
        document.getElementById("logged-out").style.display = "none";
    }else {
        document.getElementById("logged-in").style.display = "none";
        document.getElementById("logged-out").style.display = "flex";
    }

    document.getElementById("logout-button").addEventListener("click", function() {
        localStorage.removeItem("loggedInUser");
        document.getElementById("logged-in").style.display = "none";
        document.getElementById("logged-out").style.display = "flex";
    });
}

function setupIframe(o) {
    o.style.height=(o.contentWindow.document.body.scrollHeight+100)+'px';
    document.getElementById("right-container").innerHTML = "";
    document.getElementById("right-container").style.height = o.style.height;
    setAds();
    document.getElementById("footer").hidden = true;
    document.getElementById("footer").hidden = false;
}

function menuToggle(){
    if (document.getElementById("menu-wrapper").hidden){
        document.getElementById("menu-wrapper").hidden = false
    } else {
        document.getElementById("menu-wrapper").hidden = true
    }
}
