console.log("oranges");
var code = [];
var score;
var difficulty;
var guesses = [];
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
  $('#difficulty').html(difficulty);
}

var init = function(){
  score = 0;
  difficulty = 1;
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
// }
// lose();

// function lose(){
//   if (code === guesses)
//     displayCode();
//   else {
//     alert('loser');
//   }

// }



 // check if wrong or correct

function checkWin(){
  if (guesses.toString() === code.toString()) {
    score = (score + (1 * difficulty)) ;
    render();
  } else
    //alert("you fuckn lose");
;}


$("#middleButton").click(function(evt){
  guesses = [];
  displayCode();
  score = 0;
  render();
});

$("#blackCircle").on('click', ".simon-button", function(){
  if ($(this).attr('id') === "greenButton"){
    guesses.push(0);
    greenSound.play();
    $("#greenButton").attr("src", "images/greenClick.png");
    setTimeout(function() {
      $("#greenButton").attr("src", "images/greenButton.png");
    }, 100);
  }else if  ($(this).attr('id') === "redButton"){
    guesses.push(1);
    redSound.play();
    $("#redButton").attr("src", "images/redClick.png");
    setTimeout(function() {
      $("#redButton").attr("src", "images/redButton.png");
    }, 100);
  }else if  ($(this).attr('id') === "blueButton"){
    guesses.push(2);
    blueSound.play();
    $("#blueButton").attr("src", "images/blueClick.png");
    setTimeout(function() {
      $("#blueButton").attr("src", "images/blueButton.png");
    }, 100);
  }else if  ($(this).attr('id') === "yellowButton"){
    guesses.push(3);
    yellowSound.play();
    $("#yellowButton").attr("src", "images/yellowClick.png");
    setTimeout(function() {
      $("#yellowButton").attr("src", "images/yellowButton.png");
    }, 100);
  }
  easterEgg();
  checkWin();

});


          // This is the red button stuff
// $("#redButton").click(function(click) {
//   guesses.push(1);
//   redSound.play();
//   $("#redButton").attr("src", "images/redClick.png");
//   setTimeout(function() {
//     $("#redButton").attr("src", "images/redButton.png");
//   }, 100);
// //  handleGuess(1);
// });

//           // This is the green button stuff
// $("#greenButton").click(function(click) {
//   guesses.push(0);
//   greenSound.play();
//   $("#greenButton").attr("src", "images/greenClick.png");
//   setTimeout(function() {
//     $("#greenButton").attr("src", "images/greenButton.png");
//   }, 100);
//   //handleGuess(0);
// });

          // This is the yellow button stuff
// $("#yellowButton").click(function(click) {
//   guesses.push(3);
//   yellowSound.play();
//   $("#yellowButton").attr("src", "images/yellowClick.png");
//   setTimeout(function() {
//     $("#yellowButton").attr("src", "images/yellowButton.png");
//   }, 100);
//  // handleGuess(3);
// });
//           // This is the blue button stuff
// $("#blueButton").click(function(click) {
//   guesses.push(2);
//   blueSound.play();
//   $("#blueButton").attr("src", "images/blueClick.png");
//   setTimeout(function() {
//     $("#blueButton").attr("src", "images/blueButton.png");
//   }, 100);
//  // handleGuess(2);
// });

// This increases the difficulty and limits it to 10
$("#plus").click(function(click) {
  if (difficulty < 10){
    difficulty++;
    setCode();
    render();
    console.log(code);
  }

});
// This decreases the difficulty and limits it to 1
$("#minus").click(function(click) {
  if (difficulty > 1){
    difficulty--;
    setCode();
    render();
    console.log(code);
  }
});

var egg = [0,1,2,3];

function easterEgg(){
  if (guesses.toString() === egg.toString()) {
    alert("something creative");
  }
}

init();
