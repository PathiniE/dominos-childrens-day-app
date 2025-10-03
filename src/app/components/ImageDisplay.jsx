"use client";

import React, { useRef, useEffect } from "react";

export default function ImageDisplay({ image, overlayAdded, brightness }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!image || !overlayAdded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the uploaded image
      ctx.drawImage(img, 0, 0);

      // Load and draw overlay
      const overlay = new Image();
      overlay.onload = () => {
        // Apply brightness filter
        ctx.globalAlpha = brightness / 100;
        ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
      };
      overlay.src = "/images/overlay.png";
    };
    img.src = image;
  }, [image, overlayAdded, brightness]);

  if (!overlayAdded) {
    return (
      <div className="relative w-full max-w-2xl mx-auto overflow-hidden shadow-2xl">
        <img src={image} alt="Uploaded" className="w-full h-auto" />
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden shadow-2xl">
      <canvas ref={canvasRef} className="w-full h-auto" />
    </div>
  );
}
