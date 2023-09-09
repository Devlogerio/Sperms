// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com

var Uterus = function () {
  var self = Entity();
  self.r = 100;
  self.rr = self.r * 2;
  //self.strokeColor = color(255, 255, 255,255);
  self.color = color(164, 64, 74, 255);

  //Positioning the sperm at the begining
  self.putInLocation = function () {
    var yPoint = 0;
    var d = dist(roadLeft[yPoint].x, roadLeft[yPoint].y, roadRight[yPoint + leftRightDiffrance].x, roadRight[yPoint + leftRightDiffrance].y);
    self.location.x = roadLeft[yPoint].x - floor(d);
    self.location.y = roadLeft[yPoint].y - self.r + 5;
  }

  self.draw = function () {
    push();
    //setup
    translate(self.location.x, self.location.y);
    //strokeWeight(0.5);
    //stroke(self.strokeColor);
    noStroke();
    fill(self.color);
    //draw body
    ellipse(0, 0, self.rr, self.rr);
    pop();
  }
  return self;
}
