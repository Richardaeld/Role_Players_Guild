console.log("Imlive!")

var findCommitList = document.querySelectorAll(".commit-box");

findCommitList.forEach(makeClick)

function makeClick(item, index){
    document.getElementsByClassName("commit-box")[index].addEventListener('click', function () {
        console.log("click" + index);
        var commitText = document.getElementsByClassName("commit-box")[index].textContent
        document.getElementById("form-expand-to").textContent = commitText;
    })
}

