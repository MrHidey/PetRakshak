// import React, { useState, useEffect } from 'react';
// import { Camera, AlertCircle } from 'lucide-react';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';

// // Location finder component for map
// const LocationMarker = ({ position, setPosition }) => {
//   const map = useMapEvents({
//     click(e) {
//       setPosition([e.latlng.lat, e.latlng.lng]);
//     },
//   });

//   useEffect(() => {
//     if (position && position[0] && position[1]) {
//       map.flyTo(position, map.getZoom());
//     }
//   }, [position, map]);

//   return position === null ? null : (
//     <Marker 
//       position={position}
//       icon={L.divIcon({
//         className: 'case-marker-icon',
//         html: `<div style="background-color: #ef4444; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
//         iconSize: [16, 16],
//         iconAnchor: [8, 8]
//       })}
//     >
//       <Popup>Selected location</Popup>
//     </Marker>
//   );
// };

// const ReportCase = ({ onSubmitSuccess, apiBaseUrl }) => {
//   const initialValues = {
//     type: '',
//     description: '',
//     coordinates: [],
//     address: '',
//     reportedBy: {
//       name: '',
//       phone: '',
//       email: ''
//     }
//   };

//   const [formData, setFormData] = useState(initialValues);
//   const [position, setPosition] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [locationError, setLocationError] = useState('');
//   const [nearbyVolunteers, setNearbyVolunteers] = useState([]);

//   // Get user's current location when component mounts
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setPosition([latitude, longitude]);
//           setFormData(prev => ({
//             ...prev,
//             coordinates: [longitude, latitude] // MongoDB uses [lng, lat] format
//           }));
//           setLocationError('');
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           setLocationError('Error getting your location. Please click on the map to set the location manually.');
//         }
//       );
//     } else {
//       setLocationError('Geolocation is not supported by your browser. Please click on the map to set the location manually.');
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData({
//         ...formData,
//         [parent]: {
//           ...formData[parent],
//           [child]: value
//         }
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     }
//   };

//   // Update coordinates when position changes
//   useEffect(() => {
//     if (position) {
//       setFormData(prev => ({
//         ...prev,
//         coordinates: [position[1], position[0]] // Convert to [lng, lat] for MongoDB
//       }));
//     }
//   }, [position]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate form
//     if (!formData.type) return setError('Please select the animal type');
//     if (!formData.description) return setError('Please provide a description');
//     if (!formData.address) return setError('Please provide an address');
//     if (!formData.reportedBy.name) return setError('Please provide your name');
//     if (!formData.reportedBy.phone) return setError('Please provide your phone number');
//     if (!formData.coordinates || formData.coordinates.length !== 2) {
//       return setError('Please set the location on the map');
//     }
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch(`${apiBaseUrl}/report-cases`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to submit case');
//       }
      
//       const data = await response.json();
      
//       // Reset form and show success message
//       setFormData(initialValues);
//       setSuccess(true);
//       setNearbyVolunteers(data.nearbyVolunteers || []);
      
//       // Call parent callback if provided
//       if (onSubmitSuccess) {
//         onSubmitSuccess(data.case);
//       }
      
//       // Hide success message after 5 seconds
//       setTimeout(() => {
//         setSuccess(false);
//       }, 5000);
      
//     } catch (error) {
//       console.error('Error submitting case:', error);
//       setError('Failed to submit case. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full">
//       <div className="max-w-3xl mx-auto">
//         {/* Success Message */}
//         {success && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-start">
//             <div className="flex-shrink-0 mt-0.5">
//               <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div className="ml-3">
//               <p className="text-sm font-medium">
//                 Case reported successfully! Our team will handle it as soon as possible.
//               </p>
//               {nearbyVolunteers.length > 0 && (
//                 <p className="mt-2 text-sm">
//                   Good news! There are {nearbyVolunteers.length} volunteers nearby who may be able to help.
//                 </p>
//               )}
//             </div>
//           </div>
//         )}
        
//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
//             <AlertCircle className="h-5 w-5 mr-2" />
//             <span>{error}</span>
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Animal Type */}
//           <div>
//             <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
//               Animal Type *
//             </label>
//             <select
//               id="type"
//               name="type"
//               value={formData.type}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               required
//             >
//               <option value="">Select animal type</option>
//               <option value="Dog">Dog</option>
//               <option value="Cat">Cat</option>
//               <option value="Bird">Bird</option>
//               <option value="Cow">Cow</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
          
//           {/* Description */}
//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//               Description *
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               rows="3"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Describe the animal's condition and the emergency situation"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               required
//             ></textarea>
//           </div>
          
//           {/* Location Map */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Location *
//             </label>
//             {locationError && (
//               <p className="text-sm text-red-600 mb-2">{locationError}</p>
//             )}
//             <p className="text-sm text-gray-500 mb-2">
//               Click on the map to set the exact location or use your current location
//             </p>
//             <div className="h-80 rounded-lg overflow-hidden border border-gray-300">
//               {typeof window !== 'undefined' && (
//                 <MapContainer 
//                   center={position || [20.5937, 78.9629]} // Default to center of India if position not available
//                   zoom={position ? 15 : 5}
//                   style={{ height: '100%', width: '100%' }}
//                 >
//                   <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   />
//                   <LocationMarker position={position} setPosition={setPosition} />
//                 </MapContainer>
//               )}
//             </div>
//           </div>
          
//           {/* Address */}
//           <div>
//             <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
//               Address *
//             </label>
//             <textarea
//               id="address"
//               name="address"
//               rows="2"
//               value={formData.address}
//               onChange={handleChange}
//               placeholder="Provide a detailed address or landmark near the location"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               required
//             ></textarea>
//           </div>
          
//           {/* Reporter Information Section */}
//           <div className="border-t border-gray-200 pt-6">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">Your Information</h3>
            
//             {/* Name */}
//             <div className="mb-4">
//               <label htmlFor="reportedBy.name" className="block text-sm font-medium text-gray-700 mb-1">
//                 Your Name *
//               </label>
//               <input
//                 type="text"
//                 id="reportedBy.name"
//                 name="reportedBy.name"
//                 value={formData.reportedBy.name}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
            
//             {/* Phone */}
//             <div className="mb-4">
//               <label htmlFor="reportedBy.phone" className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone Number *
//               </label>
//               <input
//                 type="tel"
//                 id="reportedBy.phone"
//                 name="reportedBy.phone"
//                 value={formData.reportedBy.phone}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
            
//             {/* Email */}
//             <div>
//               <label htmlFor="reportedBy.email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email (Optional)
//               </label>
//               <input
//                 type="email"
//                 id="reportedBy.email"
//                 name="reportedBy.email"
//                 value={formData.reportedBy.email}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//           </div>
          
//           {/* Submit Button */}
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md shadow-md transition-colors flex items-center disabled:bg-gray-400"
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Submitting...
//                 </>
//               ) : (
//                 <>
//                   <Camera className="mr-2" size={20} />
//                   Report Case
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ReportCase;


// components/ReportCase.js
import React, { useState, useRef } from 'react';

const ReportCase = () => {
  const [formData, setFormData] = useState({
    animalType: '',
    description: '',
    image: null,
    location: '',
    latitude: '',
    longitude: ''
  });
  const [message, setMessage] = useState('');
  const imageRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setFormData((prev) => ({
          ...prev,
          latitude: latitude.toFixed(4),
          longitude: longitude.toFixed(4)
        }));
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val) data.append(key, val);
    });
    try {
      const res = await fetch('http://localhost:5000/api/report-case', {
        method: 'POST',
        body: data
      });
      if (res.ok) {
        setMessage('Report submitted successfully.');
        setFormData({ animalType: '', description: '', image: null, location: '', latitude: '', longitude: '' });
        if (imageRef.current) imageRef.current.value = '';
      } else {
        setMessage('Submission failed.');
      }
    } catch (err) {
      setMessage('Error submitting report.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-S mx-auto">
      <h2 className="text-2xl font-bold mb-6">Report a Case</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Animal Type</label>
          <input name="animalType" value={formData.animalType} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Upload Image</label>
          <input name="image" type="file" ref={imageRef} onChange={handleChange} className="w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Location</label>
          <input name="location" value={formData.location} onChange={handleChange} placeholder="Optional description" className="w-full border p-2 rounded" />
        </div>
        <div className="flex gap-4 mb-4">
          <input name="latitude" value={formData.latitude} onChange={handleChange} placeholder="Latitude" className="w-full border p-2 rounded" />
          <input name="longitude" value={formData.longitude} onChange={handleChange} placeholder="Longitude" className="w-full border p-2 rounded" />
          <button type="button" onClick={getLocation} className="bg-blue-500 text-white px-3 rounded">Get Location</button>
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportCase;
