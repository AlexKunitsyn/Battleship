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

// Количество кораблей
const SHIP_COUNTS = {
    1: 4,
    2: 3,
    3: 2,
    4: 1,
};

const generateEmptyBoard = () => Array.from({ length: SIZE }, () => Array(SIZE).fill(EMPTY));

const Battleship = () => {
    const [board, setBoard] = useState(generateEmptyBoard());
    const [turn, setTurn] = useState("player");
    const [ships, setShips] = useState([]);
    const [selectedShip, setSelectedShip] = useState({ length: 1, isVertical: true });
    const [shipsLeft, setShipsLeft] = useState(false);
    const [error, setError] = useState(false);

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

        if (board[row][col] === MISS || board[row][col] === HIT) {
            alert('Take another step')
        }
    };

    const isValidPlacement = (row, col, length, isVertical) => {
        for (let i = 0; i < length; i++) {
            let r = isVertical ? row + i : row;
            let c = isVertical ? col : col + i;

            if (r >= SIZE || c >= SIZE || board[r][c] === SHIP) return false;

            // Проверка соседних клеток
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    let nr = r + dr;
                    let nc = c + dc;
                    if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) {
                        if (board[nr][nc] === SHIP) return false;
                    }
                }
            }
        }
        return true;
    };

    // Установка корабля
    const placeShip = (row, col) => {
        const { length, isVertical } = selectedShip;
        if (shipsLeft[length] <= 0) {
            setError("Все корабли данного типа уже расставлены!");
            return;
        }

        if (!isValidPlacement(row, col, length, isVertical)) {
            setError("Ошибка! Корабль нельзя поставить здесь.");
            return;
        }

        setError("");
        const newBoard = [...board];
        const newShips = [...ships];

        for (let i = 0; i < length; i++) {
            let r = isVertical ? row + i : row;
            let c = isVertical ? col : col + i;
            newBoard[r][c] = SHIP;
        }

        newShips.push({ row, col, length, isVertical });
        setBoard(newBoard);
        setShips(newShips);
        setShipsLeft((prev) => ({ ...prev, [length]: prev[length] - 1 }));
    };

    // Выбор типа корабля
    const selectShip = (length, isVertical) => {
        setSelectedShip({ length, isVertical });
    };

    return (
        <div>
            <h1>Морской бой</h1>
            <h2>Ход: {turn}</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <h3>Выбор корабля:</h3>
            <div>
                {[1, 2, 3, 4].map((length) => (
                    <button
                        key={length}
                        disabled={shipsLeft[length] <= 0}
                        onClick={() => selectShip(length, selectedShip.isVertical)}
                        style={{
                            margin: "5px",
                            padding: "10px",
                            backgroundColor: selectedShip.length === length ? "lightblue" : "white",
                        }}
                    >
                        {length}-палубный ({shipsLeft[length]} осталось)
                    </button>
                ))}
            </div>

            <button onClick={() => setSelectedShip({ ...selectedShip, isVertical: !selectedShip.isVertical })}>
                {selectedShip.isVertical ? "Вертикально" : "Горизонтально"}
            </button>
            <Board>
                {board.map((row, rowIndex) => (
                    <Row key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <Cell
                                key={colIndex}
                                className={`cell ${cell === HIT ? "hit" : cell === MISS ? "miss" : "empty"}`}
                                // onClick={() => handleCellClick(rowIndex, colIndex)}
                                onClick={() => placeShip(rowIndex, colIndex)}
                            >{cell}</Cell>
                        ))}
                    </Row>
                ))}
            </Board>
        </div>
    );
};

export default Battleship;
