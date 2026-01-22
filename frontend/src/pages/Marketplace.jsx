import { Link } from 'react-router-dom';

const Marketplace = () => {
  // Enhanced data with prices to increase visual density
  const listings = [
    { id: 1, name: "Black Rubber Scraps", qty: "500kg", price: "₹42/kg", loc: "Sector 24, Faridabad", type: "Industrial" },
    { id: 2, name: "Denim Textile Waste", qty: "1200kg", price: "₹28/kg", loc: "Okhla Phase III", type: "Textile" },
    { id: 3, name: "Copper Wire Strips", qty: "250kg", price: "₹610/kg", loc: "Sector 58, Faridabad", type: "Metal" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* 1. Header Section with Call-to-Action */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter">
            <span className="text-green-400"></span> Circular Marketplace
          </h1>
          <p className="text-slate-400 font-bold tracking-widest text-xs mt-2 uppercase">
            Live industrial listings from verified MSME hubs
          </p>
        </div>
        <button className="px-8 py-3 bg-green-500 text-black font-black rounded-2xl hover:bg-green-400 transition-all active:scale-95 shadow-lg shadow-green-900/20">
          LIST YOUR WASTE +
        </button>
      </div>

      {/* 2. Optimized 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((item) => (
          <div key={item.id} className="glass group p-1 rounded-[40px] border-white/5 hover:border-green-500/30 transition-all duration-500">
            <div className="bg-slate-900/40 rounded-[36px] p-8 h-full flex flex-col relative overflow-hidden">
              
              {/* Trust Badge */}
              <div className="absolute top-6 right-6 flex items-center gap-1 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[9px] font-black text-green-500 uppercase tracking-tighter">AI Verified</span>
              </div>

              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block">
                {item.type}
              </span>
              
              <h3 className="text-2xl font-black text-white mb-1 group-hover:text-green-400 transition-colors">
                {item.name}
              </h3>
              <p className="text-slate-500 text-xs font-medium mb-8 italic">{item.loc}</p>

              {/* Pricing & Quantity Divider */}
              <div className="flex justify-between items-end pt-6 border-t border-white/5 mt-auto">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Quantity</p>
                  <p className="text-2xl font-black text-white font-mono tracking-tighter">{item.qty}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Current Bid</p>
                  <p className="text-2xl font-black text-green-400 font-mono tracking-tighter">{item.price}</p>
                </div>
              </div>

              {/* Action Button */}
              <Link to={`/listing/${item.id}`} className="w-full mt-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-center hover:bg-white hover:text-black transition-all">
                View Trade Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;