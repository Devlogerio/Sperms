
var Jelly = function () {
    var self = Entity();
    // self.sticked = false;
    // self.chasing = false;
    // self.chasingWhom;
    self.r = 1;
    self.velocityLimit = 0.7;
    self.distance = 0;
    self.color = color(240, 199, 71, 255);
    self.strokeColor = color(238, 175, 51, 255);

    //Positioning the sperm at the begining
    self.putInLocation = function () {

        if(jelliesMaxYSpawn > roadHeight) {
            jelliesMaxYSpawn = roadHeight;
            document.getElementById('jelliesMaxYSpawn').value = jelliesMaxYSpawn;
        }
        
        var yPoint = floor(random(0, jelliesMaxYSpawn));
        var d = dist(roadLeft[yPoint].x, roadLeft[yPoint].y, roadRight[yPoint + leftRightDiffrance].x, roadRight[yPoint + leftRightDiffrance].y);
        self.location.x = roadLeft[yPoint].x + floor(random(0, d));
        self.location.y = roadLeft[yPoint].y;
        
        // var yPoint = floor(random(0, roadHeight - 50));
        // var d = dist(roadLeft[yPoint].x, roadLeft[yPoint].y, roadRight[yPoint + leftRightDiffrance].x, roadRight[yPoint + leftRightDiffrance].y);
        // self.location.x = roadLeft[yPoint].x + floor(random(self.r + roadStrokeWeight / 2, d - self.r - roadStrokeWeight / 2));
        // self.location.y = roadLeft[yPoint].y;
    }

    self.update = function () {
        if (isPaused) {
            return;
        }
        self.velocity.add(self.acceleration);
        self.velocity.limit(self.velocityLimit);
        self.location.add(self.velocity);
        self.acceleration.mult(0);
        //stoping the velocity from getting too small (float)
        if (self.velocity.mag() < 0.005 && self.velocity.mag() > -0.005 && self.velocity.mag() !== 0) {
            self.velocity.mult(0);
        }
        else {
            var force = createVector(-self.velocity.x, -self.velocity.y);
            force.mult(0.05);
            self.applyForce(force);
        }
    }

    self.draw = function () {
        push();
        //setup
        translate(self.location.x, self.location.y);
        strokeWeight(0.5);
        stroke(self.strokeColor);
        fill(self.color);
        //draw body
        ellipse(0, 0, self.r * 2, self.r * 2);
        pop();
    }
    //here we check out of boundings and collision with 
    self.constrain = function () {
        //here we make the position never get out of the map rect
        // self.location.x = constrain(self.location.x,0,mapWidth);
        self.location.y = constrain(self.location.y, 0, mapHeight);
        //here we check the collision with right side of the road
        for (var i = 1; i < roadRight.length - 1; i++) {
            if (roadRight[i - 1].y < self.location.y && self.location.y < roadRight[i + 1].y) {
                if (self.location.x + self.r > roadRight[i].x) {
                    var force = createVector(-0.05, 0);
                    self.applyForce(force);
                }
            }
        }
        //here we check the collision with left side of the road
        for (var i = 1; i < roadLeft.length - 2; i++) {
            if (roadLeft[i - 1].y < self.location.y && self.location.y < roadLeft[i + 1].y) {
                if (self.location.x - self.r < roadLeft[i].x) {
                    var force = createVector(0.05, 0);
                    self.applyForce(force);
                }
            }
        }
    }
    return self;
}
