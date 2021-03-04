//questions
var questions = [
    {
        title: "Which is NOT a commonly used data type?",
        choices: ["alerts", "booleans", "numbers", "strings"],
        answer: "alerts"
    },
    {
        title:"What is a useful tool used for debugging during the devement process?",
        choices:["terminal","c++","console.log","inner.html"],
        answer: "console.log"
    },
    {
        title:"Which seasons were considered Jordans best back to back championships?",
        choices:["92 to 93","96 to 97","90 to 91","jordan didnt win any back to back championships"],
        answer:"96 to 97"
    },
    {
        title:"string values must be inclosed with _______, when assigning to a variable",
        choices:["comma","square brackets","quotes","booleans"],
        answer:"quotes"
    },
];
//variables
var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var startTime = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var questionContainer = document.querySelector("#question-container");
var secondsLeft = 50;
var holdInterval = 0;
var penalty = 30;
var ulCreate = document.createElement("ul");
var userChoices = [];
//starts timer when start button is clicked
startTime.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function(){
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone ();
                currentTime.textContent = "times up";
            }
        },1000)
    }
    render(questionIndex);
});
//creates questions once start is clicked
function render(questionIndex) {
    startTime.style.display = "none";
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    var userQuestions = questions[questionIndex].title;
    var userChoices = questions[questionIndex].choices
    questionsDiv.textContent = userQuestions;
    questionsDiv.appendChild(ulCreate);
    userChoices.forEach(function (newItem) {
        console.log(newItem)
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })

}

//compares the answers with what the user selects
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", 'createDiv');
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct. The answer is: " + questions[questionIndex].answer;
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Sorry, wrong answer. The correct answer is: " + questions[questionIndex].answer;
        }
    }

    questionIndex++;
    //tells user their score
    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "You got " + score + "/" + questions.length + "Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}
//appends last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";
    //creates h1 heading
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done"

    questionsDiv.appendChild(createH1);
    //creates paragragh
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);
    //calculates seconds left and tells final score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your Final Score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }
    //creates label for initials
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);
    //creates input section for initials
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "submit");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);
    //creates submit button for highscore
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);
    //eventlistener for initials for highscore page
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if(initials === null) {

            console.log("No value entered");

        }else {
            var finialScore = {
                initials: initials,
                score: timeRemaining
            }

            console.log(finialScore);
            //stores highscore and initials in highscore
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            }else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finialScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            localStorage.setItem("initials", newScore);

            window.location.replace("./highscore.html");
        }
    })

}