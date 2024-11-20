import React, { useState } from 'react';
import './Profile.css';

export default function Profile() {
  const [isEditable, setIsEditable] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    dob: '01/01/1990',
    email: 'john.doe@example.com',
    city: 'New York',
    phone: '+123 456 7890',
    password: 'password123',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const enableEditing = () => {
    setIsEditable(true);
  };

  const saveProfile = () => {
    setIsEditable(false);
  };

  return (
    <div>
      <div className="profile-card">
        <div className="profile-image">
          <img src="https://via.placeholder.com/150" alt="Profile" />
        </div>
        <div className="profile-details">
          <div className="detail">
            <label>Name:</label>
            {isEditable ? (
              <input
                className='input-profile'
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profile.name}</span>
            )}
          </div>
          <div className="detail">
            <label>Date of Birth:</label>
            {isEditable ? (
              <input
                className='input-profile'
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profile.dob}</span>
            )}
          </div>
          <div className="detail">
            <label>Email:</label>
            {isEditable ? (
              <input
                className='input-profile'
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profile.email}</span>
            )}
          </div>
          <div className="detail">
            <label>City:</label>
            {isEditable ? (
              <input
                className='input-profile'
                type="text"
                name="city"
                value={profile.city}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profile.city}</span>
            )}
          </div>
          <div className="detail">
            <label>Phone Number:</label>
            {isEditable ? (
              <input
                className='input-profile'
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profile.phone}</span>
            )}
          </div>
          <div className="detail">
            <label>Password:</label>
            {isEditable ? (
              <input
                className='input-profile'
                type="password"
                name="password"
                value={profile.password}
                onChange={handleInputChange}
              />
            ) : (
              <span>●●●●●●●●</span>
            )}
          </div>
        </div>
        <button className="update-btn" onClick={isEditable ? saveProfile : enableEditing}>
          {isEditable ? 'Save Profile' : 'Update Profile'}
        </button>
      </div>
    </div>
  );
}
