//-------------------post data base CRUD function JS -----------------------------

// removes the flash message after 3 seconds
var flashCheck = document.querySelector(".flash");
if (flashCheck != null){
    setTimeout(function() {
        document.getElementsByClassName("flash")[0].style.display = "none";
    },3000);
}


// set width of general tab(general home room)  
var getSpanCount = document.querySelectorAll(".tab-span");
getSpanCount.forEach(setSpanWidth);

function setSpanWidth(item, index) {
    var getitemWidth = document.getElementsByClassName("tab")[0].offsetWidth;
    
    document.getElementsByClassName("tab-span")[index].style.cssText = "width:" + getitemWidth + "px";
}