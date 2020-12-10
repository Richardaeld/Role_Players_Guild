//-------------------post data base CRUD function JS -----------------------------

// removes the flash message after 3 seconds
var flashCheck = document.querySelector(".flash");
if (flashCheck != null){
    setTimeout(function() {
        console.log("removing")
        document.getElementsByClassName("flash")[0].style.display = "none";
    },3000);
}


// set width of temple spans
var getitemWidth = document.getElementsByClassName("temple-cats")[0].offsetWidth;
var getSpanCount = document.querySelectorAll(".temple-span");
getSpanCount.forEach(setSpanWidth);

function setSpanWidth(item, index) {
    document.getElementsByClassName("temple-span")[index].style.cssText = "width:" + getitemWidth + "px";
}