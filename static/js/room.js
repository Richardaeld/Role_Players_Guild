console.log("Imlive!")

var findCommitList = document.querySelectorAll(".commit-box");

findCommitList.forEach(makeClick)

function makeClick(item, index){

    //makes the text appear in the larger, full detail commit box
    document.getElementsByClassName("commit-box")[index].addEventListener('click', function () {
        var commitText = document.getElementsByClassName("commit-box-content")[index].textContent
        document.getElementById("form-expand-to").textContent = commitText;    
    })
    var commitBrief = document.getElementsByClassName("commit-box-brief")[index].textContent.slice(0,50);
    document.getElementsByClassName("commit-box-brief")[index].textContent = commitBrief
}


