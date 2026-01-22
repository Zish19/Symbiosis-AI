import React from 'react';
import { Leaf } from 'lucide-react';

const Certificate = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl max-w-lg w-full text-center relative">
        <button onClick={onClose} className="absolute top-4 right-4 font-bold text-gray-500">✕</button>
        
        <div className="bg-green-100 text-green-600 p-4 rounded-full inline-block mb-4">
          <Leaf size={40} />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Certificate of Recycling</h2>
        <p className="text-gray-600 mb-6">Verified by Symbiosis AI</p>
        
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
          <p className="text-sm text-gray-500 uppercase">Material Saved</p>
          <p className="text-xl font-bold text-gray-900">{data?.analysis?.material || "Material"}</p>
        </div>

        <button className="bg-green-600 text-white w-full py-3 rounded-xl font-bold">
          Download Feature Coming Soon
        </button>
      </div>
    </div>
  );
};

export default Certificate;