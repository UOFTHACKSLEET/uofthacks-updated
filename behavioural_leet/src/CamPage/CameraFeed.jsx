import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CamPage.css";

const CameraFeed = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const navigate = useNavigate();

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
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state !== "inactive"
        ) {
          mediaRecorderRef.current.stop();
        }
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach((track) => track.stop());
        }
        navigate("/feedback");
      }, 15000); // stop recording after 15 seconds
    };

    startCamera();

    return () => {
      // Stop video and audio tracks
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }

      // Stop the MediaRecorder
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
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
        maxHeight: "100%",
        width: "100%",
        maxWidth: "720px",
        border: "4px solid #5DA399",
        borderRadius: "20px",
      }}
    />
  );
};

export default CameraFeed;
