import React from "react";

const Profile = () => {
  return (
    <section className="info-container">
      <div className="info-group">
        <span className="color-secondary label">Name:</span>
        <span className="color-primary value poppins-medium">John</span>
      </div>
      <div className="info-group">
        <span className="color-secondary label">Email:</span>
        <span className="color-primary value poppins-medium">
          john.doe@gmail.com
        </span>
      </div>
      <div className="info-group">
        <span className="color-secondary label">Contact:</span>
        <span className="color-primary value poppins-medium">
          +91-1234567890
        </span>
      </div>
      <div className="info-group">
        <span className="color-secondary label">Address:</span>
        <span className="color-primary value poppins-medium">
          Pune, India
        </span>
      </div>
      <div className="info-group">
        <span className="color-secondary label">Role:</span>
        <span className="color-primary value poppins-medium">Tenant</span>
      </div>
    </section>
  );
};

export default Profile;
