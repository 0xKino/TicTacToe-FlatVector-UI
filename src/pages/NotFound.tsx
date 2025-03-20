import  { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
      <h1 className="text-3xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-white/70 mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary flex items-center gap-2">
        <Home size={18} />
        <span>Go Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
 