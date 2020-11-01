document.getElementById("steve").onclick = function() {
    document.getElementById("steve1").classList.add("flip")
    console.log(document.getElementById("steve1").classList)

}

document.getElementById("steve").onmouseover = function() {
    document.getElementById("steve1").classList.add("flip")
}

document.getElementById("steve").onmouseout = function() {
    document.getElementById("steve1").classList.remove("flip")
}

