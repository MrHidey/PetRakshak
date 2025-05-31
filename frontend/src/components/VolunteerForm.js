import React, { useState } from "react";

const VolunteerForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    coordinates: {
      longitude: "",
      latitude: ""
    },
    address: "",
    availability: "Full-time",
    experience: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const availabilityOptions = [
    "Full-time",
    "Part-time",
    "Weekends only",
    "Evenings only",
    "Flexible"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCoordinatesChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      coordinates: {
        ...form.coordinates,
        [name]: value
      }
    });
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setError(""); // Clear any previous errors
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm({
          ...form,
          coordinates: {
            longitude: position.coords.longitude.toFixed(6),
            latitude: position.coords.latitude.toFixed(6)
          }
        });
      },
      (err) => {
        setError("Failed to get location: " + err.message);
      }
    );
  };

  const validateEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const validateCoordinates = () => {
    const { longitude, latitude } = form.coordinates;
    
    // If both fields are empty, that's ok (backend will handle)
    if (!longitude && !latitude) return true;
    
    // If only one field is provided, that's not ok
    if ((longitude && !latitude) || (!longitude && latitude)) return false;
    
    // Parse and validate numbers
    const lng = parseFloat(longitude);
    const lat = parseFloat(latitude);
    
    return (
      !isNaN(lng) && 
      !isNaN(lat) && 
      lng >= -180 && 
      lng <= 180 && 
      lat >= -90 && 
      lat <= 90
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate email
    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    // Validate coordinates if provided
    if (!validateCoordinates()) {
      setError("Invalid coordinates: longitude must be between -180 and 180, latitude between -90 and 90");
      return;
    }
    
    // Prepare data for submission
    const volunteerData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address || "Address not provided",
      availability: form.availability,
      experience: form.experience || "No experience details provided"
    };
    
    // Add location data if coordinates are provided
    if (form.coordinates.longitude && form.coordinates.latitude) {
      volunteerData.location = {
        type: "Point",
        coordinates: [
          parseFloat(form.coordinates.longitude),
          parseFloat(form.coordinates.latitude)
        ]
      };
    }
    
    try {
      // Simulating API call
      console.log("Submitting volunteer data:", volunteerData);
      
      // In a real application, you would make an API call:
      const response = await fetch('http://localhost:5000/api/volunteers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(volunteerData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit volunteer data');
      }
      
      // Show success message
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setForm({
          name: "",
          email: "",
          phone: "",
          coordinates: {
            longitude: "",
            latitude: ""
          },
          address: "",
          availability: "Full-time",
          experience: ""
        });
      }, 3000);
    } catch (err) {
      setError(err.message || "An error occurred while submitting the form");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Volunteer Registration</h2>
      
      {submitted ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Your volunteer application has been submitted.</span>
        </div>
      ) : (
        <div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Phone Field */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Location Coordinates */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Location Coordinates (Optional)
              </label>
              <div className="flex space-x-2 mb-2">
                <div className="flex-1">
                  <input
                    type="text"
                    name="longitude"
                    placeholder="Longitude"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={form.coordinates.longitude}
                    onChange={handleCoordinatesChange}
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="latitude"
                    placeholder="Latitude"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={form.coordinates.latitude}
                    onChange={handleCoordinatesChange}
                  />
                </div>
              </div>
              <button
                onClick={handleGetLocation}
                className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
              >
                Get Current Location
              </button>
              
            </div>
            
            {/* Address Field */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Address
              </label>
              <textarea
                name="address"
                placeholder="Enter your address"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={form.address}
                onChange={handleChange}
                rows="2"
              />
            </div>
            
            {/* Availability Field */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Availability
              </label>
              <select
                name="availability"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={form.availability}
                onChange={handleChange}
              >
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Experience Field */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Experience
              </label>
              <textarea
                name="experience"
                placeholder="Describe your relevant experience or skills"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={form.experience}
                onChange={handleChange}
                rows="3"
              />
            </div>
            
            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white font-medium py-3 px-4 rounded hover:bg-green-700 transition duration-200"
            >
              Register as Volunteer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerForm;
