// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
p5.disableFriendlyErrors = true;
var startGameInterval;

function openNav(state = "Sperms Menu") {
  clearInterval(startGameInterval);
  isPaused = true;
  document.getElementById("mySidenav").style.width = "500px";
  document.getElementById("main").style.marginLeft = "500px";
  document.getElementById("overlayDiv").style.background = "#00000083";
  document.getElementById("MenuOpenButtonId").innerHTML = "Paused";
  document.getElementById("gameStateText").innerHTML = state;
}

function closeNav() {
  clearInterval(startGameInterval);
  // startGameTimerFunction = setTimeout(startTheGame, startGameDelay);
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("overlayDiv").style.background = "#00000000";
  document.getElementById("MenuOpenButtonId").innerHTML = "&#9776; Pause";
  gameStartTimer();
}

// function startTheGame() {
//   isPaused = false;
//   clearTimeout(startGameTimerFunction);
// }

function gameStartTimer() {
  var i = startGameDelay;
  document.getElementById("stateText").innerHTML = i;
  startGameInterval = setInterval(function() {
    i--;
    document.getElementById("stateText").innerHTML = i;
    if (i === 0) {
      document.getElementById("stateText").innerHTML = "";
      clearInterval(startGameInterval);
      isPaused = false;
    }
  }, 1000); // 1000 milliseconds = 1 second
}

function gameEndTimer(endText = "You Won!") {
  newGame();
  openNav();
  document.getElementById("stateText").innerHTML = endText;
}


function newGame() {
  // Setting the menu up 
  document.getElementById('PlayerColor').value = PlayerColor;
  document.getElementById('startGameDelay').value = startGameDelay;
  document.getElementById('GlobalFPS').value = GlobalFPS;
  document.getElementById('roadStrokeWeight').value = roadStrokeWeight;
  document.getElementById('mapWidth').value = mapWidth;
  document.getElementById('mapHeight').value = mapHeight;
  document.getElementById('roadWidth').value = roadWidth;
  document.getElementById('roadEndingY').value = roadEndingY;
  document.getElementById('roadSidesForce').value = roadSidesForce;
  document.getElementById('roadsideSqueeshinessMultiplier').value = roadsideSqueeshinessMultiplier;
  document.getElementById('ovumR').value = ovumR;
  ovumOuterLayerR = ovumR * 12;
  document.getElementById('globalVelocityLimit').value = globalVelocityLimit;
  document.getElementById('globalMaxveForce').value = globalMaxveForce;
  document.getElementById('globalNPCVelocityLimit').value = globalNPCVelocityLimit;
  document.getElementById('globalNPCMaxveForce').value = globalNPCMaxveForce;
  document.getElementById('globalNPCVelocityLimitInUvom').value = globalNPCVelocityLimitInUvom;
  document.getElementById('globalNPCMaxveForceInUvom').value = globalNPCMaxveForceInUvom;
  document.getElementById('globalNPCMaxveForceInsideUvom').value = globalNPCMaxveForceInsideUvom;
  document.getElementById('jelliesSlowDownNPC').value = jelliesSlowDownNPC;
  document.getElementById('NPCJammersSlowedDown').value = NPCJammersSlowedDown;
  document.getElementById('jammersForce').value = jammersForce;
  document.getElementById('jelliesForce').value = jelliesForce;
  document.getElementById('uterusForce').value = uterusForce;
  document.getElementById('uterusForceNPC').value = uterusForceNPC;
  document.getElementById('spermPupolation').value = spermPupolation;
  document.getElementById('NPC_sperm_steering_accuracy').value = NPC_sperm_steering_accuracy;
  document.getElementById('jammersCrowd').value = jammersCrowd;
  document.getElementById('jelliesCrowd').value = jelliesCrowd;
  document.getElementById('algasCrowd').value = algasCrowd;
  document.getElementById('jelliesMaxYSpawn').value = jelliesMaxYSpawn;
  document.getElementById('graphicQuality').value = graphicQuality;
  document.getElementById('gameViewScale').value = gameViewScale;
  gameScale = gameViewScale;
  document.getElementById('MaxZoomGameScale').value = MaxZoomGameScale;
  document.getElementById('viewDisance').value = viewDisance;

  frameRate(GlobalFPS);
  creation();
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  var density = displayDensity();
  pixelDensity(density);
  
  newGame();
  openNav();
}


function draw() {
  //console.log(frameRate());
  background(51);
  //the player himself called me



  var me = sperms[0];
  //this is going to make the camera look at the player
  translate(windowWidth / 2, windowHeight / 2);
  //zoom x10, this should be here otherwise it wont work
  scale(gameScale);
  translate(-me.location.x, -me.location.y);
  //drawing road
  drawRoad(me.location);
  var d1 = me.location.y - uterus.location.y;
  if (d1 <= viewDisance * 4 && d1 >= -viewDisance * 4)
    uterus.draw();
  if (graphicQuality === 1) {
    for (var i in leftAlgas) {
      var d = me.location.y - leftAlgas[i].location.y;
      if (d <= viewDisance && d >= -viewDisance)
        leftAlgas[i].draw();
    }
    for (var i in rightAlgas) {
      var d = me.location.y - rightAlgas[i].location.y;
      if (d <= viewDisance && d >= -viewDisance)
        rightAlgas[i].draw();
    }
  }
  //drawing sperms
  for (var i in sperms) {
    var s = sperms[i];
    s.update();
    s.checkCollision();
    s.checkStats();
    var d = me.location.y - s.location.y;
    if (d <= viewDisance && d >= -viewDisance) {
      push();
      s.draw();
      pop();
    }
  }
  for (var i in jammers) {
    var d = me.location.y - jammers[i].location.y;
    if (d <= viewDisance && d >= -viewDisance) {
      push();
      jammers[i].draw();
      pop();
    }
  }
  for (var i in jellies) {
    var d = me.location.y - jellies[i].location.y;
    if (d <= viewDisance && d >= -viewDisance) {
      push();
      jellies[i].draw();
      pop();
    }
    jellies[i].update();
    jellies[i].constrain();
  }
  var d2 = me.location.y - ovum.location.y;
  if (d2 <= 120 && d2 >= -120) {
    push();
    ovum.draw();
    pop();
  }
}
//resizing the canvas if screen size changed
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === 'Escape') { // 27 is the Escape key code
    if(!isPaused) {
      openNav();
    } else {
      closeNav();
    }
  }
}
// document.addEventListener('keydown', function(event) {
// });
