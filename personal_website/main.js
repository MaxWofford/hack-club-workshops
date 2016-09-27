function playMusic()
{
    var music = new Audio("HealingBossa.mp3");
    music.play();
}

$("#Purposeless").on("click", playMusic);