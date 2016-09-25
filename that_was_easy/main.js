//That Was Easy
function sayThatWasEasy() {
    var thatWasEasy = new Audio("that_was_easy.mp3");
    thatWasEasy.play();
}
$("#easy").on("click", sayThatWasEasy);

//Big Foig
function sayBigFoig() {
    var bigFoig = new Audio("BigFoig.mp3");
    bigFoig.play();
}
$("#bigfoig").on("click", sayBigFoig);



$(document).keypress(delegateKeypress);

function delegateKeypress(event) {
    //For checking for keypresses via console
    //console.log(event.charCode);
    if(event.charCode == 32){
       $("#easy").trigger("click");
    }
    if(event.charCode == 65){
        $("#bigfoig").trigger("click");
    }
    
}


