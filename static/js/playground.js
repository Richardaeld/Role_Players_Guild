document.getElementById("ste").onclick = function () {
    document.getElementById("parch").classList.add("parchdis")
    document.getElementById("parch").classList.add("box")
    document.getElementById("parch").classList.add("box2")
    document.getElementById("modal-cover").classList.add("parchdis")
    document.getElementById("modal-cover").classList.add("box1")


}

document.getElementById("modal-cover").onclick = function() {
    document.getElementById("parch").classList.remove("parchdis")
    document.getElementById("parch").classList.remove("box")
    document.getElementById("modal-cover").classList.remove("parchdis")
    document.getElementById("modal-cover").classList.remove("box")
}