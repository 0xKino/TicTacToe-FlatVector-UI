import  { useContext } from 'react';
import { X, Circle } from 'lucide-react';
import GameContext from '../contexts/GameContext';

const GameBoard = () => {
  const { board, handleMove, currentPlayer, gameStatus, gameMode, winner, score } = useContext(GameContext);
  
  const renderCell = (index: number) => {
    const value = board[index];
    const isClickable = gameStatus === 'playing' && value === '';
    
    return (
      <div
        key={index}
        className={`game-cell aspect-square ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
        onClick={() => isClickable && handleMove(index)}
      >
        {value === 'X' && <X className="w-8 h-8 text-x-color stroke-[1.5]" />}
        {value === 'O' && <Circle className="w-8 h-8 text-o-color stroke-[1.5]" />}
      </div>
    );
  };

  const getStatusMessage = () => {
    if (gameStatus === 'won') {
      return `${winner} wins`;
    } else if (gameStatus === 'draw') {
      return 'Draw';
    } else {
      if (gameMode === 'bot') {
        return currentPlayer === 'X' ? 'Your turn' : 'Bot is thinking...';
      } else {
        return `${currentPlayer}'s turn`;
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="w-full mb-8 flex justify-between items-center px-2 text-sm text-secondary font-light">
        <div>
          <span className="mr-1">X:</span>
          <span>{score.X}</span>
        </div>
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider opacity-70">
            {gameMode === 'bot' ? 'BOT MODE' : '2 PLAYER MODE'}
          </p>
          <p className="mt-1 text-white text-sm tracking-wide">
            {getStatusMessage()}
          </p>
        </div>
        <div>
          <span className="mr-1">O:</span>
          <span>{score.O}</span>
        </div>
      </div>
      
      <div className="game-grid w-full max-w-sm">
        {Array(9).fill(null).map((_, index) => renderCell(index))}
      </div>
    </div>
  );
};

export default GameBoard;
 