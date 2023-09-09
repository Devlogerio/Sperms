// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
function creation() {
  sperms = [];
  roadLeft = [];
  roadRight = [];
  roadMiddle = [];
  jammers = [];
  jellies = [];
  leftAlgas = [];
  rightAlgas = [];

  if(mapHeight < ovumOuterLayerR) {
    mapHeight = parseFloat(mapHeight) + parseFloat(ovumOuterLayerR);
  }

  sperms[0] = new Sperm;
  sperms[0].isPlayer = true;
  sperms[0].color = color(PlayerColor);

  for (var i = 0; i < spermPupolation; i++) {
    sperms.push(new Sperm);
  }
  initializeRoad();
  uterus = new Uterus();
  uterus.putInLocation();
  ovum = new Ovum();
  ovum.putInLocation();
  for (var i in sperms) {
    sperms[i].putInLocation();
    sperms[i].setNpcFollowPath();
    sperms[i].generateTail();
    sperms[i].resetSpeed();
  }
  for (var i = 0; i < jammersCrowd; i++) {
    jammers.push(new Jammer());
  }
  for (var i = 0; i < jelliesCrowd; i++) {
    jellies.push(new Jelly());
    // jellies.push(new Jelly(2));
    // jellies.push(new Jelly(3));
  }
  if (graphicQuality === 1) {
    for (var i = 0; i < algasCrowd; i++) {
      leftAlgas.push(new Alga('left'));
      rightAlgas.push(new Alga('right'));
    }
  }

  for (var i in jammers) {
    jammers[i].putInLocation();
  }
  for (var i in jellies) {
    jellies[i].putInLocation();
  }
  for (var i in leftAlgas) {
    leftAlgas[i].putInLocation();
  }
  for (var i in rightAlgas) {
    rightAlgas[i].putInLocation();
  }
}