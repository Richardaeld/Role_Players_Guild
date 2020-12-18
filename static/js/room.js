console.log("Imlive!")

//------pre carousel trials
var carousel = document.querySelectorAll(".carousel-entry"); // NEEDED FOR CAROUSEL!!

var findTotal = carousel.length// NEEDED FOR CAROUSEL!!
var totalGroupsOfThree = findTotal / 3// NEEDED FOR CAROUSEL!!
console.log(findTotal + " find total")
console.log(totalGroupsOfThree + " total groups")
console.log( (1*3) * (1 , 2, 3))


// -------------------------Carousel-----------------------
//sets variables for scrolling/moving
var carouselPrev = 1;
var carouselPlace = 1;
//reveals the first three entries 
for(i=1; i <4; i++){
    document.getElementsByClassName("carousel-entry")[(i*carouselPlace)-1].classList.remove("make-invis")
}
carouselPlace++

// allows for carousel to have next function for scrolling
document.getElementsByClassName("carousel-end")[0].addEventListener('click', function() {

    for(i=1; i<4; i++){
        console.log(i + " Im first loop")
        document.getElementsByClassName("carousel-entry")[(i*carouselPrev)-1].classList.add("make-invis")
    }
    carouselPrev++
    
    if(totalGroupsOfThree < carouselPrev){
        carouselPrev = 1
    }

    for (i=1; i<4; i++){
        console.log(i + " Im second loop")

        document.getElementsByClassName("carousel-entry")[(i*carouselPlace)-1].classList.remove("make-invis")    
    }
    carouselPlace++
    
    if(totalGroupsOfThree < carouselPlace){
        carouselPlace = 1
    }


})

// allows for carousel to have previous function for scrolling
document.getElementsByClassName("carousel-start")[0].addEventListener('click', function() {

    for(i=1; i<4; i++){
        console.log(i + " Im first loop")
        document.getElementsByClassName("carousel-entry")[(i*carouselPrev)-1].classList.add("make-invis")
    }
    carouselPrev--
    
    if(0 == carouselPrev){
        carouselPrev = totalGroupsOfThree
    }

    for (i=1; i<4; i++){
        console.log(i + " Im second loop")

        document.getElementsByClassName("carousel-entry")[(i*carouselPlace)-1].classList.remove("make-invis")    
    }
    carouselPlace--
    
    if(0 == carouselPlace){
        carouselPlace = totalGroupsOfThree
    }


})


//----------------------------------------------------------



//-----------allows the brief description boxes to transfer to the full description box----------------
carousel.forEach(makeCarousel);
//document.getElementsByClassName("carousel-entry")[index].classList.remove("make-invis")
function makeCarousel (item, index){
}

var findCommitList = document.querySelectorAll(".commit-box");
findCommitList.forEach(makeClick)
function makeClick(item, index){
    
    //makes the text appear in the larger, full detail commit box
    document.getElementsByClassName("commit-box")[index].addEventListener('click', function () {
        var commitText = document.getElementsByClassName("commit-box-content")[index].textContent
        document.getElementById("form-expand-to").textContent = commitText;    
    })
    var commitBrief = document.getElementsByClassName("commit-box-brief")[index].textContent.slice(0,75);
    document.getElementsByClassName("commit-box-brief")[index].textContent = commitBrief
}
//-----------------------------------------------------------