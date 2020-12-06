//------------------Hand writting effect variables
var textArray = [];
var modalIndex = 0;
var modalLoc = document.querySelector("#parch");
var modalFilterLoc = document.querySelector("#modal-cover");

//-----------------listener for guild card clicks for modal calls
    document.getElementById("add").addEventListener("click", additem, false);
//    document.getElementById("#hallow").addEventListener("click", hallowCard, false);
//    document.getElementById("#tomb").addEventListener("click", tombCard, false);

//-----------------prints out text for modal and applies animation
function additem() {
    //scales parchment modal to full size at appropiate time
    document.querySelector("#parch").className = "col-11 col-md-6 parch cardOpen"; // Opens modal with cardopen class add
    
    //catches animation so it can be replayed and playes background cover layer expansion 
    window.requestAnimationFrame(function() {
        modalFilterLoc.className = "col-12 modal-cover modalBack"; //add modalback starts modal filer forward animation
    });
    
    console.log("add item click")
}

//---------------------Reverses animations for disappearing modal 
document.getElementById("modal-cover").onclick = function() {

    //reverses animation for modal to disappear
    document.querySelector("#parch").className = "col-11 col-md-6 parch boxRev" //removes cardOpen and adds boxRev

    //catches animation so it can be replayed
    setTimeout(function() {
        window.requestAnimationFrame(function() {
            modalFilterLoc.className = "col-12 modal-cover modalBackRev"; //reverses modal filter
            });
     },3000);


}

//---------------------------------------------ADD TASK-----------------------------------------
var totalTabs = document.querySelectorAll(".general-tab").length;
var tabsSearch = document.querySelectorAll(".general-tab");

//tabsSearch.forEach(tabsSearched);

function tabsSearched(item, index) {
    var search = document.getElementsByClassName("general-tab")[index];
    if (item.className = "general-display-none"){
        console.log(true)
    }else{
        console.log(false)
    }
}

