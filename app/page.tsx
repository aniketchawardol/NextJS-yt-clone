"use client";
import VideoFeed from "./components/VideoFeed";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest Videos</h1>
      <VideoFeed />
    </div>
  );
}
