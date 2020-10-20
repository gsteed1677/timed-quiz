
//Question arrays - set for choices and answers     
var questions = [
  {
    title: "What US state has the most coast line?",
    choices: ["Texas", "Alaska", "Florida", "Hawaii",],
    answer: "Alaska"
  },
  {
    title: "What is the longest river in the US?",
    choices: ["Missouri", "Yukon", "Mississippi", "Ohio",],
    answer: "Missouri"
  },
  {
    title: "What is the most populated city in the US?",
    choices: ["Dallas", "Chicago", "LA", "New York City",],
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


function timerInterval () {
  timeRun--;
  const displayValue = timeRun < 0 ? 0 : timeRun; // Don't show negative time on the page
  document.getElementById("timeLeft").innerHTML = displayValue;
  //if statement to stop game if the timer hits zero
  if (timeRun <= 0) {
    clearInterval(timer);
    endGame();
  }
}

//timer function - set to 60 seconds
function start() {
  timeRun = 60;
  document.getElementById("timeLeft").innerHTML = timeRun;
  //set interval to subtract time by 1 second
  timer = setInterval(timerInterval, 1000); // refactor into seperate function for readability
  next();
}


//pushes endGame function if timer hits zero or if player runs through all the questions
function endGame() {
  clearInterval(timer);

  const currentHighScore = localStorage.getItem('highscore');

  const isHighScore = Number(score) >= Number(currentHighScore);

  const quizContent = isHighScore ?
      `
      <h2>Game over!</h2>
      <h3>You got a ${score} /60 </h3>
      <input type="text" id="name" placeholder="First name"> 
      <button onclick="setScore()">Set score!</button>` :
      `
      <h2>Game over!</h2>
      <h3>You got a ${score} /60 </h3>
      <button onclick="resetGame()">Play Again!</button>
      `;

  document.getElementById("quizBody").innerHTML = quizContent;
  document.getElementById("questionChoices").innerHTML = '';

}

//store the scores on local storage
function setScore() {
  const name = document.getElementById('name').value;
  localStorage.setItem("highscore", score);
  localStorage.setItem("highscoreName", name);
  getScore();
}

//function to bring in quizContent to local storage 
function getScore() {
  const highScoreName = localStorage.getItem("highscoreName");
  const highscore = localStorage.getItem("highscore");
  const quizContent = `
    <h2>${highScoreName}'s highscore is:</h2>
    <h1>${highscore}</h1><br> 
    <button onclick="clearScore()">Clear!</button><button onclick="resetGame()">Play Again!</button>
    `;
  document.getElementById("quizBody").innerHTML = quizContent;
}

//function set to Clear score if button is pressed and resets the game for them to play again
function clearScore() {
  //push to local storage again
  localStorage.setItem("highscore", "");
  localStorage.setItem("highscoreName", "");
  resetGame();
}

//function to restart the game
function resetGame() {
  clearInterval(timer);
  score = 0;
  currentQuestion = -1;
  timeLeft = 0;
  timer = 0;

  document.getElementById("timeLeft").innerHTML = timeLeft;
  //build out the content from html to just reset the game to first page
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

  if (currentQuestion === questions.length - 1) {
    endGame()
    return;
  }

  currentQuestion++;

  const curQuestion = questions[currentQuestion]
  const currentAnswer = questions[currentQuestion].answer
  const title = questions[currentQuestion].title;
  var quizContent = `<h2>${title}</h2>`

  document.getElementById("quizBody").innerHTML = quizContent;

  //clear out old choices
  document.getElementById("questionChoices").innerHTML = '';

  // loops over each answer option and renders to page
  for (i = 0; i < curQuestion.choices.length; i++) {
    var currentChoice = curQuestion.choices[i]
    // create buttons for each choice
    var newButton = document.createElement("button")
    newButton.addEventListener('click', function () {
      grade(this.textContent, currentAnswer)
    })
    newButton.textContent = currentChoice
    document.getElementById("questionChoices").appendChild(newButton);
  }



}

//function to gather user answers and deduct points
function grade(currentChoice, currentAnswer) {
  if (currentChoice === currentAnswer) {
    score += 10;
    alert("correct");
    console.log("correct")
  }
  else {
    timeRun = timeRun - 15;
    alert("incorrect");
    console.log("incorrect")
  }
  next()
}
