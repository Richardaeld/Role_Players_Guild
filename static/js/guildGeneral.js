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

//----------function call--------  allocateHeader();

//---------------------------end STD-------------------------------
//-----------------------------transition between general section and tabs
var generalHeight = document.getElementById("header-span").offsetHeight;
var generalTabClick = document.querySelectorAll(".temple-span");
var generalTab = document.querySelectorAll(".general-tab");
var generalTabReturn = "";  // NEW!! for add item -----ADD as a THIS item for reference

generalTabClick.forEach(generalTransition);
generalTab.forEach(generalBack)

//---------------adds transition from general page to tab page
function generalTransition(item, index) {
    //adds listener to drop cover over screen and fade screen
    document.getElementsByClassName("temple-span")[index].addEventListener("click", function() {
        document.getElementsByClassName("general-cover")[0].style.cssText = "height:" + generalHeight + "px";
        document.getElementById("header-span").classList.add("header-title-div-fade")
        //sets new background once cover(filter) is fully dropped
        setTimeout(function() {
            document.getElementsByClassName("general-cover")[0].style.cssText = "height: 0px"
            document.getElementsByClassName("general-tab")[index].classList.remove("general-display-none");
            generalTabReturn = document.getElementsByClassName("general-tab")[index]; //-----NEW
            document.getElementById("temple-main").classList.add("general-display-none")
        },1500);
    });
}

//-----------------adds transition from tab page to general page
function generalBack(item, index) {
    //adds listener to drop cover over screen and fade screen
    document.getElementsByClassName("back-button")[index].addEventListener("click", function() {
        document.getElementsByClassName("general-cover")[0].style.cssText = "height:" + generalHeight + "px";
        document.getElementsByClassName("general-tab")[index].classList.add("header-title-div-fade")
        //sets new background once cover(filter) is fully dropped
        setTimeout(function() {
            document.getElementsByClassName("general-cover")[0].style.cssText = "height: 0px"          
            document.getElementsByClassName("general-tab")[index].classList.add("general-display-none");
            document.getElementById("header-span").classList.remove("header-title-div-fade")
            document.getElementById("temple-main").classList.remove("general-display-none")
        },1500);
    });
}

//-----------------------------transition between general sections end
//-----------------------------transition effects between general sections----------------------------------------
//temple of steve general tab mouse over and mouse out
var countGeneralTabs = document.querySelectorAll(".temple-cats");
countGeneralTabs.forEach(generalTabHoverEffect);

//starts forward wrapping border animation for the general tabs
function generalTabHoverEffect(item, index) {   
    document.getElementsByClassName("temple-span")[index].addEventListener('mouseover', function() {
        item.childNodes[3].classList.add("actBorder");
    });
    //starts reverse wrapping (unwrapping) border animation for the general tabs
    document.getElementsByClassName("temple-span")[index].addEventListener('mouseout', function() {
        item.childNodes[3].classList.remove("actBorder");
        item.childNodes[3].classList.add("actBorderRev");
        setTimeout(function() {
            item.childNodes[3].classList.remove("actBorderRev");
        },1500)
    });
}
//-------------------------------------------------submission form----------------------------------

