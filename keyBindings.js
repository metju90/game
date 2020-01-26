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
  // reset moving speed to 0
  document.querySelector("body").onkeyup = e => {
    switch (e.which) {
      case KEYS.A:
      case KEYS.ARROW_LEFT: {
        myGamePiece.speedX = 0;
        break;
      }

      case KEYS.W:
      case KEYS.ARROW_UP: {
        myGamePiece.speedY = 0;
        break;
      }

      case KEYS.D:
      case KEYS.ARROW_RIGHT: {
        myGamePiece.speedX = 0;
        break;
      }

      case KEYS.S:
      case KEYS.ARROW_DOWN: {
        myGamePiece.speedY = 0;
        break;
      }

      default:
        return; // exit this handler for other keys
    }
  };

  document.querySelector("body").onkeydown = e => {
    switch (e.which) {
      case KEYS.A:
      case KEYS.ARROW_LEFT: {
        myGamePiece.speedX = -2.5;
        break;
      }

      case KEYS.W:
      case KEYS.ARROW_UP: {
        myGamePiece.speedY = -2.5;
        break;
      }

      case KEYS.D:
      case KEYS.ARROW_RIGHT: {
        myGamePiece.speedX = 2.5;
        break;
      }

      case KEYS.S:
      case KEYS.ARROW_DOWN: {
        myGamePiece.speedY = 2.5;
        break;
      }

      default:
        return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  };
});
