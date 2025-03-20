import  { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';
import GameBoard from '../components/GameBoard';

const Game = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { currentGame, joinGame } = useGame();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!gameId || !user) return;
    
    const loadGame = async () => {
      try {
        if (!currentGame || currentGame.id !== gameId) {
          await joinGame(gameId);
        }
      } catch (error) {
        console.error('Error loading game:', error);
      }
    };
    
    loadGame();
  }, [gameId, user]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="btn btn-outline flex items-center gap-2 py-2"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </button>
      </div>
      
      {gameId && <GameBoard gameId={gameId} />}
    </div>
  );
};

export default Game;
 