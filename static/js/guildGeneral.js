
function hw() {
    console.log(document.getElementById("templeBody").offsetHeight);
    
    var hei = document.getElementById("templeBody").offsetHeight;
    
//    document.getElementsByClassName("guild-cover-top")[0].classList.add("guild-cover-top-act");
//    document.getElementsByClassName("guild-cover-top")[0].style.cssText = "height:" + hei + "px";
//    document.getElementsByClassName("guild-cover-bottom")[0].classList.add("guild-cover-bottom-act");    document.getElementsByClassName("guild-cover-bottom")[0].classList.add("guild-cover-bottom-act");
//    document.getElementsByClassName("guild-cover-top")[0].classList.add("templehide");
//    document.getElementsByClassName("guild-cover-bottom")[0].style.cssText = "height:" + hei + "px";

}

document.getElementById("temple1").addEventListener("click", function(){
    hw();
});


document.getElementById("temple1").addEventListener("click", function() {
applythis();
});

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