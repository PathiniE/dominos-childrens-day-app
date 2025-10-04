"use client";

import React, { useState } from "react";
import { Sparkles, Download } from "lucide-react";
import ImageUploader from "./ImageUploader";
import ImageDisplay from "./ImageDisplay";
import BrightnessSlider from "./BrightnessSlider";

export default function ChildrensDayApp() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [originalFileName, setOriginalFileName] = useState("");
  const [overlayAdded, setOverlayAdded] = useState(false);
  const [brightness, setBrightness] = useState(80);

  const handleAddOverlay = () => {
    setOverlayAdded(true);
  };

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = originalFileName;
        link.click();
        URL.revokeObjectURL(url);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 mb-4">
            World Children's Day 2025 !
          </h1>
          <p className="text-lg md:text-xl text-purple-700 font-semibold">
            Create magical memories with our fun photo frames!
          </p>
        </div>

        {/* Upload Button */}
        <div className="mb-8">
          <ImageUploader
            onImageUpload={(imageData, fileName) => {
              setUploadedImage(imageData);
              setOriginalFileName(fileName);
            }}
            hasImage={!!uploadedImage}
          />
        </div>

        {/* Image Display */}
        {uploadedImage && (
          <div className="mb-8 space-y-6">
            <ImageDisplay
              image={uploadedImage}
              overlayAdded={overlayAdded}
              brightness={brightness}
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!overlayAdded ? (
                <button
                  onClick={handleAddOverlay}
                  className="py-4 px-8 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Sparkles size={24} />
                  Add Magical Frame
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setOverlayAdded(false)}
                    className="py-4 px-8 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Remove Frame
                  </button>
                  <button
                    onClick={handleDownload}
                    className="py-4 px-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <Download size={24} />
                    Download Photo
                  </button>
                </>
              )}
            </div>

            {/* Brightness Slider */}
            {overlayAdded && (
              <div className="mt-6">
                <BrightnessSlider
                  brightness={brightness}
                  onChange={setBrightness}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
