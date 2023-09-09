// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
var isPaused = true;
var startGameDelay = 3;
var GlobalFPS = 30;
var PlayerColor = "#ffffff";

var lastWidthSize;
var lastHeightSize;
var roadLeft = [];
var roadRight = [];
var roadMiddle = [];
var roadStrokeWeight = 1;
var mapWidth = 800;
var mapHeight = 1800; // 1200
var roadWidth = 15;
var leftRightDiffrance = 0;
var roadEndingY = 140;
var roadSidesForce = 0.2; // 0.28
var roadHeight = 0;
var roadsideSqueeshinessMultiplier = 0.2; // 0.5

var sperms = [];
var uterus;
var ovum;
var ovumR = 10;
var ovumOuterLayerR = ovumR * 12;
var globalVelocityLimit = 0.7;
var globalMaxveForce = 0.16;
var globalNPCVelocityLimit = 1.0;
var globalNPCMaxveForce = 0.06;
var jelliesSlowDownNPC = 0.8;
var NPCJammersSlowedDown = 2.6;
var jammersForce = 0.2;
var jelliesForce = -0.05;
var uterusForce = 0.3;
var uterusForceNPC = 0.1;
var spermPupolation = 150; // 150
var NPC_sperm_steering_accuracy = 1;

var jammers = [];
var jellies = [];
var leftAlgas = [];
var rightAlgas = [];
var jammersCrowd = mapHeight / 10;
var jelliesCrowd = mapHeight / 5;
var algasCrowd = mapHeight;
var jelliesMaxYSpawn = mapHeight;

var graphicQuality = 1; // 1 high 0 low
var gameViewScale = 20;
var gameScale = gameViewScale;
var MaxZoomGameScale = 20;
var viewDisance = 40;
