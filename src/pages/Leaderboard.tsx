import  { useEffect, useState } from 'react';
import { Award, Medal, Trophy, User } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { UserProfile } from '../contexts/AuthContext';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { getLeaderboard } = useGame();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-400" />;
      case 2:
        return <Medal className="text-gray-400" />;
      case 3:
        return <Medal className="text-amber-700" />;
      default:
        return <User className="text-white/50" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Award className="w-8 h-8 text-accent" />
        <h1 className="text-3xl font-bold">Leaderboard</h1>
      </div>
      
      {loading ? (
        <div className="card text-center py-8">
          <p className="animate-pulse">Loading leaderboard...</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left">Rank</th>
                  <th className="px-4 py-3 text-left">Player</th>
                  <th className="px-4 py-3 text-right">ELO</th>
                  <th className="px-4 py-3 text-right">W</th>
                  <th className="px-4 py-3 text-right">L</th>
                  <th className="px-4 py-3 text-right">D</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((player, index) => (
                  <tr 
                    key={player.uid}
                    className={`border-b border-white/5 hover:bg-white/5 transition-colors ${index < 3 ? 'font-medium' : ''}`}
                  >
                    <td className="px-4 py-3 flex items-center gap-1.5">
                      <span className="w-5 h-5 flex-shrink-0">
                        {getRankIcon(index + 1)}
                      </span>
                      <span>#{index + 1}</span>
                    </td>
                    <td className="px-4 py-3">{player.username}</td>
                    <td className="px-4 py-3 text-right font-mono font-medium text-primary">
                      {player.elo}
                    </td>
                    <td className="px-4 py-3 text-right text-green-400">{player.wins}</td>
                    <td className="px-4 py-3 text-right text-red-400">{player.losses}</td>
                    <td className="px-4 py-3 text-right text-yellow-400">{player.draws}</td>
                  </tr>
                ))}
                
                {leaderboard.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-white/50">
                      No players on the leaderboard yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
 