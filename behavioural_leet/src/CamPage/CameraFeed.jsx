import React, { useRef, useEffect, useState } from "react";
import "./CamPage.css";

const CameraFeed = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          startRecording(stream);
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
        alert(
          "Could not access the camera. Please allow camera access and try again."
        );
      }
    };

    const startRecording = (stream) => {
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      mediaRecorderRef.current.start();

      setTimeout(() => {
        mediaRecorderRef.current.stop();
      }, 30000); // stop recording after 30 seconds
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "recorded_video.webm";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }, [recordedChunks]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      style={{
        height: "100%",
        border: "4px solid #5DA399",
        borderRadius: "20px",
      }}
    />
  );
};

export default CameraFeed;
