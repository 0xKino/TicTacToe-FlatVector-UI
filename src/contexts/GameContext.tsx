import  { createContext } from 'react';

interface GameContextType {
  board: string[];
  currentPlayer: 'X' | 'O';
  gameMode: 'bot' | 'player';
  gameStatus: 'playing' | 'won' | 'draw';
  winner: string | null;
  score: {
    X: number;
    O: number;
    ties: number;
  };
  handleMove: (index: number) => void;
  resetGame: () => void;
  toggleGameMode: () => void;
}

const defaultContext: GameContextType = {
  board: Array(9).fill(''),
  currentPlayer: 'X',
  gameMode: 'bot',
  gameStatus: 'playing',
  winner: null,
  score: { X: 0, O: 0, ties: 0 },
  handleMove: () => {},
  resetGame: () => {},
  toggleGameMode: () => {}
};

const GameContext = createContext<GameContextType>(defaultContext);

export default GameContext;
 