

export const PageNotFoundView = () => {
  
  return (
    <div className="w-full h-screen">
      <p className="text-center text-[50px] font-bold text-pink-400">
        Sorry page not found
      </p>
      <div className="h-[100%] flex justify-center items-center">
        <div className="text-[100px] animate-ping">
          <span className="text-cyan-400">4</span>
          <span className="text-pink-400">0</span>
          <span className="text-cyan-400">4</span>
        </div>
      </div>
    </div>
  );
}
