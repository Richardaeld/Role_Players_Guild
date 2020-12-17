// global variable(s)
var topicValue;

// listens for the topic count to change so it can trigger a dynamic count generator to create number of boxes user has selected
document.getElementById("topicCount").addEventListener('change', function() {
    // finds the value of the topic boxes user selects
    var topicValue = document.getElementById("topicCount").value;

    // Counts previous selected topic box count and removes them so the new set can get generated
    var oldInput = document.querySelector(".topicInsert")
    while (oldInput != null){
       document.querySelector(".topicInsert").remove()
       oldInput = document.querySelector(".topicInsert")
    }

    // Creates topic box(es) -(input node(s))- and generates the content for DB readability
    for(i=1; i< parseInt(topicValue) + 1 ; i++){    
        console.log(topicValue + " Im for value " + i);
        var topicInsert = document.createElement("input");
        topicInsert.className = "topicInsert"
        topicInsert.type = "text";
        topicInsert.id = "topic"+i
        topicInsert.name = "topic"+i
        topicInsert.minLength = 3
        topicInsert.maxLength = 15
        topicInsert.pattern = "^[a-zA-Z-0-9 ]{3,25}$"
        topicInsert.required = true;
        document.getElementById("topicCount").insertAdjacentElement("afterend", topicInsert);
    }
})
    
