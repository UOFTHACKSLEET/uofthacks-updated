import React, { useRef, useEffect } from "react";
import "./CamPage.css";

const CameraFeed = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        // access cam
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
        alert(
          "Could not access the camera. Please allow camera access and try again."
        );
      }
    };

    startCamera();

    // clean up camera stream after
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      style={{
        height: "100%",
        border: "4px solid #5DA399",
        borderRadius: "20px",
      }}
    />
  );
};

export default CameraFeed;
