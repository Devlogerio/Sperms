// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com

function Sperm(id, name) {
  var self = Entity()
  self.name = '';
  self.velocityLimit = globalVelocityLimit;
  self.maxveForce = globalMaxveForce;
  self.staticR = self.r;
  self.tailPoints = [];
  self.tailCounter = 360;
  self.angle = -90;
  self.beingChased = false;
  self.tailWaveWidth = 20;
  self.tailWaveSpeed = 400;
  self.slowed = false;
  self.whoJammed = -1;
  self.inUterus =false;
  self.tailLength = 5;
  self.r = 0.5;
  self.isPlayer = false;
  self.followPath = [];
  self.id = random();
  self.color = color(255, 255, 255);

  self.generateTail = function () {
    for (var i = self.r * 2 + 0.5; i < self.tailLength; i += 0.2) {
      self.tailPoints.push(createVector(-i, 0));
    }
  }
  self.draw = function () {
    //setup
    push();

    translate(self.location.x, self.location.y);
    rotate(self.angle);
    strokeWeight(0.1);//0.4
    stroke(red(self.color), green(self.color), blue(self.color), 150);
    noFill();
    beginShape();
    //Draw tail
    for (var i in self.tailPoints) {
      var wave = sin(i * self.tailWaveWidth + self.tailCounter * self.tailWaveSpeed);
      vertex(self.tailPoints[i].x, wave * 0.5 * i * 0.1);
    }
    endShape();

    //setup
    noStroke();
    fill(red(self.color), green(self.color), blue(self.color), 150);
    //draw body
    rect(-1.5, -0.15, 1, 0.3, 0.2);
    ellipse(0, 0, self.r * 3, self.r * 2);
    fill(red(self.color), green(self.color), blue(self.color), 255);
    ellipse(-0.2, 0, self.r * 2, self.r * 1);

    pop();
  }
  //Positioning the sperm at the begining
  self.putInLocation = function () {
    var yPoint = roadHeight; // -1 because for AI movement we need the lower Y in road
    var d = dist(roadLeft[yPoint].x, roadLeft[yPoint].y, roadRight[yPoint].x + leftRightDiffrance, roadRight[yPoint].y);
    self.location.x = roadLeft[yPoint].x + d / 2;
    self.location.y = roadLeft[yPoint].y;

  }
  self.setNpcFollowPath = function () {
    for (var i in roadLeft) {
      self.followPath.push({ x: roadLeft[i].x, y: roadLeft[i].y });
    }
    for (var i in self.followPath) {
      self.followPath[i].x += random(0, roadWidth);
    }
  }
  //updating the stats
  self.update = function () {
    if (isPaused) {
      return;
    }
    //if click holded
    if(self.isPlayer) {
      if (mouseIsPressed) {
        var middle = createVector(windowWidth / 2, windowHeight / 2);
        var mouse = createVector(mouseX, mouseY);
        //we are using moise and middle and sub to get a vector from middle toward the mouse with the angle
        var force = mouse.sub(middle);
        //here we set the magnitude of the vector toward mouse to the maxveForce
        force.setMag(self.maxveForce);
        //force.mult(0.01);
        self.applyForce(force);
        //here we add the tailCounter for the tail Sin wave, we go backward because otherwise it will wave oposit the direction we want
        self.tailCounter -= 1;
        if (self.tailCounter <= 0) {
          self.tailCounter = 360;
        }
      }
      else {
        //stoping the velocity from getting too small (float)
        if (self.velocity.mag() < 0.005 && self.velocity.mag() > -0.005 && self.velocity.mag() !== 0) {
          self.velocity.mult(0);
        }
        //if(more than the number we topd to stop so we use a force to stop the sperm here)
        else {
          //this will stop the sperm with the velocity of 0.1 and direction of where uts going
          var force = createVector(-self.velocity.x, -self.velocity.y);
          force.mult(0.1);
          self.applyForce(force);
        }
        self.tailCounter -= 0.01;
        if (self.tailCounter <= 0) {
          self.tailCounter = 360;
        }
      }
      //here we set the angle of our sperm to where its moving
      if (self.velocity.mag() !== 0) {
        self.angle = self.velocity.heading();
      }
    }
    else {
      //if click holded
      var force = createVector(0, 0);
      // insideRoad = false;
  
      // if(!self.inUterus) {
        for (var i in self.followPath) {
          var d = self.followPath[i].y - self.location.y;
          if (d < 0) {
            d *= -1;
          }
          if (d <= NPC_sperm_steering_accuracy && self.followPath[i].y < self.location.y) {
            force = createVector(self.followPath[i].x, self.followPath[i].y).sub(self.location);
            // insideRoad = true;
            break;
          }
        }

        if(self.inUterus) {
          force = createVector(ovum.location.x, ovum.location.y).sub(self.location);
        }
      // }
  
      // if(!insideRoad) {
      //   force = createVector(ovum.location.x, ovum.location.y).sub(self.location);
      //   self.inUterus = true;
      // }
  
      // //here we set the magnitude of the vector toward mouse to the maxveForce
      // if(self.inUterus) {
      //   force.setMag(globalNPCMaxveForceInsideUvom);
      // } else {
        force.normalize();
        force.setMag(self.maxveForce);
      // }
  
  
      //force.mult(0.01);
      self.applyForce(force);
      //here we add the tailCounter for the tail Sin wave, we go backward because otherwise it will wave oposit the direction we want
      self.tailCounter -= 1;
      if (self.tailCounter <= 0) {
        self.tailCounter = 360;
      }
      //here we set the angle of our sperm to where its moving
      if (self.velocity.mag() !== 0) {
        self.angle = self.velocity.heading();
      }
    }

    self.applyPhysicsMovement();
    //here we check out of boundings and collision with 
    self.constrain();
  }

  self.checkCollision = function () {
    for (var i in jammers) {
      var d = dist(self.location.x, self.location.y, jammers[i].location.x, jammers[i].location.y);
      if (d < self.r + jammers[i].r) {
        self.slowDown(jammersForce);
        self.whoJammed = i; 
      }
    }
    for (var i in jellies) {
      var d = dist(self.location.x, self.location.y, jellies[i].location.x, jellies[i].location.y);
      if (d < self.r + jellies[i].r) {
        if (self.isPlayer === true) {
          var force = createVector(self.location.x - jellies[i].location.x, self.location.y - jellies[i].location.y);
          force.mult(jelliesForce);
          self.velocity.mult(0);
          jellies[i].applyForce(force);
        } else {
          var force = createVector(self.location.x - jellies[i].location.x, self.location.y - jellies[i].location.y);
          force.mult(jelliesForce);
          self.velocity.mult(jelliesSlowDownNPC);
          jellies[i].applyForce(force);
        }
      }
    }
    var uterusD = dist(self.location.x, self.location.y, uterus.location.x, uterus.location.y);
    if (uterusD < self.r + uterus.r) {
      if (self.isPlayer === true) {
        var newZoom = map(uterusD, 0, 100, 30, 4);
        gameScale = lerp(gameScale, newZoom, 0.1);
      }
      if(self.isPlayer) {
        self.slowDown(uterusForce);
      } else {
        self.slowDown(uterusForceNPC);
      }
      self.inUterus = true;
    }
    
    //Collision with the egg
    var d = dist(self.location.x, self.location.y, ovum.location.x, ovum.location.y);
    if (d < self.r + ovum.r) {
      if(self.isPlayer) {
        gameEndTimer("You Won!");
      } else {
        gameEndTimer("You Lost!");
      }
    }


  }
  self.checkStats = function () {
    if (self.slowed === true) {
      if (self.whoJammed !== -1) {
        var d = dist(self.location.x, self.location.y, jammers[self.whoJammed].location.x, jammers[self.whoJammed].location.y);
        if (d >= self.r + jammers[self.whoJammed].r) {
          self.resetSpeed();
          self.whoJammed = -1;
          self.slowed = false;
        }
      }
      if (self.inUterus === true) {
        var uterusD = dist(self.location.x, self.location.y, uterus.location.x, uterus.location.y);
        if (uterusD >= self.r + uterus.r) {
          self.resetSpeed();
          self.inUterus = false;
          self.slowed = false;
          if (self.isPlayer === true) {
            gameScale = MaxZoomGameScale;
          }
        }
      }
    }
  }
  self.resetSpeed = function () {
    if (self.isPlayer === true) {
      self.velocityLimit = globalVelocityLimit;
      self.maxveForce = globalMaxveForce;
    } else {
      self.velocityLimit = globalNPCVelocityLimit;
      self.maxveForce = globalNPCMaxveForce;
    }
  }
  self.slowDown = function (howMuch) {
    if (self.isPlayer === true) {
      self.velocityLimit = howMuch;//0.3
      self.maxveForce = 0.01;
      self.slowed = true;
    } else {
      self.velocityLimit = howMuch * NPCJammersSlowedDown;//0.3
      self.maxveForce = 0.1;
      self.slowed = true;
    }
  }


  //here we check out of boundings and collision with 
  self.constrain = function () {
    //here we make the position never get out of the map rect
    // self.location.x = constrain(self.location.x,0,mapWidth);
    // self.location.y = constrain(self.location.y, 0, mapHeight);
    //here we check the collision with right side of the road
    for (var i = 1; i < roadRight.length - 1; i++) {
      if (roadRight[i - 1].y < self.location.y && self.location.y < roadRight[i + 1].y) {
        if (self.location.x + self.r > roadRight[i].x) {
          var force = createVector(self.location.x, roadRight[i].y - self.location.y);
          force.normalize();
          roadRight[i].x += force.x * roadsideSqueeshinessMultiplier;
          roadRight[i].y += force.y * roadsideSqueeshinessMultiplier;
          force.setMag(-roadSidesForce);
          self.applyForce(force);
        }
      }
    }
    //here we check the collision with left side of the road
    for (var i = roadLeft.length - 2; i > 1; i--) {
      if (roadLeft[i - 1].y < self.location.y && self.location.y < roadLeft[i + 1].y) {
        if (self.location.x - self.r < roadLeft[i].x) {
          var force = createVector(self.location.x, roadLeft[i].y - self.location.y);
          force.normalize();
          roadLeft[i].x -= force.x * roadsideSqueeshinessMultiplier;
          roadLeft[i].y -= force.y * roadsideSqueeshinessMultiplier;
          force.setMag(roadSidesForce);
          self.applyForce(force);
        }
      }
    }
  }
  //return created object
  return self;
}