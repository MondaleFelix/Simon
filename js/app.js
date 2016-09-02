var code = [];
var score;
var difficulty;
var guesses = [];
var horn = new Audio("sounds/loser.mp3");
// Sound Variables
var colorSounds = [
  "sounds/greenSound.wav",
  "sounds/redSound.wav",
  "sounds/blueSound.wav",
  "sounds/yellowSound.wav"
];

var btnImages = [
  {up: 'images/greenButton.png', down: 'images/greenClick.png'},
  {up: 'images/redButton.png', down: 'images/redClick.png'},
  {up: 'images/blueButton.png', down: 'images/blueClick.png'},
  {up: 'images/yellowButton.png', down: 'images/yellowClick.png'}
];

var soundPlayer = new Audio();

var audios = [
  new Audio("sounds/greenSound.wav"),
  new Audio("sounds/redSound.wav"),
  new Audio("sounds/blueSound.wav"),
  new Audio("sounds/yellowSound.wav")
];





function render(){
  $('#score').html(score);
  $('#difficulty').html(difficulty);
}

// starts
var init = function(){
  score = 0;
  difficulty = 1;
  setCode();
  console.log(code);
  render();
  $("#lose").hide();
};
// pushes into code array
function setCode(){
  code = [];
  for (var i =0; i<difficulty; i++ ){
    code.push(Math.floor(Math.random() * 4));
  }
}

var codeCount;
var displayTimer;

// plays buttons
function displayCode(){
  // loop thru code array
  codeCount = 0;
  displayTimer = setInterval(function() {
    playCode();
    codeCount++;
  }, 1000);
  for (var i = 0; i > code.length; i++) {
    displayTimer;
  }
}

function playCode() {
  if (codeCount === code.length) {
    clearInterval(displayTimer);
  } else {
    var curSrc = $("[data-color-id=" + code[codeCount] + "]").attr('src');
    if (!curSrc || !curSrc.length) return;

    $("[data-color-id=" + code[codeCount] + "]").attr('src', curSrc.replace('Button', 'Click'));
    // play audio here
    soundPlayer.src = colorSounds[code[codeCount]];
    soundPlayer.play();
    setTimeout(function() {
      resetDisplay();
    }, 500);
  }
}

//this function resets the display from a clicked button to a regular button
function resetDisplay() {
  $("#redButton").attr("src", "images/redButton.png");
  $("#greenButton").attr("src", "images/greenButton.png");
  $("#yellowButton").attr("src", "images/yellowButton.png");
  $("#blueButton").attr("src", "images/blueButton.png");
}



 // check if wrong or correct
function checkWin(){
  if (guesses.toString() === code.toString()) {
    score = (score + (1 * difficulty)) ;
    render();
    for (var i =0; i<difficulty; i++ ){
      code.push(Math.floor(Math.random() * 4));
    }
    displayCode();
    guesses = [];
    console.log(code);
  }
}

// this is the start/middle button
$("#middleButton").click(function(evt){
  guesses = [];
  displayCode();
  score = 0;
  render();
  $("#lose").hide();
});

// this is the click function for all colored buttons
$("#blackCircle").on('click', ".simon-button", function(evt){
  var colorIdx = parseInt($(this).attr('data-color-id'));
  if (code[guesses.length] !== colorIdx) {
    horn.play();
    $("#lose").show();
  } else {
    guesses.push(colorIdx);
    audios[colorIdx].play();
    $(this).attr("src", btnImages[colorIdx].down);
    (function(idx) {
      setTimeout(function() {
        $("[data-color-id=" + idx + "]").attr("src", btnImages[idx].up);
      }, 100);
    })(colorIdx);
  }
  checkWin();
});

// This increases the difficulty and limits it to 10
$("#plus").click(function(click) {
  if (difficulty < 9){
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


$("#replay").click(function(evt){
  init();
});

init();
