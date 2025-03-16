"use client";

import { useState } from "react";
import Cell from "./components/Cell";

export default function Home() {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [go, setGo] = useState("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const checkWinner = (cells: string[]) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6],           // Diagonals
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        setWinner(cells[a]);
        setScore((prevScore) => ({
          ...prevScore,
          [cells[a]]: prevScore[cells[a]] + 1, // Increment winner's score
        }));
        return;
      }
    }

    if (!cells.includes("")) {
      setWinner("Draw");
    }
  };

  const resetGame = () => {
    setCells(Array(9).fill(""));
    setGo("X");
    setWinner(null);
  };

  const resetScore = () => {
    setScore({ X: 0, O: 0 });
    resetGame();
  };

  return (
    <div className="container">
      <h1 className="title">Tic-Tac-Toe</h1>
      
      <div className="scoreboard">
        <span className="score">X: {score.X}</span>
        <span className="score">O: {score.O}</span>
      </div>

      <div className="gameboard">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            id={index}
            go={go}
            setGo={setGo}
            cells={cells}
            setCells={setCells}
            cell={cell}
            winner={winner}
            checkWinner={checkWinner}
          />
        ))}
      </div>

      <div className="status">
        {winner ? (
          winner === "Draw" ? "It's a Draw!" : `${winner} Wins! 🎉`
        ) : (
          `It's now ${go}'s turn`
        )}
      </div>

      <div className="buttons">
        {winner && <button className="reset-btn" onClick={resetGame}>New Round</button>}
        <button className="reset-btn reset-score" onClick={resetScore}>Reset Score</button>
      </div>
    </div>
  );
}
