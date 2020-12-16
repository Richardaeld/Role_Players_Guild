//-----------------------------transition between general section and tabs
var generalHeight = document.getElementById("header-span").offsetHeight; // grabs height of header (background)
var generalTabClick = document.querySelectorAll(".tab-span");
var generalTab = document.querySelectorAll(".topic-section");
//var generalTabReturn = "";  // NEW!! for add item -----ADD as a THIS item for reference

generalTabClick.forEach(generalTransition); // backdrop transition between general(home room) tab and genreal topic(form) screens
generalTab.forEach(generalBack)             // backdrop transition between general topic(form) and general(home room) tab screens

//---------------adds transition from general page to tab page
function generalTransition(item, index) {

    //adds listener to drop cover over screen and fade screen
    document.getElementsByClassName("tab-span")[index].addEventListener("click", function() {                           //listener install
        document.getElementsByClassName("topic-section-cover")[0].style.cssText = "height:" + generalHeight + "px";     //sets filter height
        document.getElementById("header-span").classList.add("header-title-div-fade");                                  //adds fade out to background
        
        //sets new background once cover(filter) is fully dropped
        setTimeout(function() {
            document.getElementsByClassName("topic-section-cover")[0].style.cssText = "height: 0px"                     //removes filter height
        //    document.getElementsByClassName("header-span")[1].classList.remove("header-title-div-fade")                  //adds fade out to background
            document.getElementsByClassName("topic-section")[index].classList.remove("general-display-none");           //enables next screen by removing display none
            //generalTabReturn = document.getElementsByClassName("topic-section")[index]; //-----NEW
        },1500);
    });
}

//-----------------adds transition from tab page to general page
function generalBack(item, index) {

    //adds listener to drop cover over screen and fade screen
    document.getElementsByClassName("back-button")[index].addEventListener("click", function() {                        //listener install
        document.getElementsByClassName("topic-section-cover")[0].style.cssText = "height:" + generalHeight + "px";     //sets filer height
        document.getElementsByClassName("topic-section")[index].classList.add("header-title-div-fade")                  //adds fade out to background
        
        //sets new background once cover(filter) is fully dropped
        setTimeout(function() {
            document.getElementsByClassName("topic-section-cover")[0].style.cssText = "height: 0px"                     
            document.getElementsByClassName("topic-section")[index].classList.add("general-display-none");
            document.getElementById("header-span").classList.remove("header-title-div-fade")
        },1500);
    });
}

//----------------------------- animation for hover svg effect 
//temple of steve general tab mouse over and mouse out
var countGeneralTabs = document.querySelectorAll(".tab");
countGeneralTabs.forEach(generalTabHoverEffect);

//starts forward wrapping border animation for the general tabs
function generalTabHoverEffect(item, index) {   
    document.getElementsByClassName("tab-span")[index].addEventListener('mouseover', function() {
        item.childNodes[3].classList.add("actBorder");
    });
    //starts reverse wrapping (unwrapping) border animation for the general tabs
    document.getElementsByClassName("tab-span")[index].addEventListener('mouseout', function() {
        item.childNodes[3].classList.remove("actBorder");
        item.childNodes[3].classList.add("actBorderRev");
        setTimeout(function() {
            item.childNodes[3].classList.remove("actBorderRev");
        },1500)
    });
}

//----------------------------further extends the body to match topic tab length
var tabLength = document.getElementsByClassName("header-title-bump")[0].offsetHeight

function setTabHeight() {
    document.getElementById("header_main").offsetHeight = tabLength
}

setTabHeight()

