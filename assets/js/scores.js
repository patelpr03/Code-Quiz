function printHighscores() {
  
  var highScores = JSON.parse(localStorage.getItem("highscores"));
  if(highScores != null){
    
    highScores.sort(function(a, b) {
      return parseInt(b.score) - parseInt(a.score);
    });
    //  score
    for(var i = 0; i < highScores.length; i++){
      
      var scoreLi = document.createElement("li");
      scoreLi.textContent = highScores[i].initials + " - " + highScores[i].score;
      
      document.getElementById("highscores").appendChild(scoreLi);
    }
    
  }
  else{
    var temp = document.getElementById("highscores");
    temp.textContent = "NO HIGH SCORES";     
  }
  
    
}

function clearHighscores() {
  // reload
  localStorage.removeItem("highscores");
  location.reload();
}


var clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function(){
  clearHighscores();
})
// printhighscore 
printHighscores();
