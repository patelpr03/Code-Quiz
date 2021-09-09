
// variables to reference  elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
var Rightans = new Audio("assets/right-ans.mp3");
var Wrongans = new Audio("assets/wrong-ans.mp3");

function startQuiz() {
  // hide screen
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "start hide");


  questionsEl.setAttribute("class", " ");

  //  timer
  timerId = setInterval(function(){
    clockTick();
  }, 1000);
  // show starting time
  timerEl.textContent = time;

  getQuestion();
}
var timeRemaining = 75;

function timerStart(){
    var quizInterval = setInterval(function(){
        timeRemaining--;
        $(".timer").text("Time: " + timeRemaining)

        if( timeRemaining <= 0 ){
            clearInterval(quizInterval)
        }
    }, 1000)
}

function getQuestion() {
  
  var currentQuestion = questions[currentQuestionIndex];
  
  questionsEl.children[0].textContent = currentQuestion.title;
  
  while (choicesEl.hasChildNodes()) {
    choicesEl.removeChild(choicesEl.lastChild);
  }
  
  for(var i = 0; i < currentQuestion.choices.length; i++){

    
    var choiceButton = document.createElement("button");
    choiceButton.textContent = currentQuestion.choices[i];
    
    
    choicesEl.appendChild(choiceButton);
  }
  // each choice
  choicesEl.children[0].addEventListener("click", function(event){
    questionClick(choicesEl.children[0]);
  });
  choicesEl.children[1].addEventListener("click", function(event){
    questionClick(choicesEl.children[1]);
  });
  choicesEl.children[2].addEventListener("click", function(event){
    questionClick(choicesEl.children[2]);
  });
  choicesEl.children[3].addEventListener("click", function(event){
    questionClick(choicesEl.children[3]);
  });
}

function questionClick(answerChoice) {
    
  if(answerChoice.textContent != questions[currentQuestionIndex].answer){
    
    time -= 10;
    
    feedbackEl.textContent = "Incorrect";
    
   Wrongans.play();
  }
   
  else{
    
    feedbackEl.textContent = "Correct";
    Rightans.play();
  }

 
  feedbackEl.setAttribute("class", "feedback");
  setInterval(function(){
    feedbackEl.setAttribute("class", "feedback hide");
  }, 500);

  //  next question
  currentQuestionIndex++;

  
  if(currentQuestionIndex === questions.length)
    
    quizEnd();
   
  else
    
    getQuestion();
}

function quizEnd() {
  
  clearInterval(timerId);
  timerEl.textContent = time;

  
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.setAttribute("class", " ");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  
  time--;
  timerEl.textContent = time;

  
  if(time <= 0)
    quizEnd();
  
}

function saveHighscore() {
  // get value 
  var initials = initialsEl.value.toUpperCase();
  // should not empty
  if(initials === ""){ 
    alert("Input mustn't be blank'");
    return;
  }
  else if(initials.length > 5){
    alert("Input must be no more than 5 characters");
    return;
  }
  else{
    //  saved scores from localstorage
    var highscores;
    if(JSON.parse(localStorage.getItem("highscores")) != null)
      highscores = JSON.parse(window.localStorage.getItem("highscores"));
    else
      highscores = [];
    

    var newScore = {
      initials: initials,
      score: time
    };
    highscores.push(newScore);
    // save 
    localStorage.setItem("highscores", JSON.stringify(highscores));
    //  next page
    location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  
    // saveHighscore
    if(event.keyCode === 15)
      saveHighscore();
}


submitBtn.onclick = saveHighscore;

//  clicks  to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
