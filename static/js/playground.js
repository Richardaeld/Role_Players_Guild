//------------------Hand writting effect variables
var steveText = ["Have you heard of our diety? Oh you havent!? Cledus junior, JR is the savior of all of our meat bag sentience. You dont care? You still have to listen while I heal you.... Here, hold onto our pamphlet with your han...stump, yes with your stump. The pamphlet hurts your stump?  Its the pain of salvation, my child.  --Resident Advisor, Matt the 3rdish"];
var hallowText = ["The world's wilds have begun to turn and twist into horrific abominations! All is a shadow of its former self!"];
var tombText = ["We pay our adventurers in pure unadulterated treasure! Our expeditions are full of intrigue! Also posion, disease, and heaping handfuls of death! Fill our expeditions with willing hands! Please? We are literally dying out there...for you to join us!"];
var textArray = [];
var injectModal = document.getElementById("startHere");
var modalIndex = 0;

//-----------------listener for guild card clicks
document.querySelector("#steve").addEventListener("click", steveCard, false);
document.querySelector("#hallow").addEventListener("click", hallowCard, false);
document.querySelector("#tomb").addEventListener("click", tombCard, false);


//--------------call specific card
function steveCard(){
    modalCard(steveText);
}

function hallowCard(){
    modalCard(hallowText);
}

function tombCard(){
    modalCard(tombText);
}
//-----------------prints out text for modal and applies animation
function modalCard(text) {
    
    setTimeout(function() {
        document.querySelector("#parch").className = "col-11 col-md-6 parch parchdis cardOpen";
    },3000);
    
    document.querySelector("#modal-cover").className = "col-12 modal-cover";
    window.requestAnimationFrame(function() {
        document.querySelector("#modal-cover").className = "col-12 modal-cover parchdis modalBack";
    });
    
    setTimeout(function() {
        writeMe(text);
    }, 6000);
}

//---------------------Reverses animations for disappearing modal 
document.getElementById("modal-cover").onclick = function() {
    document.getElementById("parch").classList.add("boxRev");
    document.querySelector("#parch").className = "col-11 col-md-6 parch"

    setTimeout(function() {
        window.requestAnimationFrame(function() {
            document.querySelector("#modal-cover").className = "col-12 modal-cover parchdis modalBackRev";
            });
     },3000);

     clearTimeout(document.getElementById("startHere").textContent);

    document.getElementById("startHere").textContent = "";
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
        injectModal.textContent += textArray[modalIndex]; 
        modalIndex++;
        p;
    }
   
    // stops writting if user off clicks
    document.getElementById("modal-cover").addEventListener("click", function(){
        clearTimeout(p);
    });

};
