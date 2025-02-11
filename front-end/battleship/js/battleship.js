
let squares = document.querySelectorAll(`div[class^="square-"]`);
let ifHit = null;
let hits = 0;
let randomLoc = Math.floor(Math.random() * 9);

function handleKeyPress(e) {
  if (e.key == "space") {
    alert("Hello");
  }
}

for (let i = 0; i < squares.length; i++) {
  function generateShip(health) {
    let loc1, loc2, loc3, loc4, loc5;

    loc1 = randomLoc;
    loc2 = loc1 + 1;
    loc3 = loc2 + 1;
    loc4 = loc3 + 1;
    loc5 = loc4 + 1;
    this.health = health;
    this.isSunk = () => {
      alert("You've sunk my battleship");
    }
    this.isHit = (e) => {
      e.target.classList.add("hit");
      hits++;

      this.health -= 1;
      if (this.health == 0 || document.querySelectorAll(".miss").length > 6) {
        alert("Game over");
      }
    }
    this.speak = (e) => {
      if (e.target.textContent == "A3") {

      }
    }
  }

  let newShip = new generateShip(5);

  squares[i].addEventListener("keydown", (e) => {
    if (e.isComposing || e.keyCode == 32) {
      e.stopPropagation();
      const clickedSquareClass = squares[i].className.split(" ")[0];
      let loc1 = Math.floor(Math.random() * 9);
      let loc2 = loc1 + 1;
      let loc3 = loc2 + 1;
      let loc4 = loc3 + 1;
      let loc5 = loc4 + 1;

      let squareClass = e.target.className;
      if (squareClass.includes("square-")) {
        let squareNumber = parseInt(squareClass.replace("square-", ""));
        if (loc1 == squareNumber || loc2 == squareNumber || loc3 == squareNumber || loc4 == squareNumber || loc5 == squareNumber) {
          newShip.isHit(e);
        } else {
          e.target.textContent = "Miss";
          e.target.classList.add("miss");
        }
      }
    }
    //Adding shortcut functionality
    if (e.keyCode == 37) {
      e.target.blur();
      e.target.previousElementSibling.focus();
    }
    if (e.keyCode == 39) {
      e.target.blur();
      e.target.nextElementSibling.focus();
    }
    if (e.keyCode == 38) {
      e.target.blur();
      e.target.previousElementSibling.previousElementSibling.previousElementSibling.focus();
    }
    if (e.keyCode == 40) {
      e.target.blur();
      e.target.nextElementSibling.nextElementSibling.nextElementSibling.focus();
    }
    if (e.keyCode == 37 || e.keyCode == 39) {
      e.target.blur();
    }
  })

  squares[i].addEventListener("click", (e) => {
    e.stopPropagation();
    const clickedSquareClass = squares[i].className.split(" ")[0];
    let loc1 = Math.floor(Math.random() * 9);
    let loc2 = loc1 + 1;
    let loc3 = loc2 + 1;
    let loc4 = loc3 + 1;
    let loc5 = loc4 + 1;

    let squareClass = e.target.className;
    if (squareClass.includes("square-")) {
      let squareNumber = parseInt(squareClass.replace("square-", ""));
      if (loc1 == squareNumber || loc2 == squareNumber || loc3 == squareNumber || loc4 == squareNumber || loc5 == squareNumber) {
        newShip.isHit(e);
      } else {
        e.target.textContent = "Miss";
        e.target.classList.add("miss");
      }
    }
    for (let i = 0; i < document.querySelectorAll(".hit").length; i++) {
      if (document.querySelectorAll(".hit").length > 3) {
        ifHit = true;
        alert("game over");
        for (square of squares) {
          square.classList.remove("hit");
        }
      } else if (document.querySelectorAll(".miss").length > 6) {
        alert("Game over");
      }
    }
  })
}
