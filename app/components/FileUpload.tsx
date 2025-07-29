"use client";

import { upload } from "@imagekit/next";
import { useState } from "react";
import { useNotification } from "./Notification";

interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
  className?: string;
  label?: string;
}

const FileUpload = ({
  onSuccess,
  onProgress,
  fileType = "image",
  className = "",
  label = "Upload File",
}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { showNotification } = useNotification();

  const validateFile = (file: File) => {
    if (fileType === "video" && !file.type.startsWith("video/")) {
      showNotification("Please upload a valid video file", "error");
      return false;
    }

    if (fileType === "image" && !file.type.startsWith("image/")) {
      showNotification("Please upload a valid image file", "error");
      return false;
    }

    if (file.size > 100 * 1024 * 1024) {
      showNotification("File size must be less than 100 MB", "error");
      return false;
    }

    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    if (!validateFile(file)) return;

    setUploading(true);
    setProgress(0);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();

      if (!auth.authenticationParameters) {
        throw new Error("Failed to get authentication parameters");
      }

      const res = await upload({
        file,
        fileName: `${Date.now()}_${file.name}`,
        publicKey: auth.publicKey,
        signature: auth.authenticationParameters.signature,
        expire: auth.authenticationParameters.expire,
        token: auth.authenticationParameters.token,
        onProgress: (event) => {
          if (event.lengthComputable) {
            const percent = (event.loaded / event.total) * 100;
            const roundedPercent = Math.round(percent);
            setProgress(roundedPercent);
            if (onProgress) {
              onProgress(roundedPercent);
            }
          }
        },
      });

      showNotification("File uploaded successfully", "success");
      onSuccess(res);
    } catch (error) {
      console.error("Upload failed", error);
      showNotification("Failed to upload file", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={className}>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
        <input
          type="file"
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mt-1"
          accept={fileType === "video" ? "video/*" : "image/*"}
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>

      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
          <p className="text-xs text-gray-500 mt-1">{progress}% Uploaded</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
