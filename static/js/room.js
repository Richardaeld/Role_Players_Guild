console.log("Imlive!")

var findCommitList = document.querySelectorAll(".commit-box");

findCommitList.forEach(makeClick)


var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

newdate = year + "/" + month + "/" + day;

console.log(newdate);


function makeClick(item, index){
    document.getElementsByClassName("commit-box")[index].addEventListener('click', function () {
        console.log("click" + index);


    })
}