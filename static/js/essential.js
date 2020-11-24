

//extends footer background to bottom of screen  for responsiveness
var pageHeight = document.body.offsetHeight;
var screenHeight = window.screen.height;

if (pageHeight < screenHeight){
var footHeight = document.getElementById("footer").offsetHeight;
var pushMe = screenHeight - pageHeight;
    document.getElementById("footer").style.height = (footHeight + pushMe) + "px";
}