"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "./FileUpload";
import { VideoFormData, apiClient } from "@/lib/api-client";
import { useNotification } from "./Notification";

const VideoUploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { showNotification } = useNotification();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleVideoUpload = (res: any) => {
    setVideoUrl(res.url);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleThumbnailUpload = (res: any) => {
    setThumbnailUrl(res.url);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !videoUrl || !thumbnailUrl) {
      showNotification("Please fill all required fields", "error");
      return;
    }

    try {
      setUploading(true);
      const videoData: VideoFormData = {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        controls: true,
        transformation: {
          height: 1920,
          width: 1080,
          quality: 100,
        },
      };

      await apiClient.createVideo(videoData);
      showNotification("Video uploaded successfully!", "success");

      // Reset form
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setThumbnailUrl("");

      // Redirect to home page
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error uploading video:", error);
      showNotification("Failed to upload video", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Upload New Video</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Title
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Description
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        </div>

        <FileUpload
          fileType="video"
          onSuccess={handleVideoUpload}
          className="mb-4"
          label="Upload Video"
        />

        {videoUrl && (
          <div className="mb-4 p-2 border border-green-500 rounded bg-green-50">
            <p className="text-green-700 text-sm">
              Video uploaded successfully!
            </p>
          </div>
        )}

        <FileUpload
          fileType="image"
          onSuccess={handleThumbnailUpload}
          className="mb-4"
          label="Upload Thumbnail"
        />

        {thumbnailUrl && (
          <div className="mb-4 p-2 border border-green-500 rounded bg-green-50">
            <p className="text-green-700 text-sm">
              Thumbnail uploaded successfully!
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={uploading || !videoUrl || !thumbnailUrl}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg focus:outline-none disabled:bg-gray-400"
        >
          {uploading ? "Uploading..." : "Submit Video"}
        </button>
      </form>
    </div>
  );
};

export default VideoUploadForm;
