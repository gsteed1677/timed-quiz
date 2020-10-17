
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
            stopGame(); 
        }
    }, 1000);
    next();
}
//function to start asking questions
function next() {
    currentQuestion++;
    var curQuestion = questions[currentQuestion]

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"


    document.getElementById("quizBody").innerHTML = quizContent;

    for (i = 0; i < curQuestion.choices.length; i++) {
        var currentChoice = curQuestion.choices[i]
        console.log(currentChoice)

        // create buttons for each choice
        var newButton = document.createElement("button")
        newButton.textContent = currentChoice
        document.getElementById("questionChoices").appendChild = newButton;
    }



}




//timer going down if wrong answer
if (answer === userAnswer) {
  nextQuestion();
} else {
  nextQuestion();
  counter = counter - 10;
}









