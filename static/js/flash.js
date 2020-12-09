// removes the flash message after 3 seconds
var flashCheck = document.querySelector(".flash");
if (flashCheck != null){
    setTimeout(function() {
        console.log("removing")
        document.getElementsByClassName("flash")[0].classList.remove("flash");
    },3000);
}