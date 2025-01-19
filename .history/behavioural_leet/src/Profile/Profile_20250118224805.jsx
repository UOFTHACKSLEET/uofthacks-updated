import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [profileImage, setProfileImage] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [hoursPracticed, setHoursPracticed] = React.useState(0);
  const [resume, setResume] = React.useState(null); // State to store the uploaded resume
  const [resumeName, setResumeName] = React.useState(""); // State to store the resume name for display

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setResume(file); // Store the resume file for later use
      setResumeName(file.name); // Store the resume name for display
      console.log("Resume uploaded:", file.name);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:8000/api/upload-resume", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("Resume successfully uploaded to the server");
        } else {
          console.error("Failed to upload resume to the server");
        }
      } catch (error) {
        console.error("Error uploading resume:", error);
      }
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <img
        src={profileImage}
        alt=""
        className="profile-image"
        id="profileImage"
      />
      {!isEditing && (
        <button className="edit-btn" id="editBtn" onClick={handleEditClick}>
          Edit Profile
        </button>
      )}
      {isEditing && (
        <>
          <label className="upload-btn" htmlFor="imageUpload">
            Upload Image
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <textarea
            className="bio-area"
            id="bio"
            placeholder="Write your bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          <label className="upload-btn" htmlFor="resumeUpload">
            Upload Resume
          </label>
          <input
            type="file"
            id="resumeUpload"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            style={{ display: "none" }}
          />
          {resumeName && <p>Uploaded Resume: {resumeName}</p>}{" "}
          {/* Show resume name */}
          <button className="save-btn" id="saveBtn" onClick={handleSaveClick}>
            Save Profile
          </button>
        </>
      )}
      {!isEditing && <div id="bioDisplay">{bio}</div>}
      <div id="hoursPracticed">
        Hours Practiced: <span id="hoursValue">{hoursPracticed}</span>
      </div>
      {!isEditing && resumeName && (
        <div>
          <p>Resume on file: {resumeName}</p> {/* Show saved resume name */}
        </div>
      )}
    </div>
  );
};

export default Profile;
