import React from "react";
import { useParams } from "react-router-dom";
import { useSEO } from "../../hooks/useSEO";

export default function SpeakerDetailPage() {
  const { id } = useParams();

  useSEO({
    title: "Speaker Profile | TEDxUOK",
    description: "Learn more about our inspiring speakers at TEDxUOK.",
  });

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Speaker Profile</h1>
      <p className="text-xl text-gray-400">Speaker ID: {id}</p>
    </div>
  );
}
