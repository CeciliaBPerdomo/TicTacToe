import React, { useState } from "react";

//create your first component
const Home = () => {
	const [board, setBoard] = useState(Array(9).fill(null));
	const [xIsNext, setXIsNext] = useState(true);

	const handleClick = (index) => {
		if (board[index] || calculateWinner(board)) return;
		const newBoard = [...board];
		newBoard[index] = xIsNext ? "X" : "O";
		setBoard(newBoard);
		setXIsNext(!xIsNext);
	};

	const calculateWinner = (squares) => {
		const lines = [
			[0, 1, 2], [3, 4, 5], [6, 7, 8],
			[0, 3, 6], [1, 4, 7], [2, 5, 8],
			[0, 4, 8], [2, 4, 6]
		];
		for (let line of lines) {
			const [a, b, c] = line;
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				return squares[a];
			}
		}
		return null;
	};

	const winner = calculateWinner(board);
	const status = winner ? `Ganó ${winner}!` : `Turno de ${xIsNext ? "X" : "O"}`;

	return (
		<div className="container mt-5"
			style={{ textAlign: "center", fontFamily: "Arial" }}
		>
			<h2>{status}</h2>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 80px)", gap: "5px", justifyContent: "center", }}>
				{board.map((cell, index) => (
					<button
						key={index}
						onClick={() => handleClick(index)}
						style={{ width: "80px", height: "80px", fontSize: "24px", cursor: "pointer", borderRadius: "5px" }}>
						{cell}
					</button>
				))}
			</div>
			<button className="btn btn-outline-danger"
				onClick={() => setBoard(Array(9).fill(null))}
				style={{ marginTop: "10px", padding: "8px", fontSize: "16px", cursor: "pointer" }}
			>
				Volver a comenzar!
			</button>
		</div>
	);
};

export default Home;