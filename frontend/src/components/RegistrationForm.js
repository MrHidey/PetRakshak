import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegistrationForm({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [availability, setAvailability] = useState("Full-time");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // API Base URL - Change this to your backend server
  const API_BASE = "http://localhost:5000";

  const availabilityOptions = [
    "Full-time",
    "Part-time",
    "Weekends only",
    "Evenings only",
    "Flexible"
  ];

  const handleGetLocation = () => {
    setError("");
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLongitude(position.coords.longitude.toFixed(6));
        setLatitude(position.coords.latitude.toFixed(6));
      },
      (err) => {
        setError("Failed to get location: " + err.message);
      }
    );
  };

  const handleSubmit = async () => {
    setError("");
    if (!name || !email || !phone || !password || !latitude || !longitude) {
      setError("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    console.log("Submitting registration to:", `${API_BASE}/api/volunteers/register`);

    try {
      const response = await fetch(`${API_BASE}/api/volunteers/register`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          location: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          availability
        })
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("rescueUser", JSON.stringify(data));
      setUser(data);
      navigate("/volunteer/dashboard");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Network error. Please check if the server is running on port 5000.");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Volunteer Registration</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Confirm your password"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Location Coordinates</label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="w-1/2 p-3 border border-gray-300 rounded"
                placeholder="Longitude"
              />
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="w-1/2 p-3 border border-gray-300 rounded"
                placeholder="Latitude"
              />
            </div>
            <button
              type="button"
              onClick={handleGetLocation}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Get Current Location
            </button>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Availability</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
            >
              {availabilityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full text-white font-bold py-3 px-4 rounded ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="text-center">
            <p>
              Already registered?{" "}
              <button
                onClick={() => navigate("/volunteer/login")}
                className="text-green-600 hover:underline"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;