"use client";

import { useEffect, useState } from "react";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-client";
import Video from "./Video";
import { useNotification } from "./Notification";

const VideoFeed = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        showNotification("Failed to load videos", "error");
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [showNotification]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No videos available yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <Video key={video._id?.toString()} video={video} />
      ))}
    </div>
  );
};

export default VideoFeed;
