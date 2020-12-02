//---------------------------space maker for title header and rest of page
function titleSpace() {
var spacerWidth = document.getElementById("header_main").offsetWidth
document.getElementById("header-spacer").style.width = spacerWidth + "px"
}

titleSpace();

//-------------------------set height for title and body background (brickwall) and stops height at footer
function backgroundHeight() {
    var heightOne = document.getElementById("header_main").scrollHeight
    var heightTwo = document.getElementById("header-spacer").scrollHeight
    var heightThree = document.getElementById("index-section").scrollHeight
    var heightFour = document.getElementById("navBump").scrollHeight
    var setHeight = document.getElementById("background-img").style.height 

    var heightBase = document.getElementById("baseHeader").scrollHeight

//    console.log(heightOne + heightTwo + heightThree)
//    console.log(heightBody)
    //setHeight = heightOne + heightTwo + heightThree + "px";

console.log(heightOne)
console.log(heightTwo)
console.log(heightThree)
console.log(heightFour)


//document.getElementById("background-img").style.height = heightOne + heightTwo + heightThree + heightFour + "px"
document.getElementById("background-img").style.height = heightBase + heightThree + "px"
} 

backgroundHeight();


// places text shadow behind title text by adding height and width
function backgroundHeightCheck() {
    var heightOne = document.getElementById("header-text").offsetHeight
    var widthOne = document.getElementById("header-text").offsetWidth

    var setHeight = document.getElementById("background-img").style.height 
    var heightBase = document.getElementById("baseHeader").scrollHeight

console.log(heightOne + " height")
console.log(widthOne + " width")

document.getElementById("header-text-box").style.height = heightOne + "px"
document.getElementById("header-text-box").style.width = widthOne + "px"

} 

//backgroundHeightCheck();

//mouse over (hover) animation
document.getElementsByClassName("portal")[0].addEventListener('mouseover', function() {
    document.getElementsByClassName("door-open-right")[0].classList.add("door-right-open");
    document.getElementsByClassName("door-open-left")[0].classList.add("door-left-open");
});

document.getElementsByClassName("portal")[0].addEventListener('mouseout', function() {
    document.getElementsByClassName("door-open-right")[0].classList.remove("door-right-open");
    document.getElementsByClassName("door-open-left")[0].classList.remove("door-left-open")
})

//click function to about us page
document.getElementsByClassName("portal")[0].addEventListener('click', function() {
    
})