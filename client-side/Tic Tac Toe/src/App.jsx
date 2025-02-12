import React, { useState, useEffect } from 'react';
import TaskList from "./components/TaskList";
import axios from "axios"; 
// Import Bootstrap CSS and JS
import { 
  Container, Button, InputGroup, FormControl
} from 'react-bootstrap'; 
import "./output-final.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [cells, setCells] = useState([
    "x", "x", "x", 
    "x", "x", "x", 
    "x", "x", "x"
  ]);

  const [winningMessage, setWinningMessage] = useState(null); 
  const [go, setGo] = useState("circle"); 
  const [turn, setTurn] = useState("player 1");

  const turnMessage = `${go}'s turn`;
  const message = `It's now ${turn}'s turn`;

  const checkforWin = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (cells[a] === cells[b] && cells[b] === cells[c] && cells[a] !== "x") {
        setWinningMessage(`${cells[a]} wins!`);
        return true;
      }
    }
    return false;
  };

  const handleClick = (e) => {
    console.log(e.target); 

    const taken = e.target.classList.contains("circle") || e.target.classList.contains("cross"); 
  
    if (taken) {
      alert("This cell is already taken.");
      return;
    }

    let selection = prompt(`Choose a cell (row, col):`);
    if (selection === null) {
      alert("Please select a cell up to 3."); 
      return;
    }

    const row = parseInt(selection.split(",")[0], 10); // Convert string to number
    const col = parseInt(selection.split(",")[1], 10); // Convert string to number
    alert(`Row: ${row}, Col: ${col}`);
    
    const cellIndex = row * 3 + col;
    const target = document.querySelectorAll('td')[cellIndex];

    if (turn === "player 1") {
      target.classList.add("circle");
      cells[cellIndex] = "circle";
      target.textContent = ""; 
      setTurn("player 2");
    } else if (turn === "player 2") {
      target.classList.add("cross");
      cells[cellIndex] = "cross";
      target.textContent = "";
      setTurn("player 1");
    }

    if (checkforWin()) {
      setWinningMessage(`${turn} wins!`);
    } else {
      const allCellsTaken = cells.every((cell) => cell === "circle" || cell === "cross");
      if (allCellsTaken) {
        setWinningMessage("It's a draw!");
      }
    }
  };

  return (
    <>
      <Container className="p-5 app">
        <table aria-role="presentation" className="table table-striped game-board">
          <tbody>
            {Array.from({ length: 3 }, (_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: 3 }, (_, colIndex) => {
                  const cellIndex = rowIndex * 3 + colIndex; // Calculate the index for the 1D array
                  return (
                    <td 
                      go={go}
                      onClick={(e) => handleClick(e)}
                      id={cellIndex} 
                      key={cellIndex}
                    >
                      {cells[cellIndex]} {/* Display the cell value */}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <p>{winningMessage || message}</p>
      </Container>
    </>
  );
};

export default App;
