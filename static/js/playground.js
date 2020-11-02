document.getElementById("ste").onclick = function () {
    document.getElementById("parch").classList.add("parchdis")
    document.getElementById("modal-cover").classList.add("parchdis")
}

document.getElementById("modal-cover").onclick = function() {
    document.getElementById("parch").classList.remove("parchdis")
    document.getElementById("modal-cover").classList.remove("parchdis")
}