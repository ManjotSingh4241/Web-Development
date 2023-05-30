console.log("Welcome to Tic Tac Toe");
let music = new Audio("win.mp3");
let boxes = document.querySelectorAll('.tile');
let boxtext = document.querySelectorAll('.boxtext');
let info = document.querySelector('.info');
let image = document.querySelector('.image');
let resetButton = document.getElementById("reset");
let turn = "X";
let isGameOver = false;
let playerXScore = 0;
let playerOScore = 0;

const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

Array.from(boxes).forEach((element) => {
  element.classList.add('hover');
});

const checkWin = () => {
  let wins = [
    [0, 1, 2, 0, -12, 0],
    [3, 4, 5, 0, 0, 0],
    [6, 7, 8, 0, 12, 0],
    [0, 3, 6, -12, 0, 90],
    [1, 4, 7, 0, 0, 90],
    [2, 5, 8, 12, 0, 90],
    [0, 4, 8, 0, 0, 45],
    [2, 4, 6, 0, 0, -45],
  ];

  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      boxes[e[0]].classList.add('background');
      boxes[e[1]].classList.add('background');
      boxes[e[2]].classList.add('background');
      boxtext[e[0]].style.color = "#fff";
      boxtext[e[1]].style.color = "#fff";
      boxtext[e[2]].style.color = "#fff";
      info.innerText = boxtext[e[0]].innerText + " Won!";
      isGameOver = true;
      image.getElementsByTagName('img')[0].style.width = "150px";
      document.querySelector('.line').style.width = "72%";
      document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      music.play();
      
      Array.from(boxes).forEach((element) => {
        element.classList.remove('hover');
      });

      if (boxtext[e[0]].innerText === "X") {
        playerXScore++;
        document.getElementById("player-x-score").innerText = `Player X: ${playerXScore}`;
      } else if (boxtext[e[0]].innerText === "O") {
        playerOScore++;
        document.getElementById("player-o-score").innerText = `Player O: ${playerOScore}`;
      }
    }
  });
};

Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector('.boxtext');
  element.addEventListener('click', () => {
    if (!isGameOver && boxtext.innerText === '') {
      boxtext.innerText = turn;
      turn = changeTurn();
      color();
      checkWin();
      if (!isGameOver) {
        info.innerText = `Turn for ${turn}`;
      }
    }
  });
});

function color() {
  Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector('.boxtext');
    if (boxtext.innerText === "X") {
      boxtext.style.color = "red";
    }
    if (boxtext.innerText === "O") {
      boxtext.style.color = "yellow";
    }
  });
}

resetButton.addEventListener('click', () => {
  Array.from(boxtext).forEach((element) => {
    element.innerText = "";
  });
  turn = "X";
  isGameOver = false;
  info.innerText = `Turn for ${turn}`;
  document.querySelector('.image').getElementsByTagName('img')[0].style.width = "0px";
  document.querySelector('.line').style.width = "0%";
  background();
});

function background() {
  let box = document.querySelectorAll('.tile');
  Array.from(box).forEach((element) => {
    element.classList.remove('background');
  });
}

