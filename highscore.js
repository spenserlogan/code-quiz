//variables
var highScore = document.querySelector("#highscore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#go-back");
//eventlistener to clear scores on localstorage
clear.addEventListener("click", function () {
    localStorage.clear ();
    location.reload;
});
//retreives local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for(var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}
//eventlistener to return to index.html
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});