function CardSkeleton() {
  return (
    <div className="w-full max-w-md p-6 rounded-md shadow-md bg-slate-400/30 animate-pulse">
      <div className="w-2/3 h-5 mb-4 bg-slate-300/50"></div>
      <div className="w-full h-16 mb-2 bg-slate-300/50"></div>
      <div className="w-full h-10 mb-2 bg-slate-300/50"></div>
    </div>
  );
}

export default CardSkeleton;
