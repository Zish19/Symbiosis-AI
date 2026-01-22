const LiveBg = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Subtle floating recycling symbols or leaves */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-10 animate-float text-green-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${Math.random() * 20 + 20}px`
          }}
        >
          ♻️
        </div>
      ))}
    </div>
  );
};

export default LiveBg;