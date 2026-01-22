const Dashboard = () => {
  const stats = [
    { label: 'Waste Redirected', val: '4,250 kg', color: 'text-green-400' },
    { label: 'Revenue Generated', val: '₹85,400', color: 'text-blue-400' }
  ];

  return (
    <div className="py-10 px-4">
      <h1 className="text-4xl font-black mb-10">Factory Impact</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="glass p-10 rounded-[32px] border-l-4 border-l-brand-green">
            <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{s.label}</p>
            <h2 className={`text-5xl font-black ${s.color}`}>{s.val}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;