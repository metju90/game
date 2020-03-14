/** @format */

var myGamePiece;
var myObstacles = [];
var myScore;
var currentGameLevel = 0;
var hasIntervalFromRoundTransition = false;

// level 1 interval 150, lvl 2 135 etc.
var intervalPerLevel = [50, 50, 50, 50, 45];
var sameLevelObstaclesGap = [
  [80, 120],
  [60, 75],
  [60, 70],
  [60, 65],
  [60, 60]
];

const framesPerSecond = 16;
var score = 0;
var obstaclesColorPerLevel = [
  "#31f500",
  "#f1ea06",
  "#eb8d00",
  "#ff0303",
  "#000"
];

function startGame() {
  myGamePiece = new component(30, 30, "#0065fd", 165, 400);
  myGamePiece.gravity = 0;
  myLevel = new component("20px", "Consolas", "black", 230, 25, "text");
  myScore = new component("20px", "Consolas", "black", 230, 50, "text");
  myGameArea.start();
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 330;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    document
      .getElementById("canvasWrapper")
      .insertBefore(
        this.canvas,
        document.getElementById("canvasWrapper").childNodes[0]
      );
    document.getElementById("canvasWrapper").style.display = "block";
    document.getElementById("clickToStart").style.display = "none";
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, framesPerSecond);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};

function component(width, height, color, x, y, type) {
  this.type = type;
  this.score = 0;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.gravity = 0;
  this.gravitySpeed = 0;
  this.update = function() {
    ctx = myGameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.newPos = function() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();
    this.stayInElement();
  };
  this.hitBottom = function() {
    var rockbottom = myGameArea.canvas.height - this.height;
    if (this.y > rockbottom) {
      this.y = rockbottom;
      this.gravitySpeed = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.gravitySpeed = 0;
    }
  };
  this.stayInElement = function() {
    var mostLeft = myGameArea.canvas.width - this.width;
    if (this.x > mostLeft) {
      this.x = mostLeft;
      this.gravitySpeed = 0;
    }
    if (this.x < 0) {
      this.x = 0;
      this.gravitySpeed = 0;
    }
  };
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;
    var crash = true;

    if (
      mybottom < othertop ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
      crash = false;
    }
    return crash;
  };
}

function updateGameArea() {
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      document.querySelector("#canvasWrapper").classList.add("shake");
      clearInterval(myGameArea.interval);
      updateLeaderBoard();
    }
  }
  myGameArea.clear();
  if (!hasIntervalFromRoundTransition) {
    score = myGameArea.frameNo + 1;
  }
  myScore.text = `Score: ${score}`;
  myLevel.text = `Level: ${currentGameLevel + 1}`;
  myGameArea.frameNo++;

  if (
    (myGameArea.frameNo === 1 ||
      everyInterval(intervalPerLevel[currentGameLevel])) &&
    !hasIntervalFromRoundTransition
  ) {
    var x, gap, width, minGap, maxGap;
    if (!hasIntervalFromRoundTransition) {
      x = myGameArea.canvas.width;

      maxWidth = 290;
      minWidth = 50;
      width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
      minGap =
        sameLevelObstaclesGap[
          currentGameLevel > sameLevelObstaclesGap.length
            ? sameLevelObstaclesGap.length - 1
            : currentGameLevel
        ][0];
      maxGap =
        sameLevelObstaclesGap[
          currentGameLevel > sameLevelObstaclesGap.length
            ? sameLevelObstaclesGap.length - 1
            : currentGameLevel
        ][1];
      gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

      myObstacles.push(
        new component(width, 10, obstaclesColorPerLevel[currentGameLevel], 0, 0)
      );
      myObstacles.push(
        new component(
          x - width,
          10,
          obstaclesColorPerLevel[currentGameLevel],
          x - (x - width - gap),
          0
        )
      );
    }
  }

  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].y += 2;
    myObstacles[i].update();
  }
  if (myGameArea.frameNo === 600) {
    gameLevelUp({ newGameLevel: 1 });
  }
  if (myGameArea.frameNo === 1200) {
    gameLevelUp({ newGameLevel: 2 });
  }
  if (myGameArea.frameNo === 1800) {
    gameLevelUp({ newGameLevel: 3 });
  }
  if (myGameArea.frameNo === 2400) {
    gameLevelUp({ newGameLevel: 4 });
  }
  myLevel.update();
  myScore.update();
  myGamePiece.newPos();
  myGamePiece.update();
}

function everyInterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}

function updateLeaderBoard() {
  const leaderBoard = JSON.parse(localStorage.getItem("leaderBoard")) || [];
  const userScore = {
    date: new Date(),
    score: myGameArea.frameNo,
    id: leaderBoard.length
  };
  const newLeaderBoard = JSON.stringify([...leaderBoard, userScore]);
  localStorage.setItem("leaderBoard", newLeaderBoard);
  loadScoreBoard({ newlyInsertedId: userScore.id });
}

function gameLevelUp({ newGameLevel }) {
  hasIntervalFromRoundTransition = true;
  setTimeout(() => {
    currentGameLevel = newGameLevel;
    hasIntervalFromRoundTransition = false;
  }, 3500);
}
