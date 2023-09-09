// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
//Making the road with Noise
function initializeRoad() {
  noiseSeed(random(0, 100));
  //if player exists
  if (sperms[0]) {
    var inc = 0.003;
    var start = 0;
    xoff = start;
    //here we generate points with perlin noise using the inc variable and store them in two arrays
    for (var y = ovumOuterLayerR; y <= mapHeight; y++) {
      var x1 = (noise(xoff) * mapWidth - roadWidth / 2);
      var x2 = (noise(xoff) * mapWidth + roadWidth / 2);
      roadLeft.push({ x: x1, y: y });
      roadRight.push({ x: x2, y: y - leftRightDiffrance });//y-7
      xoff += inc;
    }
    roadHeight = roadRight[roadRight.length - 1].y - roadLeft[0].y;
  }
}

//drawing the road
function drawRoad(playerLocation) {
  fill(255, 128, 147, 255);
  rect(0, 0, 10000, 10000);
  strokeWeight(roadStrokeWeight);
  stroke(238, 177, 174, 255);
  fill(164, 64, 74, 255);
  beginShape();
  //draw left side of the road
  for (var i in roadLeft) {
    var d = playerLocation.dist(createVector(roadLeft[i].x, roadLeft[i].y));
    if (d < viewDisance * 2) {
      vertex(roadLeft[i].x, roadLeft[i].y);
    }
  }
  //draw right side of the road
  for (var i = roadRight.length - 1; i >= 0; i--) {
    var d = playerLocation.dist(createVector(roadRight[i].x, roadRight[i].y));
    if (d < viewDisance * 2) {
      vertex(roadRight[i].x, roadRight[i].y);
    }
  }
  endShape(CLOSE);
}