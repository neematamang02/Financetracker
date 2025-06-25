import { useState } from "react";
import axios from "axios";
import { useUserProfile } from "@/components/Helper";

const UserProfile = () => {
  const { name, setName, email, setEmail, profileImage, setProfileImage } =
    useUserProfile();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const updateData = { name, email };
      if (currentPassword && newPassword) {
        updateData.currentPassword = currentPassword;
        updateData.newPassword = newPassword;
      }
      await axios.put("/api/auth/update", updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  // Handle image upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/auth/upload-image", // Adjust this URL to match your server’s endpoint
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure this matches your server’s expected format (e.g., "Bearer " + token if required)
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Construct the full URL by prepending the server’s base URL
      const serverBaseUrl = import.meta.env.VITE_BACKEND_URL; // Adjust this if your server runs on a different port
      const fullUrl = `${serverBaseUrl}${response.data.profileImage}`;
      setProfileImage(fullUrl);

      alert("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    }
  };

  return (
    <div className="Userprofile p-5">
      <div className="userprofiletitle">
        <header className="font-bold text-3xl">User Profile</header>
      </div>
      <div className="userprofileimg flex flex-col justify-center mb-8">
        <img
          src={profileImage || "https://github.com/shadcn.png"}
          alt="userimage"
          className="rounded-full object-cover h-40 w-40 m-auto"
        />
        <input
          type="file"
          id="profileImage"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <button
          className="bg-green-700 text-white mt-3 w-52 m-auto cursor-pointer"
          onClick={() => document.getElementById("profileImage").click()}
        >
          Upload image here
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 m-auto xl:w-3xl"
      >
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="pt-6 mt-6 border-t border-gray-200">
          <div className="flex items-center mb-6">
            <div className="p-2.5 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full mr-3 shadow-inner">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-800">
              Change Password
            </h4>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="current_password"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                id="current_password"
                name="current_password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="new_password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                id="new_password"
                name="new_password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength="6"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave blank to keep current password
              </p>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                id="confirm_password"
                name="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
