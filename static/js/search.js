//------------------------------ NavBar

document.getElementById("search-button").addEventListener('mouseover', function() {
    document.getElementById("navSearch").classList.remove('make-invis');
    setTimeout(function() {
        document.getElementById("search-icon").disabled = false;
    },500)
});



//remove search box on mouse out
document.getElementById("custom-nav").addEventListener('mouseout', function() {
    var timeOut = 4000
    //timer to count down
    var cancelme;
    
    function countDown() {
        timeOut = timeOut - 1000;
        console.log(timeOut)
        
        //when time reaches 0 condition
        if(timeOut <= 0){
            document.getElementById("navSearch").classList.add("make-invis");
            document.getElementById("search-icon").disabled = true;
            return
        }
        // catches function as variable to cancel if needed to        
        cancelme = setTimeout(countDown, 1000)
    }
    
    countDown();

    document.getElementById("navSearch").addEventListener('mouseenter', function() {
        console.log("stop timer")
        clearTimeout(cancelme);    
        return
    })

})

