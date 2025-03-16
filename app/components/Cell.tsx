import { Dispatch, SetStateAction } from "react";

type CellProps = {
  id: number;
  go: string;
  setGo: Dispatch<SetStateAction<string>>;
  cells: string[];
  setCells: Dispatch<SetStateAction<string[]>>;
  cell: string;
  winner: string | null;
  checkWinner: (cells: string[]) => void;
};

const Cell = ({ go, setGo, id, cells, setCells, cell, winner, checkWinner }: CellProps) => {
  const handleClick = () => {
    if (cell || winner) return; // Prevent clicking after win

    const newCells = [...cells];
    newCells[id] = go;
    setCells(newCells);
    setGo(go === "X" ? "O" : "X");

    checkWinner(newCells);
  };

  return (
    <div className="square" onClick={handleClick}>
      <div className={cell}>{cell}</div>
    </div>
  );
};

export default Cell;
