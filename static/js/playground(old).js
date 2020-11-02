document.getElementById("steve").onclick = function() {
    document.getElementById("steve1").classList.add("flip")
    console.log(document.getElementById("steve1").classList)

}

document.getElementById("steve").onmouseenter = function() {
    document.getElementById("steve1").classList.add("flip")
}

document.getElementById("steve").onmouseleave = function() {
    document.getElementById("steve1").classList.remove("flip")
}

