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

var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var startTime = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var questionContainer = document.querySelector("#question-container");
var secondsLeft = 90;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");
var userChoices = [];

startTime.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function(){
            secondsLeft--;
            currentTime.textConent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone ();
                currentTime.textContent = "times up";
            }
        },1000)
    }
    render(questionIndex);
});

function render(questionIndex) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    for(var i = 0; questions.length; i++) {
        var userQuestions = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestions;
    }

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textconent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })

}

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

    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textConent = "End" + "" + "You got " + score + "/" + questions.length + "Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}

function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done"

    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your Final Score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("button");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "submit");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

}