// game constants
const SIMWIDTH = 900;
const SIMHEIGHT = 600;
const INFOWIDTH = SIMWIDTH;
const INFOHEIGHT = 300;
const INFOBGCOLOR = 0x555555;
const APPWIDTH = SIMWIDTH;
const APPHEIGHT = SIMHEIGHT + INFOHEIGHT;
const BACKGROUNDCOLOR = 0xefefef;
const CAMERAOFFSET = 290;

// bird constants
const BIRDCOUNT = 8;
const BIRDWIDTH = 20;
const BIRDHEIGHT = 20;
const BIRDXV = 2;
const GRAVITY = .8;
const BIRDMAXYV = 90;
const ACCELERATING_JUMP = false;
const BIRDJUMPV = -12;
const BIRDJUMPACC = -2;
const WALLPASSFITNESSMULT = BIRDCOUNT * 5;

// wall constants
const WALLXINTERVAL = 170;
const WALLINITIALX = 130;
const WALLWIDTH = 30;
const WALLGAPHEIGHT = 140;
const WALLCOLOR = '0x7c0a02';