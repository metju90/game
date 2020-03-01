/** @format */

var myGamePiece;
var myObstacles = [];
var myScore;
var currentGameLevel = 1;

// level 1 interval 150, lvl 2 135 etc.
var intervalPerLevel = [150, 135, 120, 105, 90];

function startGame() {
  myGamePiece = new component(30, 30, "red", 10, 120);
  myGamePiece.gravity = 0;
  myScore = new component("20px", "Consolas", "black", 350, 40, "text");
  myLevel = new component("20px", "Consolas", "black", 350, 20, "text");
  myGameArea.start();
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
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
    this.interval = setInterval(updateGameArea, 20);
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
  var x, height, gap, minHeight, maxHeight, minGap, maxGap;
  for (i = 0; i < myObstacles.length; i += 1) {
    // if game is over
    if (myGamePiece.crashWith(myObstacles[i])) {
      document.querySelector("#canvasWrapper").classList.add("shake");
      clearInterval(myGameArea.interval);
      updateLeaderBoard();
    }
  }
  myGameArea.clear();
  myScore.text = "Score: " + myGameArea.frameNo;
  myLevel.text = "Level: " + currentGameLevel;
  myGameArea.frameNo++;
  if (
    myGameArea.frameNo === 1 ||
    everyInterval(intervalPerLevel[currentGameLevel - 1])
  ) {
    x = myGameArea.canvas.width;
    console.log("uuwejjjaa....", currentGameLevel);
    minHeight = 20;
    maxHeight = 200;
    if (currentGameLevel === 1) {
      height = Math.floor(
        Math.random() * (maxHeight - minHeight + 1) + minHeight
      );
      minGap = 50;
      maxGap = 100;
      gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
      myObstacles.push(new component(10, height, "blue", x, 100));
      myObstacles.push(
        new component(10, x - height - gap, "green", x, height + gap)
      );
    }

    if (currentGameLevel === 2) {
      minGap = 45;
      maxGap = 80;
      height = Math.floor(
        Math.random() * (maxHeight - minHeight + 1) + minHeight
      );
      gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

      myObstacles.push(new component(10, height, "green", x, 0));
      myObstacles.push(
        new component(10, x - height - gap, "green", x, height + gap)
      );
    }
    if (currentGameLevel === 3) {
      minGap = 40;
      maxGap = 70;
      height = Math.floor(
        Math.random() * (maxHeight - minHeight + 1) + minHeight
      );
      gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

      myObstacles.push(new component(10, height, "green", x, 0));
      myObstacles.push(
        new component(10, x - height - gap, "green", x, height + gap)
      );
    }
    if (currentGameLevel === 4) {
      minGap = 35;
      maxGap = 60;
      height = Math.floor(
        Math.random() * (maxHeight - minHeight + 1) + minHeight
      );
      gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

      myObstacles.push(new component(10, height, "green", x, 0));
      myObstacles.push(
        new component(10, x - height - gap, "green", x, height + gap)
      );
    }
    if (currentGameLevel === 5) {
      minGap = 32;
      maxGap = 50;
      height = Math.floor(
        Math.random() * (maxHeight - minHeight + 1) + minHeight
      );
      gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

      myObstacles.push(new component(10, height, "green", x, 0));
      myObstacles.push(
        new component(10, x - height - gap, "green", x, height + gap)
      );
    }
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
  }
  if (myGameArea.frameNo > 350) {
    currentGameLevel = 2;
  }
  if (myGameArea.frameNo > 700) {
    currentGameLevel = 3;
  }
  if (myGameArea.frameNo > 950) {
    currentGameLevel = 4;
  }
  if (myGameArea.frameNo > 1300) {
    currentGameLevel = 5;
  }
  myLevel.update();
  myScore.update();
  myGamePiece.newPos();
  myGamePiece.update();
}

function everyInterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {
    console.log("...", myGameArea.frameNo, n);
    return true;
  }
  return false;
}

function updateLeaderBoard() {
  const leaderBoard = JSON.parse(localStorage.getItem("leaderBoard")) || [];
  const userScore = {
    date: new Date(),
    score: myGameArea.frameNo, // somehow
    id: leaderBoard.length
  };
  const newLeaderBoard = JSON.stringify([...leaderBoard, userScore]);
  localStorage.setItem("leaderBoard", newLeaderBoard);
  loadScoreBoard({ newlyInsertedId: userScore.id });
}
