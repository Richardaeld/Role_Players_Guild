//------------------------------start STD
//----------------- Hover transitional backgrounds and text for main header and header text
//changes header image and text
function HeaderBarTrans(headerImg, HeaderText) {
    document.getElementById("header_main").style.backgroundImage = headerImg
    document.getElementById("title-header").textContent = HeaderText;
}
//sets "hover" effect to change header image and text
function installHeader(title, imgLoc, idLoc, outImgLoc, outTitleLoc){
        document.getElementById(idLoc).onmouseover = function(){
        HeaderBarTrans(imgLoc, title);
        }
        document.getElementById(idLoc).onmouseout = function(){
        HeaderBarTrans(outImgLoc, outTitleLoc);
        }
}
//pulls from an object to change all "hover" effects for Main Nav to change header image and text 
function allocateHeader() {
    var index = 0;
    for(i=0; i<headerInfo.length-1; i++){
        installHeader(headerInfo[index].title, headerInfo[index].imgLoc, headerInfo[index].idLoc, headerInfo[1].imgLoc, headerInfo[1].title)
        index++;
    }
}
// changes header according to which link mouse if hovering over
allocateHeader();
//---------------------------end STD-------------------------------
//-----------------------------transition between general sections

var generalTabClick = document.querySelectorAll(".temple-span");
var generalTab = document.querySelectorAll(".general-tab");

generalTabClick.forEach(generalTransition);
generalTab.forEach(generalBack)

function generalTransition(item, index) {
    document.getElementsByClassName("temple-span")[index].addEventListener("click", function() {
        var generalHeight = document.getElementById("header-span").offsetHeight;
        var generalWidth = document.getElementById("templeBody").offsetWidth;
        document.getElementsByClassName("general-cover")[0].style.cssText = "height:" + generalHeight + "px";
        document.getElementById("header-span").classList.add("header-title-div-fade")

        setTimeout(function() {
            document.getElementsByClassName("general-cover")[0].style.cssText = "height: 0px"
            document.getElementsByClassName("general-tab")[index].classList.remove("general-display-none");
            document.getElementsByClassName("general-tab")[index].classList.add("general-display-none-open");
            document.getElementById("temple-main").classList.add("general-display-none")
        },1500);
    });
}

function generalBack(item, index) {
    document.getElementsByClassName("back-button")[index].addEventListener("click", function() {
        var generalHeight = document.getElementById("header-span").offsetHeight;
        document.getElementsByClassName("general-cover")[0].style.cssText = "height:" + generalHeight + "px";
        document.getElementsByClassName("general-tab")[index].classList.add("header-title-div-fade")

        setTimeout(function() {
            document.getElementById("header-span").classList.remove("header-title-div-fade")
            document.getElementsByClassName("general-cover")[0].style.cssText = "height: 0px"          
            document.getElementsByClassName("general-tab")[index].classList.add("general-display-none");
            document.getElementById("temple-main").classList.remove("general-display-none")
        },1500);
    });
}


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
//-------------------------------------------------submission form----------------------------------


