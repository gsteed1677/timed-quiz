
//Question arrays - set for choices and answers     
var questions = [
    {
    title: "What US state has the most coast line?",
    choices: ["Texas", "Alaska",  "Florida", "Hawaii",],
    answer: "Alaska"
    },
{
    title: "What is the longest river in the US?",
    choices: ["Missouri", "Yukon", "Mississippi", "Ohio",],
    answer: "Missouri"
    },
{
    title: "What is the most populated city in the US?",
    choices: ["Dallas", "Chicago","LA", "New York City",],
    answer: "New York City"
    },
{
    title: "What is the most populated state in the US?",
    choices: ["Michigan", "California", "New York", "Texas",],
    answer: "California"
    },
{
    title: "What is the highest mountain peak in the US?",
    choices: ["Denali", "Mt. Whitney", "Mt. Rainier", "Gannett Peak",],
    answer: "Denali"
    },
{
    title: "What is the largest wildfire in US history?",
    choices: ["250,000 acres", "150,000 acres", "1.2 million acres", "3 million acres",],
    answer: "3 million acres"
    },

]



//Numeric variables for timer and  
var score = 0;
var currentQuestion = -1;
var timeRun = 0;
var timer;
var questionCount = 0;
var currentAnswer;

//timer function - set to 90 seconds
function start() {
    timeRun = 90;
    document.getElementById("timeLeft").innerHTML = timeRun;
//set interval to subtract time by 1 second
    timer = setInterval(function() {
        timeRun--;
        document.getElementById("timeLeft").innerHTML = timeRun;
        //if statement to stop game if the timer hits zero
        if (timeRun <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
    next();
}
//stop the timer to end the game 
function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h2>Game over!</h2>
    <h3>You got a ` + score +  `</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}


function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear!</button><button onclick="resetGame()">Play Again!</button>
    
    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

//reset the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        US Geography Quiz!
    </h1>
    <h3>
        Click to play!   
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//function to start asking questions
function next() {
    currentQuestion++;

       if (currentQuestion > questions.length - 1) {
        endGame()
        return;
    }

    var curQuestion = questions[currentQuestion]
    currentAnswer = questions[currentQuestion].answer
    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"
    

    document.getElementById("quizBody").innerHTML = quizContent;

    //clear out old choices
    document.getElementById("questionChoices").innerHTML = '';

    for (i = 0; i < curQuestion.choices.length; i++) {
        var currentChoice = curQuestion.choices[i]
        console.log(currentChoice)

        // create buttons for each choice
        var newButton = document.createElement("button")
        newButton.addEventListener('click', function(){
            grade(this.textContent, currentAnswer)
        })
        newButton.textContent = currentChoice
        // console.log(newButton)
        document.getElementById("questionChoices").appendChild(newButton);
        // console.log(document.getElementById("questionChoices"))
        }

        
}
//function to gather user answers and deduct points

function grade(currentChoice, currentAnswer) {
    if(currentChoice === currentAnswer)
    {
        score += timeRun
        alert("correct");
        console.log("correct")
    }
    else
    {
        score -=10;
        timeRun = timeRun -15;
        alert("incorrect");
        console.log("incorrect")
    }
    next()
}










