// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
var Jammer = function () {
  var self = Entity();
  self.r = 2;
  self.color = color(110, 14, 0, 200);
  self.strokeColor = color(141, 13, 0, 255);

  //Positioning the sperm at the begining
  self.putInLocation = function () {
    var yPoint = floor(random(0, roadHeight));
    var d = dist(roadLeft[yPoint].x, roadLeft[yPoint].y, roadRight[yPoint + leftRightDiffrance].x, roadRight[yPoint + leftRightDiffrance].y);
    self.location.x = roadLeft[yPoint].x + floor(random(self.r + roadStrokeWeight / 2, d - self.r - roadStrokeWeight / 2));
    self.location.y = roadLeft[yPoint].y;
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
  return self;
}
