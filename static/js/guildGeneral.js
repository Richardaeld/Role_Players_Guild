//------------------------------start STD
//----------------- Hover transitional backgrounds and text for main header and header text
function HeaderBarTrans(headerImg, HeaderText) {
    document.getElementById("header_main").style.backgroundImage = headerImg
    document.getElementById("title-header").textContent = HeaderText;
}

//---------------------Mouse over effect for header image and text
document.getElementById("war-of-the-hallow-herd").onmouseover = function() {
    HeaderBarTrans("url(static/img/hallow_herd/hallow_banner.jpg)", "War of the Hallow Herd");
}

document.getElementById("tomb-of-annihilation").onmouseover = function() {
    HeaderBarTrans("url(static/img/tomb/toa_card.jpg)", "Tomb of Anihilation");
}
    
document.getElementById("temple-of-steve").onmouseover = function () {
    HeaderBarTrans("url(static/img/steve/temple_card.jpg)", "Temple of Steve");
};

//------------------mouse out effect for header image and text
document.getElementById("war-of-the-hallow-herd").onmouseout = function() {
    HeaderBarTrans("url(static/img/header.jpg)", "Role Players Guild")
}

document.getElementById("tomb-of-annihilation").onmouseout = function() {
    HeaderBarTrans("url(static/img/header.jpg)", "Role Players Guild")
}

document.getElementById("temple-of-steve").onmouseout = function() {
    HeaderBarTrans("url(static/img/header.jpg)", "Role Players Guild")
};


//---------------------------end STD-------------------------------
function hw() {
    console.log(document.getElementById("templeBody").offsetHeight);
    
    var hei = document.getElementById("templeBody").offsetHeight;
    
//    document.getElementsByClassName("guild-cover-top")[0].classList.add("guild-cover-top-act");
//    document.getElementsByClassName("guild-cover-top")[0].style.cssText = "height:" + hei + "px";
//    document.getElementsByClassName("guild-cover-bottom")[0].classList.add("guild-cover-bottom-act");    document.getElementsByClassName("guild-cover-bottom")[0].classList.add("guild-cover-bottom-act");
//    document.getElementsByClassName("guild-cover-top")[0].classList.add("templehide");
//    document.getElementsByClassName("guild-cover-bottom")[0].style.cssText = "height:" + hei + "px";

}

//document.getElementById("temple1").addEventListener("click", function(){
//    hw();
//});


//document.getElementById("temple1").addEventListener("click", function() {
//applythis();
//});

function applythis() {
    window.requestAnimationFrame(function() {
        document.querySelector(".col-12 .guild-cover-top").className = "col-12 guild-cover-top templehide";
    });
    setTimeout(function() {
        document.getElementById("temple-main").style.cssText = "display:none";
        document.getElementById("temple-tenets").style.cssText = "display:block";
    },1500);
}

function removethis() {
    window.requestAnimationFrame(function() {
        document.querySelector(".col-12 .guild-cover-top .templehide").className = "col-12 guild-cover-top";
    }); 
}

//---------------------------------------------------------------------
//temple of steve general tab mouse over and mouse out
var countGeneralTabs = document.querySelectorAll(".temple-cats");
countGeneralTabs.forEach(generalTabHoverEffect);

function generalTabHoverEffect(item, index) {   
    document.getElementsByClassName("temple-cats")[index].addEventListener('mouseover', function() {
        item.classList.add("actBorder");
    });
    document.getElementsByClassName("temple-cats")[index].addEventListener('mouseout', function() {
        item.classList.remove("actBorder");
    });
}
