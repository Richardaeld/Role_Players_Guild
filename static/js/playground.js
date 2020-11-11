//------------------Hand writting effect variables
var steveText = ["Have you heard of our diety? Oh you havent!? Cledus junior, JR is the savior of all of our meat bag sentience. You dont care? You still have to listen while I heal you.... Here, hold onto our pamphlet with your han...stump, yes with your stump. The pamphlet hurts your stump?  Its the pain of salvation, my child.  --Resident Advisor, Matt the 3rdish"];
var hallowText = ["The world's wilds have begun to turn and twist into horrific abominations! All is a shadow of its former self! Will our party survive the wilderness?"];
var tombText = ["We pay our adventurers in pure unadulterated treasure! Our expeditions are full of intrigue! Also posion, disease, and heaping handfuls of death! Fill our expeditions with willing hands! Please? We are literally dying out there...for you to join us!"];
var textArray = [];
var injectModalText = document.getElementById("modal-text");
var modalIndex = 0;
var modalLoc = document.querySelector("#parch");
var modalFilterLoc = document.querySelector("#modal-cover");

//-----------------listener for guild card clicks for modal calls
document.querySelector("#steve").addEventListener("click", steveCard, false);
document.querySelector("#hallow").addEventListener("click", hallowCard, false);
document.querySelector("#tomb").addEventListener("click", tombCard, false);


//--------------call specific index page modal card
function steveCard(){
    modalCard(steveText);
}

function hallowCard(){
    modalCard(hallowText);
}

function tombCard(){
    modalCard(tombText);
}

//------------------adds an invisible layer to 'disable' user mouse clicks
function disableMouse() {
    document.getElementsByClassName("coverCards")[0].classList.add("coverCardsAct"); 
    setTimeout(function() {
        document.getElementsByClassName("coverCards")[0].classList.remove("coverCardsAct");
    },6000);
}

//-----------------prints out text for modal and applies animation
function modalCard(text) {

    //disables off clicks during modal animation time
    disableMouse();
    
    //scales parchment modal to full size at appropiate time
    setTimeout(function() {
        document.querySelector("#parch").className = "col-11 col-md-6 parch cardOpen"; // Opens modal with cardopen class add
    },3000);
    
    //catches animation so it can be replayed and playes background cover layer expansion 
   // document.querySelector("#modal-cover").className = "col-12 modal-cover";
    window.requestAnimationFrame(function() {
        modalFilterLoc.className = "col-12 modal-cover modalBack"; //add modalback starts modal filer forward animation
    });

    //timer delay for text to fill on parchment modal
    setTimeout(function() {
        writeMe(text);
    }, 6000);
}

//---------------------Reverses animations for disappearing modal 
document.getElementById("modal-cover").onclick = function() {

    //disables mouse during modal animation time
    disableMouse();

    //reverses animation for modal to disappear
    //document.getElementById("parch").classList.add("boxRev");
    document.querySelector("#parch").className = "col-11 col-md-6 parch boxRev" //removes cardOpen and adds boxRev

    //catches animation so it can be replayed
    setTimeout(function() {
        window.requestAnimationFrame(function() {
            modalFilterLoc.className = "col-12 modal-cover modalBackRev"; //reverses modal filter
            });
     },3000);

     //stops settimeout function for playing
     clearTimeout(injectModalText.textContent);
    
     //clears out modal text content for reuse
    setTimeout(function() {
        injectModalText.textContent = "";
    },3000);

    //clears variable content for modal reuse
    textArray = [];
    modalIndex = 0;
}

//-------------takes a string and converts it to an array and applies it in a writting fashion to modals
function writeMe(text) {
    
    //make array for calling
    if (textArray.length == 0 ){
        for(i=0; i<text[0].length; i++) {
            textArray += text[0][i];
        };
    };

    //sets printing variable so its stoppablemodalIndex
    var p = setTimeout(function() {writeMe();},50);
    
    //prints to screen
    if(modalIndex != textArray.length && modalIndex < textArray.length){
        injectModalText.textContent += textArray[modalIndex]; 
        modalIndex++;
        p;
    }
   
    // stops writting if user off clicks
    document.getElementById("modal-cover").addEventListener("click", function(){
        clearTimeout(p);
    });

};

//----------------- Hover transitional backgrounds and text for main header and header text
function HeaderBarTrans(headerImg, HeaderText) {
    document.getElementById("header_main").style.backgroundImage = headerImg
    document.getElementById("title-header").textContent = HeaderText;
}

//---------------------Mouse over effect for header image and text
document.getElementById("war-of-the-hallow-herd").onmouseover = function() {
    HeaderBarTrans("url(static/img/hallow_herd/hallow_banner.jpg)", "War of the Hallow Herd");
}

document.getElementById("tomb-of-annihilation").onmouseover = function() {
    HeaderBarTrans("url(static/img/tomb/toa_card.jpg)", "Tomb of Anihilation");
}
    
document.getElementById("temple-of-steve").onmouseover = function () {
    HeaderBarTrans("url(static/img/steve/temple_card.jpg)", "Temple of Steve");
};

//------------------mouse out effect for header image and text
document.getElementById("war-of-the-hallow-herd").onmouseout = function() {
    HeaderBarTrans("url(static/img/header.jpg)", "Role Players Guild")
}

document.getElementById("tomb-of-annihilation").onmouseout = function() {
    HeaderBarTrans("url(static/img/header.jpg)", "Role Players Guild")
}

document.getElementById("temple-of-steve").onmouseout = function() {
    HeaderBarTrans("url(static/img/header.jpg)", "Role Players Guild")
};

