"use client";

import { IVideo } from "@/models/Video";
import Image from "next/image";
import { useState } from "react";

interface VideoProps {
  video: IVideo;
}

const Video = ({ video }: VideoProps) => {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative aspect-video">
        {playing ? (
          <video
            src={video.videoUrl}
            className="w-full h-full object-cover"
            controls={video.controls}
            autoPlay
            playsInline
          />
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              fill
              className="object-cover"
            />
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-opacity"
            >
              <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-16 border-l-black ml-1" />
              </div>
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
        <p className="text-gray-600 text-sm">{video.description}</p>
      </div>
    </div>
  );
};

export default Video;
