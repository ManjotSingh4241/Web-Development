var character = document.getElementById("character");
var hurdle = document.getElementById("hurdle");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];
var score = 0;
var isJumping = false;

function moveLeft() {
  var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
  if (left > 0) {
    character.style.left = left - 2 + "px";
  }
}

function moveRight() {
  var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
  if (left < 380) {
    character.style.left = left + 2 + "px";
  }
}

function jump() {
  if (!isJumping) {
    isJumping = true;
    var jumpCount = 0;
    var initialTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var jumpInterval = setInterval(function () {
      var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
      if (jumpCount < 15) {
        character.style.top = initialTop - (jumpCount * 5) + "px";
      } else if (jumpCount >= 15 && jumpCount < 30) {
        character.style.top = initialTop - (jumpCount - 15) * 5 + "px";
      } else if (jumpCount >= 30) {
        clearInterval(jumpInterval);
        isJumping = false;
      }
      jumpCount++;
    }, 10);
  }
}

document.addEventListener("keydown", function (event) {
  if (both === 0) {
    both++;
    if (event.key === "ArrowLeft") {
      interval = setInterval(moveLeft, 1);
    }
    if (event.key === "ArrowRight") {
      interval = setInterval(moveRight, 1);
    }
    if (event.key === " ") {
      jump();
    }
  }
});

document.addEventListener("keyup", function () {
  clearInterval(interval);
  both = 0;
});

var blocks = setInterval(function () {
  var blockLast = document.getElementById("block" + (counter - 1));
  var holeLast = document.getElementById("hole" + (counter - 1));
  if (counter > 0) {
    var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
    var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
  }
  if (blockLastTop < 400 || counter === 0) {
    var block = document.createElement("div");
    var hole = document.createElement("div");
    block.setAttribute("class", "block");
    hole.setAttribute("class", "hole");
    block.setAttribute("id", "block" + counter);
    hole.setAttribute("id", "hole" + counter);
    block.style.top = blockLastTop + 100 + "px";
    hole.style.top = holeLastTop + 100 + "px";
    var random = Math.floor(Math.random() * 360);
    hole.style.left = random + "px";
    game.appendChild(block);
    game.appendChild(hole);
    currentBlocks.push(counter);
    counter++;
  }
  var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
  var drop = 0;
  if (characterTop <= 0) {
    clearInterval(blocks);
    endGame();
  }
  for (var i = 0; i < currentBlocks.length; i++) {
    let current = currentBlocks[i];
    let iblock = document.getElementById("block" + current);
    let ihole = document.getElementById("hole" + current);
    let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
    let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
    iblock.style.top = iblockTop - 0.5 + "px";
    ihole.style.top = iblockTop - 0.5 + "px";
    if (iblockTop < -20) {
      currentBlocks.shift();
      iblock.remove();
      ihole.remove();
    }
    if (iblockTop - 20 < characterTop && iblockTop > characterTop) {
      drop++;
      if (iholeLeft <= characterLeft && iholeLeft + 20 >= characterLeft) {
        drop = 0;
        increaseScore();
      }
    }
  }
  if (drop === 0) {
    if (characterTop < 480) {
      character.style.top = characterTop + 2 + "px";
    }
  } else {
    character.style.top = characterTop - 0.5 + "px";
  }

  // Move the hurdle
  var hurdleTop = parseInt(window.getComputedStyle(hurdle).getPropertyValue("top"));
  hurdle.style.top = hurdleTop - 0.5 + "px";

  // Check for collision with the hurdle
  var hurdleLeft = parseInt(window.getComputedStyle(hurdle).getPropertyValue("left"));
  if (characterTop < hurdleTop + 20 && characterTop + 20 > hurdleTop) {
    if (characterLeft + 20 > hurdleLeft && characterLeft < hurdleLeft + 20) {
      endGame();
    }
  }
}, 1);

function endGame() {
  clearInterval(blocks);

  // Create the modal overlay
  var overlay = document.createElement("div");
  overlay.setAttribute("id", "overlay");

  // Create the modal content
  var modal = document.createElement("div");
  modal.setAttribute("id", "modal");

  var message = document.createElement("h2");
  message.textContent = "Game Over";

  var scoreMessage = document.createElement("p");
  scoreMessage.textContent = "Your Score: " + score;

  var restartButton = document.createElement("button");
  restartButton.textContent = "Restart";
  restartButton.addEventListener("click", function () {
    location.reload();
  });

  modal.appendChild(message);
  modal.appendChild(scoreMessage);
  modal.appendChild(restartButton);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function increaseScore() {
  score++;
  document.getElementById("score-display").textContent = "Score: " + score;
}

function changeBackgroundColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var rgbValue = "rgb(" + r + ", " + g + ", " + b + ")";
  document.body.style.backgroundColor = rgbValue;
}

setInterval(changeBackgroundColor, 2000);
// Update the handleTouchMove function
function handleTouchMove(event) {
    event.preventDefault();
    touchEndX = event.touches[0].clientX;
  
    // Call moveLeft or moveRight based on touch movement
    if (touchEndX < touchStartX) {
      // Move character left
      moveLeft();
    } else if (touchEndX > touchStartX) {
      // Move character right
      moveRight();
    }
  }
  
  // Update the event listeners for touch events
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', function (event) {
    handleTouchMove(event);
  }, false);
  document.addEventListener('touchend', handleTouchEnd, false);
  
