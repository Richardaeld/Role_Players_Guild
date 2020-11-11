var headerInfo = [
    {
        title: "War of the Hallow Herd",
        imgLoc: "url(static/img/hallow_herd/hallow_banner.jpg)",
        idLoc: "war-of-the-hallow-herd"
    },{
        title: "Temple of Steve",
        imgLoc:"url(static/img/steve/temple_card.jpg)",
        idLoc: "temple-of-steve"
    },{
        title: "Tomb of Anihilation",
        imgLoc: "url(static/img/tomb/toa_card.jpg)",
        idLoc: "tomb-of-annihilation"
    },{
        title: "Role Players Guild",
        imgLoc:"url(static/img/header.jpg)",
        idLoc: "home"
    }
]

//demoed but failed to inject name into querySelector and text into function modalCard
//not an object error but a for loop error combined with .length
//didnt use for i (index) for index calls but an outside index(index) held within for loop

//function createIndexModal() {
//    var index = 0;  
//    for (i=0; i<guildCardText.length-1; i++){
//        console.log(index);
//        document.querySelector(guildCardText[index].name).addEventListener("click", function() {
//            modalCard(guildCardText[index].text);
//        });
//        index++
//    };
//}

var guildCardText = [
    {
        name: "#hallow",
        text: "The world's wilds have begun to turn and twist into horrific abominations! All is a shadow of its former self! Will our party survive the wilderness?",
        test1: 0
    },{
        name: "#steve",
        text: "Have you heard of our diety? Oh you havent!? Cledus junior, JR is the savior of all of our meat bag sentience. You dont care? You still have to listen while I heal you.... Here, hold onto our pamphlet with your han...stump, yes with your stump. The pamphlet hurts your stump?  Its the pain of salvation, my child.  --Resident Advisor, Matt the 3rdish",
        test1: 1
    },{
        name: "#tomb",
        text: "We pay our adventurers in pure unadulterated treasure! Our expeditions are full of intrigue! Also posion, disease, and heaping handfuls of death! Fill our expeditions with willing hands! Please? We are literally dying out there...for you to join us!",
        test1: 2
    }
]