// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com

var Entity = function () {
  var self = {
    id: Math.random(),
    location: createVector(mapWidth / 2, mapHeight),
    acceleration: createVector(0, 0),
    velocity: createVector(0, 0),
    velocityLimit: 1,
    maxvelocity: 0,
    color: color(0, 0, 0, 0),
    strokeColor: color(0, 0, 0, 0),
    angle: 0,
    mass: 1,
    r: 1,
    //applying force to acceleration

    applyForce: function (force) {
      var f = p5.Vector.div(force, this.mass);
      this.acceleration.add(f);
    },
    applyPhysicsMovement: function () {
      //here we add any force to our sperm and our sperm velocity cant be more than 1
      self.velocity.add(self.acceleration);
      self.velocity.limit(self.velocityLimit);
      self.location.add(self.velocity);
      self.acceleration.mult(0);
    }
  }
  return self;
}

