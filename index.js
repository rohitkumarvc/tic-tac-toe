var players = [];
var user_details_button = document.querySelector(".user-input");
var turn = document.querySelector(".turn");

user_details_button.addEventListener("click", () => {
  var player1 = document.querySelector("#player1").value;
  var player2 = document.querySelector("#player2").value;

  if (player1 === player2 && player1 !== "") player2 = `${player2}1`;
  if (player1 === "" || player2 === "")
    alert("Enter the name of both the players");
  else {
    players.push(player1, player2);

    document.querySelector(".user-info").style.display = "none";
    document.querySelector("main").style.display = "flex";
    turn.innerHTML = `${players[0]}'s turn`;
  }
});

console.log(players);
console.log(turn.innerHTML);

var cell = document.querySelectorAll(".cell");
var cnt = 0;

for (var i = 0; i < cell.length; i++) {
  cell[i].addEventListener("click", (event) => {
    var className = event.target.className;
    var currVal = document.getElementsByClassName(className)[0].innerHTML;
    if (currVal === "X" || currVal === "O") return;
    let val;

    if (cnt % 2 === 0) {
      val = "X";
      turn.innerHTML = `${players[1]}'s turn`;
    } else {
      val = "O";
      turn.innerHTML = `${players[0]}'s turn`;
    }

    document.getElementsByClassName(className)[0].innerHTML = val;
    cnt = cnt + 1;

    var res = checkWinner();

    if (res === false && cnt === 9) {
      draw();
    }
  });
}

var draw = async () => {
  await new Promise((resolve, reject) => setTimeout(resolve, 100));
  alert("Draw");
  clearAll();
  cnt = 0;
};

var clearAll = () => {
  for (var i = 0; i < cell.length; i++) {
    cell[i].innerHTML = "";
  }
};

var showResult = (winner) => {
  document.querySelector("main").style.display = "none";
  document.querySelector(".winner").innerHTML = winner;
  document.querySelector(".results").style.display = "flex";
};

var checkWinner = () => {
  var winnerPos = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  winnerPos.forEach(async (e) => {
    if (
      cell[e[0]].innerHTML === cell[e[1]].innerHTML &&
      cell[e[0]].innerHTML === cell[e[2]].innerHTML &&
      cell[e[0]].innerHTML !== ""
    ) {
      await new Promise((resolve, reject) => setTimeout(resolve));
      var winner_name;
      if (cell[e[0]].innerHTML === "X") winner_name = players[0];
      else winner_name = players[1];
      showResult(winner_name);
      return true;
    }
    else return false;
  });
};

var button = document.querySelector(".reset");
button.addEventListener("click", clearAll);

var resultOk = document.querySelector(".btn");
resultOk.addEventListener("click", () => {
  document.querySelector("main").style.display = "flex";
  document.querySelector(".results").style.display = "none";
  clearAll();
});
