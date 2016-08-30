console.log("oranges");
var code;
var score;
var difficulty;
var guesses;
// Sound Variables
var colorSounds = [
  "sounds/greenSound.wav",
  "sounds/redSound.wav",
  "sounds/blueSound.wav",
  "sounds/yellowSound.wav"

];

var soundPlayer = new Audio();

var blueSound = new Audio("sounds/blueSound.wav");
var yellowSound = new Audio("sounds/yellowSound.wav");
var redSound = new Audio("sounds/redSound.wav");
var greenSound = new Audio("sounds/greenSound.wav");



// var colors = [
//   {name: 'Green', image: 'images/greenButton.png'},
//   {name: 'Red', image: 'images/redButton.png'},
//   {name: 'Blue', image: 'images/blueButton.png'},
//   {name: 'Yellow', image: 'images/yellowButton.png'}
// ];

function render(){
  $('#score').html(score);
}

var init = function(){
  score = 0;
  difficulty = 300;
  setCode();
  console.log(code);
  render();
};

function setCode(){
  code = [];
  for (var i =0; i<difficulty; i++ ){
    code.push(Math.floor(Math.random() * 4));
  }
}

var codeCount;
var displayTimer;
function displayCode(){
  // loop thru code array
  codeCount = 0;
  playCode();
  codeCount++;
  displayTimer = setInterval(function() {
    playCode();
    codeCount++;
  }, 1000);
}

function playCode() {
  if (codeCount === difficulty) {
    clearInterval(displayTimer);
  } else {
    var curSrc = $("[data-color-id=" + code[codeCount] + "]").attr('src');
    $("[data-color-id=" + code[codeCount] + "]").attr('src', curSrc.replace('Button', 'Click'));
    // play audio here
    soundPlayer.src = colorSounds[code[codeCount]];
    soundPlayer.play();
    setTimeout(function() {
      resetDisplay();
    }, 500);
  }
}

function resetDisplay() {
  $("#redButton").attr("src", "images/redButton.png");
  $("#greenButton").attr("src", "images/greenButton.png");
  $("#yellowButton").attr("src", "images/yellowButton.png");
  $("#blueButton").attr("src", "images/blueButton.png");
}


//handleGuess(colorIdx){
  //guesses.push(colorIdx);
 // }  // check if wrong or correct



$("#middleButton").click(function(evt){
  guesses = [];
  displayCode();
});


$("#redButton").click(function(click) {
  redSound.play();
  $("#redButton").attr("src", "images/redClick.png");
  setTimeout(function() {
    $("#redButton").attr("src", "images/redButton.png");
  }, 100);
//  handleGuess(1);
});

$("#greenButton").click(function(click) {
  greenSound.play();
  $("#greenButton").attr("src", "images/greenClick.png");
  setTimeout(function() {
    $("#greenButton").attr("src", "images/greenButton.png");
  }, 100);
  //handleGuess(0);
});

$("#yellowButton").click(function(click) {
  yellowSound.play();
  $("#yellowButton").attr("src", "images/yellowClick.png");
  setTimeout(function() {
    $("#yellowButton").attr("src", "images/yellowButton.png");
  }, 100);
 // handleGuess(3);
});

$("#blueButton").click(function(click) {
  blueSound.play();
  $("#blueButton").attr("src", "images/blueClick.png");
  setTimeout(function() {
    $("#blueButton").attr("src", "images/blueButton.png");
  }, 100);
 // handleGuess(2);
});

init();
