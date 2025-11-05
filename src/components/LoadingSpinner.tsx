export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-950">
      <div className="relative">
        {/* Spinner principal */}
        <div className="w-14 h-14 border-3 border-gray-800 border-t-primary rounded-full animate-spin"></div>

        
      </div>
    </div>
  );
}