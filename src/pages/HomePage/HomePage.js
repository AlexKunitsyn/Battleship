import React, { useState } from "react";
import {Box, styled} from "@mui/material";
import palette from "../../theme/palette";
// import "./Battleship.css";


const Board = styled(Box)(() => ({
    display: "grid",
    gridTemplateRows: "repeat(10, 40px)",
    gap: "2px",
    marginTop: "20px",
}));

const Row = styled(Box)(() => ({
    display: "grid",
    gridTemplateColumns: "repeat(10, 40px)",
    gap: "2px",
}));

const Cell = styled(Box)(({ status }) => ({
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #000",
    backgroundColor: status === "hit" ? "red" : status === "miss" ? "gray" : "lightblue",
    cursor: "pointer",
}));

const SIZE = 10;
const EMPTY = 0;
const SHIP = 1;
const HIT = 2;
const MISS = 3;

const generateEmptyBoard = () => Array(SIZE).fill(null).map(() => Array(SIZE).fill(EMPTY));

const Battleship = () => {
    const [board, setBoard] = useState(generateEmptyBoard());
    const [turn, setTurn] = useState("player");

    const handleCellClick = (row, col) => {
        if (board[row][col] === EMPTY) {
            const newBoard = board.map((r, i) => r.map((cell, j) => (i === row && j === col ? MISS : cell)));
            setBoard(newBoard);
            setTurn(turn === "player" ? "computer" : "player");
        } else if (board[row][col] === SHIP) {
            const newBoard = board.map((r, i) => r.map((cell, j) => (i === row && j === col ? HIT : cell)));
            setBoard(newBoard);
            setTurn(turn === "player" ? "computer" : "player");
        }
    };

    return (
        <div>
            <h1>Морской бой</h1>
            <h2>Ход: {turn}</h2>
            <Board>
                {board.map((row, rowIndex) => (
                    <Row key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <Cell
                                key={colIndex}
                                className={`cell ${cell === HIT ? "hit" : cell === MISS ? "miss" : "empty"}`}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                            />
                        ))}
                    </Row>
                ))}
            </Board>
        </div>
    );
};

export default Battleship;
