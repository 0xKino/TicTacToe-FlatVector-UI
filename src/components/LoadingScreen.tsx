import  { Activity } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background">
      <Activity className="w-12 h-12 text-primary animate-pulse" />
      <h2 className="mt-4 text-xl font-semibold">Loading...</h2>
    </div>
  );
};

export default LoadingScreen;
 