import  { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Award, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="bg-black/30 backdrop-blur-lg border-b border-white/10 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center text-2xl font-bold text-white">
              <span className="text-x-color">Tic</span>
              <span className="text-o-color">Tac</span>
              <span className="text-accent">Toe</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/" className="btn-outline btn-sm rounded-full p-2" title="Home">
              <Home size={18} />
            </Link>
            
            <Link to="/leaderboard" className="btn-outline btn-sm rounded-full p-2" title="Leaderboard">
              <Award size={18} />
            </Link>
            
            {userProfile ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium">{userProfile.username}</span>
                  <span className="text-xs text-primary">ELO: {userProfile.elo}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="btn-outline btn-sm rounded-full p-2"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-outline rounded-full flex items-center gap-2 py-1.5 px-3">
                <User size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
 