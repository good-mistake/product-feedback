"use client";
import animationData from "../Animation - 1748181041132.json";
import Lottie from "lottie-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}
