import React from 'react';
import dynamic from 'next/dynamic';

const HRPredictionTable = dynamic(() => import('../components/HRPredictionTable'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <HRPredictionTable />
    </div>
  );
}
