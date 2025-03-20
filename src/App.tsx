import  { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import Footer from './components/Footer';
import GameContext from './contexts/GameContext';
import { getEmptyBoard, checkWinner } from './utils/gameUtils';

function App() {
  const [board, setBoard] = useState<string[]>(getEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [gameMode, setGameMode] = useState<'bot' | 'player'>('bot');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'draw'>('playing');
  const [winner, setWinner] = useState<string | null>(null);
  const [score, setScore] = useState({ X: 0, O: 0, ties: 0 });

  // Reset the game
  const resetGame = () => {
    setBoard(getEmptyBoard());
    setCurrentPlayer('X');
    setGameStatus('playing');
    setWinner(null);
  };

  // Handle player move
  const handleMove = (index: number) => {
    if (board[index] !== '' || gameStatus !== 'playing') return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    
    const winner = checkWinner(newBoard);
    const isDraw = !winner && newBoard.every(cell => cell !== '');
    
    if (winner) {
      setGameStatus('won');
      setWinner(winner);
      setScore({
        ...score,
        [winner]: score[winner as keyof typeof score] + 1
      });
    } else if (isDraw) {
      setGameStatus('draw');
      setScore({
        ...score,
        ties: score.ties + 1
      });
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  // Bot move
  useEffect(() => {
    if (gameMode === 'bot' && currentPlayer === 'O' && gameStatus === 'playing') {
      const timer = setTimeout(() => {
        const emptyCells = board.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);
        if (emptyCells.length > 0) {
          const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
          handleMove(randomIndex);
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameMode, gameStatus]);

  // Toggle game mode
  const toggleGameMode = () => {
    const newMode = gameMode === 'bot' ? 'player' : 'bot';
    setGameMode(newMode);
    resetGame();
  };

  return (
    <GameContext.Provider value={{
      board,
      currentPlayer,
      gameMode,
      gameStatus,
      winner,
      score,
      handleMove,
      resetGame,
      toggleGameMode
    }}>
      <div className="flex flex-col min-h-screen items-center justify-center">
        <Header />
        <main className="flex-1 flex items-center justify-center w-full px-4">
          <GameBoard />
        </main>
        <Footer />
      </div>
    </GameContext.Provider>
  );
}

export default App;
 