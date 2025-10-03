'use client';

import React from 'react';
import { Sun } from 'lucide-react';

export default function BrightnessSlider({ brightness, onChange }) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Sun className="text-yellow-500" size={24} />
        <span className="font-bold text-gray-700">Image Brightness</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={brightness}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 bg-gradient-to-r from-yellow-200 to-yellow-500 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #fef08a ${brightness}%, #e5e7eb ${brightness}%)`
        }}
      />
      <div className="text-center mt-2 text-sm text-gray-600 font-semibold">
        {brightness}%
      </div>
    </div>
  );
}