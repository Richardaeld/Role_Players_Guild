for(i=0; i<profileMainCategory.length; i++){
    console.log(profileMainCategory[i].title)
}

//creates main categories

var cardContainer = document.getElementById("test123")
var cardInternal = document.getElementsByClassName("yoda")[0]
var setClasses = document.createAttribute("class")
setClasses.value = "laksjdfklajs;dlfjas;ljdf;laskdf;laskjdf;lkasdfja;f;ljdkasjhgkljhaskg"


//creates the external div node
cardContainer.appendChild(document.createElement("div")).setAttributeNode(setClasses);
//creates an internal div
//cardInternal.appendChild(document.createElement("div")).setAttributeNode(setClasses)
