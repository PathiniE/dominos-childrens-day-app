"use client";

import React, { useRef, useEffect } from "react";

export default function ImageDisplay({ image, overlayAdded, brightness }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!image || !overlayAdded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    const overlay = new Image();

    overlay.onload = () => {
      // Set canvas to overlay dimensions
      canvas.width = overlay.width;
      canvas.height = overlay.height;

      // Apply brightness filter to uploaded image
      ctx.filter = `brightness(${brightness}%)`;
      ctx.drawImage(img, 0, 0, overlay.width, overlay.height);
      ctx.filter = "none";

      // Draw overlay at full opacity
      ctx.drawImage(overlay, 0, 0, overlay.width, overlay.height);
    };

    img.onload = () => {
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
