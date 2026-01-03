
import React, { useState } from 'react';
import { soundManager } from '../services/SoundManager';
import AdContainer from './AdContainer';

type Player = 'X' | 'O' | null;

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player | 'Draw'>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const calculateWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    if (squares.every(s => s !== null)) return { winner: 'Draw' as const, line: null };
    return null;
  };

  const handleClick = (i: number) => {
    if (winner || board[i]) return;

    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    
    const result = calculateWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      if (result.winner === 'Draw') {
        soundManager.play('buzz');
      } else {
        soundManager.play('tada');
      }
    } else {
      soundManager.play('click');
      setXIsNext(!xIsNext);
    }
  };

  const resetGame = () => {
    soundManager.play('whoosh');
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  return (
    <div className="flex flex-col items-center gap-8 py-8 fade-in relative">
      <div className="text-center">
        <h3 className="text-2xl font-black mb-2 dark:text-white">
          {winner === 'Draw' ? (
            <span className="text-yellow-500">It's a Draw! 🤝</span>
          ) : winner ? (
            <span className={winner === 'X' ? 'text-blue-500' : 'text-red-500'}>
              Player {winner} Wins! 🎉
            </span>
          ) : (
            <span className="text-gray-500">
              Next Turn: <span className={xIsNext ? 'text-blue-500' : 'text-red-500'}>{xIsNext ? 'X' : 'O'}</span>
            </span>
          )}
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-3 bg-gray-200 dark:bg-zinc-800 p-3 rounded-2xl shadow-xl border dark:border-zinc-700">
        {board.map((square, i) => {
          const isWinningSquare = winningLine?.includes(i);
          return (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`
                w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center text-4xl font-black transition-all
                ${!square && !winner ? 'bg-white dark:bg-zinc-900 hover:bg-blue-50 dark:hover:bg-zinc-800 cursor-pointer shadow-sm' : 'bg-gray-50 dark:bg-zinc-950 cursor-default'}
                ${isWinningSquare ? 'ring-4 ring-blue-500 scale-105 z-10' : ''}
              `}
            >
              <span className={`
                pop-in 
                ${square === 'X' ? 'text-blue-500' : 'text-red-500'}
                ${isWinningSquare ? 'animate-bounce' : ''}
              `}>
                {square}
              </span>
            </button>
          );
        })}
      </div>

      {winner && (
        <div className="fade-in flex flex-col items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border dark:border-zinc-800 shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="text-lg font-bold mb-2">Game Over!</div>
          <AdContainer 
            id="ad-game-over-300" 
            width="300px" 
            height="250px" 
            label="Game Over Box" 
            adKey="4f52a4b1f5dba3d1b6bf80d44634631d"
            className="rounded-lg shadow-inner"
          />
          <button
            onClick={resetGame}
            className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95"
          >
            Play Again
          </button>
        </div>
      )}

      {!winner && (
        <button
          onClick={resetGame}
          className="px-8 py-3 bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 font-bold rounded-xl hover:bg-gray-300 transition-all active:scale-95"
        >
          Reset Board
        </button>
      )}

      <div className="mt-4 text-[10px] text-gray-400 dark:text-zinc-600 uppercase tracking-widest font-bold">
        Classical Logic • Local PvP
      </div>
    </div>
  );
};

export default TicTacToe;
