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
//-----------------------------transition between general sections

var generalTabClick = document.querySelectorAll(".temple-span");
generalTabClick.forEach(generalTransition);

function generalTransition(item, index) {
    document.getElementsByClassName("temple-span")[index].addEventListener("click", function() {
        var generalHeight = document.getElementById("templeBody").offsetHeight;
        var generalWidth = document.getElementById("templeBody").offsetWidth;
        console.log(index);
        document.getElementsByClassName("general-cover")[0].style.cssText = "height:" + generalHeight + "px";
        setTimeout(function() {
            document.getElementsByClassName("general-cover")[0].style.cssText = "height: 0px"
//            document.getElementById("templeMain").classList.add("invisible");
//            document.getElementById("temple-tenets").classList.remove("invisible");            
            document.getElementById("templeMain").classList.add("general-display-none");
            document.getElementById("temple-tenets").classList.remove("general-display-none");
        },1500);
    });
}

document.getElementsByClassName("back-button")[0].addEventListener("click", function() {
    var generalHeight = document.getElementById("templeBody").offsetHeight;
    var generalWidth = document.getElementById("templeBody").offsetWidth;
    document.getElementsByClassName("general-cover")[0].style.cssText = "height:" + generalHeight + "px";
    setTimeout(function() {
        document.getElementsByClassName("general-cover")[0].style.cssText = "height: 0px"
//        document.getElementById("templeMain").classList.remove("invisible")
//        document.getElementById("temple-tenets").classList.add("invisible");            
        document.getElementById("templeMain").classList.remove("general-display-none");
        document.getElementById("temple-tenets").classList.add("general-display-none");
    },1500);
})

//function hw() {
//    console.log(document.getElementById("templeBody").offsetHeight);
//    var generalHeight = document.getElementById("templeBody").offsetHeight;
//    var generalWidth = document.getElementById("templeBody").offsetWidth;

//    document.getElementsByClassName("guild-cover-top")[0].classList.add("guild-cover-top-act");
//    document.getElementsByClassName("guild-cover-top")[0].style.cssText = "height:" + hei + "px";
//    document.getElementsByClassName("guild-cover-bottom")[0].classList.add("guild-cover-bottom-act");    
//    document.getElementsByClassName("guild-cover-bottom")[0].classList.add("guild-cover-bottom-act");
//    document.getElementsByClassName("guild-cover-top")[0].classList.add("templehide");
//    document.getElementsByClassName("guild-cover-bottom")[0].style.cssText = "height:" + hei + "px";

//}

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
//-----------------------------transition between general sections end
//---------------------------------------------------------------------
//temple of steve general tab mouse over and mouse out
var countGeneralTabs = document.querySelectorAll(".temple-cats");
countGeneralTabs.forEach(generalTabHoverEffect);


function generalTabHoverEffect(item, index) {   
    document.getElementsByClassName("temple-span")[index].addEventListener('mouseover', function() {
        item.childNodes[3].classList.add("actBorder");
    });

    document.getElementsByClassName("temple-span")[index].addEventListener('mouseout', function() {
        item.childNodes[3].classList.remove("actBorder");
        item.childNodes[3].classList.add("actBorderRev");
        setTimeout(function() {
            item.childNodes[3].classList.remove("actBorderRev");
        },3000)
    });

}



