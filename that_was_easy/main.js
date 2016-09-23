function sayThatWasEasy() {
    var thatWasEasy = new Audio("that_was_easy.mp3");
    thatWasEasy.play();
}

$("#easy").on("click", sayThatWasEasy);

$(document).keypress(delegateKeypress);

function delegateKeypress(event) {
    //For checking for keypresses via console
    //console.log(event.charCode);
    if(event.charCode == 32){
       $("#easy").trigger("click");
    }
    
}