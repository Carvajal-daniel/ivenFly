export const SuccessMessage = () => (
  <div className="text-center space-y-4">
    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
      <svg
        className="w-8 h-8 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-green-800">Conta criada com sucesso!</h3>
      <p className="text-sm text-green-600 mt-1">Redirecionando para o login...</p>
    </div>
  </div>
);
