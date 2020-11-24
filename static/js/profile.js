//for(i=0; i<profileMainCategory.length; i++){
//    console.log(profileMainCategory[i].title)
//}

//creates main categories

//function createMainCategories(){

//    for(i=0; i<profileMainCategory.length; i++){
//        var profileMainCat = document.getElementById("profile-main-cats")
//        var makeclass = document.createAttribute("class")
//        makeclass.value = "col-4 profile-categories"
//        var injectText = profileMainCategory[i].title; 


        //creates the external div node
//        profileMainCat.appendChild(document.createElement("div")).setAttributeNode(makeclass);

        //creates an internal p
//        var profileMainCatText = document.getElementsByClassName("profile-categories")[i]
//        profileMainCatText.appendChild(document.createElement("p")).textContent = injectText;
//    }
//}

//createMainCategories();   ----------------------   loading through pymongo

// creates and dynamically recreates

function createSubCategories(index) {

    for(i=0; i<profileSubCategory[0].length; i++){
        var profileSubCat = document.getElementById("profile-sub-cats")
        var makeClass = document.createAttribute("class")
        makeClass.value = "col-6 profile-sub-categories"
        var injectText = profileSubCategory[index][0];

        //create the external div node
        profileSubCat.appendChild(document.createElement("div")).setAttributeNode(makeClass);

        //creates an internal p
        var profileSubCatText = document.getElementsByClassName("profile-sub-categories")[i]
        profileSubCatText.appendChild(document.createElement("p")).textContent = injectText;
    }

}


// adds function to main category selection
var profileCatClick = document.querySelectorAll(".profile-categories");
profileCatClick.forEach(popSubCats)

//populate sub categories
function popSubCats (item, index) {
    
    //adds listener
    document.getElementsByClassName("profile-categories")[index].addEventListener("click", function() {
        if(document.getElementById("profile-sub-cats").hasChildNodes()){
            removeText()
            createSubCategories(index);
        }
    })
    
}

function removeText() {
    //for finding if their are child nodes
    var list1 = document.getElementsByClassName("profile-sub-categories")[0]
    //for counting amount of elements with this class
    var list2 = document.getElementsByClassName("profile-sub-categories")

    //checks if child nodes can exist
    if(list1 != undefined ){
//        console.log(list1.hasChildNodes())
//        console.log(list2.length)
        //loops through all child nodes and removes them
        for (i=0; i<list2.length; i++){
            list1.remove()
        }

    }
}

//mongodb test

