p5.disableFriendlyErrors = true;


function openNav() {
  isPaused = true;
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.getElementById("overlayDiv").style.background = "#00000083";
}

function closeNav() {
  isPaused = false;
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("overlayDiv").style.background = "#00000000";
}

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  frameRate(30);
  var density = displayDensity();
  pixelDensity(density);
  creation();
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
  if (graphicQuality === 'high') {
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
    if (s.isPlayer === true) {
      s.update();
    } else {
      s.npcUpdate();
    }
    if (s.isPlayer === false) {
      var d = me.location.y - s.location.y;
      if (d <= viewDisance && d >= -viewDisance) {
        push();
        s.checkCollision();
        s.checkStats();
        s.draw();
        pop();
      }
    } else {
      push();
      s.checkCollision();
      s.checkStats();
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