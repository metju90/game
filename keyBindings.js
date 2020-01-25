/** @format */
document.addEventListener("DOMContentLoaded", function(event) {
  document.querySelector("body").onkeydown = e => {
    switch (e.which) {
      // arrow left
      case 65:
      case 37: {
        myGamePiece.speedX -= 0.5;
        break;
      }

      // arrow up
      case 87:
      case 38: {
        myGamePiece.speedY -= 0.5;
        break;
      }

      // arrow right
      case 68:
      case 39: {
        myGamePiece.speedX += 0.5;
        break;
      }

      // arrow down
      case 83:
      case 40: {
        myGamePiece.speedY += 0.5;
        break;
      }

      default:
        return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  };
});
