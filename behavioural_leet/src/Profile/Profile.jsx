import React from "react";
import "./Profile.css";
const Profile = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [profileImage, setProfileImage] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [hoursPracticed, setHoursPracticed] = React.useState(0);

  const handleEditClick = () => {
    setIsEditing(true);
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
          <button className="save-btn" id="saveBtn" onClick={handleSaveClick}>
            Save Profile
          </button>
        </>
      )}
      {!isEditing && <div id="bioDisplay">{bio}</div>}
      <div id="hoursPracticed">
        Hours Practiced: <span id="hoursValue">{hoursPracticed}</span>
      </div>
    </div>
  );
};

export default Profile;
