
var Alga = function (side) {
    var self = Entity();
    self.side = side;
    self.strokeWeight = 0.2;
    self.strokeColor = color(238, 177, 174, 255);//color(255,128,147,255);
    self.head = random(-0.5, 0.5);

    //Positioning the sperm at the begining
    self.putInLocation = function () {
        var yPoint = floor(random(0, roadHeight - 100));
        if (self.side === 'left') {
            self.location.x = roadLeft[yPoint].x;
            self.location.y = roadLeft[yPoint].y;//+ random(-1, 1);
        }
        else if (self.side === 'right') {
            self.location.x = roadRight[yPoint + leftRightDiffrance].x;
            self.location.y = roadRight[yPoint + leftRightDiffrance].y;//+ random(-1, 1);
        }
    }
    self.draw = function () {
        push();
        //setup
        translate(self.location.x, self.location.y);
        strokeWeight(self.strokeWeight);
        stroke(self.strokeColor);
        noFill()
        if (self.side === 'left') {
            line(0, 0, 1, self.head);
        }
        else if (self.side === 'right') {
            line(0, 0, -1, self.head);
        }
        pop();
    }
    return self;
}
