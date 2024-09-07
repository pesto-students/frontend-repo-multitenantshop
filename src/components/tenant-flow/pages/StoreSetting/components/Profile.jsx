import React from "react";
import { useOutletContext } from "react-router-dom";

const Profile = () => {
  const { tenant } = useOutletContext();

  return (
    <section className="info-container">
      <div className="info-group">
        <span className="color-secondary label">Name:</span>
        <span className="color-primary value poppins-medium">
          {tenant.username}
        </span>
      </div>
      <div className="info-group">
        <span className="color-secondary label">Email:</span>
        <span className="color-primary value poppins-medium">
          {tenant.mail}
        </span>
      </div>
      <div className="info-group">
        <span className="color-secondary label">Role:</span>
        <span className="capitalize color-primary value poppins-medium">
          {tenant.role}
        </span>
      </div>
    </section>
  );
};

export default Profile;
