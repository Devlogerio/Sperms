// General
var isPaused = true;

//road and map
var lastWidthSize;
var lastHeightSize;
var roadLeft = [];
var roadRight = [];
var roadMiddle = [];
var roadStrokeWeight = 1;
var mapWidth = 800;// 500
var mapHeight = 200;// 500
var roadWidth = 15;
var leftRightDiffrance = 0;
var roadEndingY = 140;
var roadSidesForce = 0.28;
var roadHeight = 0;
var roadsideSqueeshinessMultiplier = 0.5;

//sperms
var sperms = [];
var uterus;
var ovum;
var globalVelocityLimit = 0.7;
var globalMaxveForce = 0.16;
var globalNPCVelocityLimit = 1.0;
var globalNPCMaxveForce = 0.06;
var globalNPCVelocityLimitInUvom = 0.5;
var globalNPCMaxveForceInUvom = 0.03;
var globalNPCMaxveForceInsideUvom = 0.02;
var jelliesSlowDownNPC = 0.8;
var NPCJammersSlowedDown = 2.6;
var jammersForce = 0.2;
var jelliesForce = -0.05;
var uterusForce = 0.3;
var uterusForceNPC = 0.1;
var spermPupolation = 1; //50
var NPC_sperm_steering_accuracy = 1;

//Entities
var jammers = [];
var jellies = [];
var leftAlgas = [];
var rightAlgas = [];
var jammersCrowd = mapHeight / 10;// 25
var jelliesCrowd = mapHeight / 5;// 100
var algasCrowd = mapHeight;// 500

//graphics
var graphicQuality = 'low';
var gameScale = 20;
var staticGameScale = 20;
var viewDisance = 40;
