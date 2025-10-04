'use client';

import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

export default function ImageUploader({ onImageUpload, hasImage }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageUpload(event.target.result, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
      >
        <Upload size={24} />
        {hasImage ? 'Change Photo' : 'Upload Your Photo'}
      </button>
    </div>
  );
}
