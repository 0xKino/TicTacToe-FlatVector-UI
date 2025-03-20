import  { useContext } from 'react';
import { RotateCcw, GitBranch } from 'lucide-react';
import GameContext from '../contexts/GameContext';

const Header = () => {
  const { resetGame, toggleGameMode, gameMode } = useContext(GameContext);
  
  return (
    <header className="w-full max-w-md py-8 flex items-center justify-between">
      <h1 className="text-xl font-light tracking-widest">
        TIC-TAC-TOE
      </h1>
      <div className="flex gap-2">
        <button
          onClick={toggleGameMode}
          className="btn-icon"
          title={gameMode === 'bot' ? 'Switch to 2 Player Mode' : 'Switch to Bot Mode'}
        >
          <GitBranch size={16} />
        </button>
        <button
          onClick={resetGame}
          className="btn-icon"
          title="Reset Game"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </header>
  );
};

export default Header;
 