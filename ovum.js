// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
var Ovum = function () {
    var self = Entity();
    self.r = ovumR;
    self.yoff = 0.0;
    self.color = color(100, 50, 200, 255);

    //Positioning the sperm at the begining
    self.putInLocation = function () {
        self.location.x = uterus.location.x;
        self.location.y = uterus.location.y;
    }

    self.draw = function () {
        push();
        //setup
        translate(self.location.x, self.location.y);
        //strokeWeight(0.5);
        //stroke(self.strokeColor);
        noStroke();
        //draw body
        fill(255, 252, 216, 40);
        ellipse(0, 0, ovumOuterLayerR, self.r * (ovumOuterLayerR/ovumR)); // This is used in road * 12 as a Y multiplier
        fill(255, 250, 196, 40);
        ellipse(0, 0, self.r * 10, self.r * 10);
        fill(255, 247, 165, 40);
        ellipse(0, 0, self.r * 8, self.r * 8);
        fill(255, 243, 130, 40);
        ellipse(0, 0, self.r * 6, self.r * 6);
        fill(255, 239, 102, 40);
        ellipse(0, 0, self.r * 4, self.r * 4);
        //ellipse(0, 0, self.r*2,self.r*2);

        noStroke();
        fill(255, 229, 0, 255);
        beginShape();
        var xoff = 0;
        for (var a = 0; a < 340; a += 0.5) {
            var offset = map(noise(xoff, self.yoff), 0, 1, -2, 2);
            var r = (self.r) + offset;
            var x = r * cos(a);
            var y = r * sin(a);
            vertex(x, y);
            xoff += 0.01;
        }
        endShape();




        pop();
        self.yoff += 0.01;
    }
    return self;
}