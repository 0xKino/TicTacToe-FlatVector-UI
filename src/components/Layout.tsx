import  { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="py-4 text-center text-white/50 text-sm">
        <p>© {new Date().getFullYear()} TicTacToe Arena</p>
      </footer>
    </div>
  );
};

export default Layout;
 