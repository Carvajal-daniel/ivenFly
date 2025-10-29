export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-950">
      <div className="relative">
        {/* Spinner principal */}
        <div className="w-14 h-14 border-3 border-gray-800 border-t-primary rounded-full animate-spin"></div>
        
        {/* Ponto central sutil */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full opacity-60"></div>
      </div>
    </div>
  );
}