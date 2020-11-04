//listener for guild card clicks
document.querySelector("#ste").addEventListener("click", steveCard, false);

//prints out text for modal and applies animation
function steveCard() {

    setTimeout(function() {
        document.querySelector("#parch").className = "col-11 col-md-6 parch parchdis cardOpen";
    },3000);

    document.querySelector("#modal-cover").className = "col-12 modal-cover";
    window.requestAnimationFrame(function() {
        document.querySelector("#modal-cover").className = "col-12 modal-cover parchdis modalBack";
    });

    setTimeout(function() {
        writeMe();
    }, 6000);
}

//Reverses animations for disappearing modal 
document.getElementById("modal-cover").onclick = function() {
    document.getElementById("parch").classList.add("boxRev");
    document.querySelector("#parch").className = "col-11 col-md-6 parch"
    setTimeout(function() {
        window.requestAnimationFrame(function() {
            document.querySelector("#modal-cover").className = "col-12 modal-cover parchdis modalBackRev";
            });
     },3000);
}

// Hand writting effect 
var steveArray = [];
var steveText = ["Have you heard of our diety? Oh you havent!? Cledus junior, JR is the savior of all of our meat bag sentience. You dont care? You still have to listen while I heal you.... Here, hold onto our pamphlet with your han...stump, yes with your stump. The pamphlet hurts your stump?  Its the pain of salvation, my child.  --Resident Advisor, Matt the 3rdish"];
var steveInject = document.getElementById("startHere");
var steveIndex = 0;

//add variable text and location
function writeMe() {
    //make array for calling
    if (steveArray.length == 0 ){
        for(i=0; i<steveText[0].length; i++) {
            steveArray += steveText[0][i];
        };
    };
    
    //prints to screen
    if(steveIndex != steveArray.length && steveIndex < steveArray.length){
        steveInject.textContent += steveArray[steveIndex]; 
        steveIndex++;
        setTimeout(function() {
            writeMe();
        },50);
    }
};
