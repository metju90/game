/** @format */

const KEYS = {
  A: 65,
  ARROW_LEFT: 37,
  W: 87,
  ARROW_UP: 38,
  D: 68,
  ARROW_RIGHT: 39,
  S: 83,
  ARROW_DOWN: 40
};

document.addEventListener("DOMContentLoaded", function(event) {
  const myPiecePaceX = 3.5;
  const myPiecePaceY = 2.5;
  document.querySelector("body").onkeyup = e => {
    switch (e.which) {
      case KEYS.A:
      case KEYS.D:
      case KEYS.ARROW_RIGHT:
      case KEYS.ARROW_LEFT: {
        myGamePiece.speedX = 0;
        break;
      }

      case KEYS.W:
      case KEYS.ARROW_UP:
      case KEYS.S:
      case KEYS.ARROW_DOWN: {
        myGamePiece.speedY = 0;
        break;
      }

      default:
        return;
    }
    e.preventDefault();
  };

  document.querySelector("body").onkeydown = e => {
    switch (e.which) {
      case KEYS.A:
      case KEYS.ARROW_LEFT: {
        myGamePiece.speedX = -myPiecePaceX;
        break;
      }

      case KEYS.W:
      case KEYS.ARROW_UP: {
        myGamePiece.speedY = -myPiecePaceY;
        break;
      }

      case KEYS.D:
      case KEYS.ARROW_RIGHT: {
        myGamePiece.speedX = myPiecePaceX;
        break;
      }

      case KEYS.S:
      case KEYS.ARROW_DOWN: {
        myGamePiece.speedY = myPiecePaceY;
        break;
      }

      default:
        return;
    }
    e.preventDefault();
  };
});
