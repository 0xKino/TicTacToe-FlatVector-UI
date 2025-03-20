import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Users, Copy } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const [joinGameId, setJoinGameId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { createGame, joinGame, findGame } = useGame();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreateGame = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      const gameId = await createGame();
      navigate(`/game/${gameId}`);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGame = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!joinGameId.trim()) {
      setError('Please enter a game ID');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      await joinGame(joinGameId);
      navigate(`/game/${joinGameId}`);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickMatch = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const gameId = await findGame();
      
      if (gameId) {
        await joinGame(gameId);
        navigate(`/game/${gameId}`);
      } else {
        const newGameId = await createGame();
        navigate(`/game/${newGameId}`);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="max-w-xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-3">
            <span className="text-x-color">Tic</span>
            <span className="text-o-color">Tac</span>
            <span className="text-accent">Toe</span>
            <span className="text-white ml-2">Arena</span>
          </h1>
          <p className="text-white/70">
            Challenge players worldwide and climb the ELO leaderboard
          </p>
        </div>
        
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Play className="text-primary" size={20} />
            Play Now
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleCreateGame}
              disabled={loading}
              className="btn btn-primary"
            >
              Create New Game
            </button>
            
            <button
              onClick={handleQuickMatch}
              disabled={loading}
              className="btn btn-secondary flex items-center justify-center gap-2"
            >
              <Users size={18} />
              Quick Match
            </button>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Join Game</h2>
          
          <div className="flex gap-2">
            <input
              type="text"
              className="input flex-1"
              placeholder="Enter Game ID"
              value={joinGameId}
              onChange={(e) => setJoinGameId(e.target.value)}
            />
            
            <button
              onClick={handleJoinGame}
              disabled={loading}
              className="btn btn-primary flex items-center gap-2"
            >
              <Copy size={18} />
              Join
            </button>
          </div>
          
          {error && (
            <p className="mt-3 text-red-400 text-sm">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
 