// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import axios from 'axios';

// // Create a component to handle map initialization
// const RescueMap = () => {
//   const [mapData, setMapData] = useState({ reports: [], volunteers: [] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [mapReady, setMapReady] = useState(false);

//   // Default center position (center of Karnataka state)
//   const defaultCenter = [15.3173, 75.7139]; // Karnataka center coordinates
//   const defaultZoom = 7; // Closer zoom for state-level view

//   // Fix Leaflet icon issues
//   useEffect(() => {
//     // Set up the icons only once when component mounts
//     delete L.Icon.Default.prototype._getIconUrl;
    
//     L.Icon.Default.mergeOptions({
//       iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//       iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//       shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//     });
    
//     setMapReady(true);
//   }, []);

//   // Create custom icons
//   const redIcon = new L.Icon({
//     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41]
//   });

//   const blueIcon = new L.Icon({
//     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41]
//   });

//   // Fetch map data
//   useEffect(() => {
//     const fetchMapData = async () => {
//       try {
//         setLoading(true);
        
//         // For testing purposes, create mock data if API fails
//         try {
//           const response = await axios.get('/api/map-data');
//           setMapData(response.data);
//         } catch (apiError) {
//           console.warn("Using mock data due to API error:", apiError);
//           // Mock data for testing with Karnataka locations
//           setMapData({
//             reports: [
//               { id: 1, type: "Animal Rescue", status: "Open", coordinates: [77.5946, 12.9716] }, // Bengaluru
//               { id: 2, type: "Wildlife Rescue", status: "In Progress", coordinates: [76.6394, 12.3086] }, // Mysore
//               { id: 3, type: "Pet Rescue", status: "Open", coordinates: [75.0083, 15.3173] }, // Hubballi-Dharwad
//             ],
//             volunteers: [
//               { id: 1, name: "John Doe", coordinates: [77.3441, 13.0235] }, // North Bengaluru
//               { id: 2, name: "Jane Smith", coordinates: [74.8425, 13.3409] }, // Udupi
//               { id: 3, name: "Rahul Kumar", coordinates: [76.8234, 14.4673] }, // Davangere
//             ]
//           });
//         }
        
//         setLoading(false);
//       } catch (err) {
//         console.error('Error in map data handling:', err);
//         setError('Failed to load map data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchMapData();
//   }, []);

//   if (loading) return (
//     <div className="w-full h-96 flex items-center justify-center bg-gray-100">
//       <div className="text-center">
//         <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent mb-2"></div>
//         <p className="text-gray-700">Loading map data...</p>
//       </div>
//     </div>
//   );
  
//   if (error) return (
//     <div className="w-full h-96 flex items-center justify-center bg-gray-100">
//       <div className="text-center text-red-500 p-4 border border-red-300 rounded bg-red-50">
//         <p>{error}</p>
//         <button 
//           className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//           onClick={() => window.location.reload()}
//         >
//           Retry
//         </button>
//       </div>
//     </div>
//   );

//   if (!mapReady) return (
//     <div className="w-full h-96 flex items-center justify-center bg-gray-100">
//       <p>Initializing map...</p>
//     </div>
//   );

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <div className="w-full h-96 md:h-[600px]">
//         <h2 className="text-xl font-bold mb-4">Rescue Map</h2>
        
//         <div className="mb-4 flex flex-wrap gap-4">
//           <span className="inline-flex items-center">
//             <span className="h-3 w-3 rounded-full bg-red-600 mr-1"></span>
//             <span>Rescue Cases</span>
//           </span>
//           <span className="inline-flex items-center">
//             <span className="h-3 w-3 rounded-full bg-blue-600 mr-1"></span>
//             <span>Volunteers</span>
//           </span>
//         </div>
        
//         <div className="w-full h-full border border-gray-300 rounded overflow-hidden">
//           <MapContainer 
//             center={defaultCenter} 
//             zoom={defaultZoom} 
//             style={{ height: '100%', width: '100%' }}
//             whenCreated={(map) => {
//               // Force map to recalculate size when it renders
//               setTimeout(() => {
//                 map.invalidateSize();
//               }, 100);
//             }}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
            
//             {/* Render Report Markers (Red) */}
//             {mapData.reports.map(report => (
//               <Marker 
//                 key={`report-${report.id}`} 
//                 position={[report.coordinates[1], report.coordinates[0]]} 
//                 icon={redIcon}
//               >
//                 <Popup>
//                   <div>
//                     <h3 className="font-bold">{report.type}</h3>
//                     <p>Status: {report.status}</p>
//                   </div>
//                 </Popup>
//               </Marker>
//             ))}
            
//             {/* Render Volunteer Markers (Blue) */}
//             {mapData.volunteers.map(volunteer => (
//               <Marker 
//                 key={`volunteer-${volunteer.id}`} 
//                 position={[volunteer.coordinates[1], volunteer.coordinates[0]]} 
//                 icon={blueIcon}
//               >
//                 <Popup>
//                   <div>
//                     <h3 className="font-bold">Volunteer</h3>
//                     <p>{volunteer.name}</p>
//                   </div>
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
        
//         <div className="mt-4 text-sm text-gray-500">
//           <p>Map displays active rescue cases and available volunteers in the area.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RescueMap;


// // import React, { useState, useEffect } from 'react';
// // import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// // import 'leaflet/dist/leaflet.css';

// // // Simple component to handle map recenter
// // function MapUpdater({ center, zoom }) {
// //   const map = useMap();
// //   map.setView(center, zoom);
// //   return null;
// // }

// // const RescueMap = ({ mapData = [] }) => {
// //   // Default center (Karnataka state)
// //   const defaultCenter = [15.3173, 75.7139];
// //   const defaultZoom = 7;
  
// //   // Create customized marker elements based on urgency
// //   const getMarkerIcon = (urgency) => {
// //     const colors = {
// //       high: "bg-red-600",
// //       medium: "bg-yellow-500",
// //       low: "bg-green-500"
// //     };
    
// //     return (
// //       <div className="relative flex items-center justify-center">
// //         <div className={`w-4 h-4 rounded-full ${colors[urgency.toLowerCase()] || colors.low}`}></div>
// //       </div>
// //     );
// //   };

// //   // Sample data if none provided
// //   const [rescueData, setRescueData] = useState([
// //     { id: 1, type: "Animal Rescue", location: "Bengaluru", urgency: "high", coordinates: [12.9716, 77.5946] },
// //     { id: 2, type: "Wildlife Rescue", location: "Mysore", urgency: "medium", coordinates: [12.3086, 76.6394] },
// //     { id: 3, type: "Pet Rescue", location: "Hubballi", urgency: "low", coordinates: [15.3173, 75.0083] }
// //   ]);

// //   useEffect(() => {
// //     if (mapData && mapData.length > 0) {
// //       setRescueData(mapData);
// //     }
// //   }, [mapData]);

// //   return (
// //     <div className="w-full h-96 border border-gray-300 rounded-lg overflow-hidden">
// //       <MapContainer 
// //         center={defaultCenter} 
// //         zoom={defaultZoom} 
// //         className="h-full w-full" 
// //       >
// //         <TileLayer
// //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// //         />
// //         <MapUpdater center={defaultCenter} zoom={defaultZoom} />
        
// //         {rescueData.map(point => (
// //           <Marker key={point.id} position={point.coordinates}>
// //             <Popup>
// //               <div className="text-sm">
// //                 <h3 className="font-bold">{point.type}</h3>
// //                 <p>{point.location}</p>
// //                 <p className="text-sm font-semibold">
// //                   {point.urgency} priority
// //                 </p>
// //               </div>
// //             </Popup>
// //           </Marker>
// //         ))}
// //       </MapContainer>

// //       <div className="flex justify-center space-x-4 bg-white p-2 border-t border-gray-300">
// //         <div className="flex items-center">
// //           <div className="w-3 h-3 rounded-full bg-red-600 mr-1"></div>
// //           <span className="text-xs">High</span>
// //         </div>
// //         <div className="flex items-center">
// //           <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
// //           <span className="text-xs">Medium</span>
// //         </div>
// //         <div className="flex items-center">
// //           <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
// //           <span className="text-xs">Low</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RescueMap;



import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const RescueMap = ({ mapData = [] }) => {
  // Default data matching the mockup with Bengaluru locations
  const [rescueData, setRescueData] = useState([
    { id: 1, type: "Injured Dog", location: "Near City Park", urgency: "high", coordinates: [12.9716, 77.5946] },
    { id: 2, type: "Abandoned Kittens", location: "Electronic City", urgency: "medium", coordinates: [12.8436, 77.6605] },
    { id: 3, type: "Wildlife Rescue", location: "Bannerghatta Road", urgency: "medium", coordinates: [12.8698, 77.5978] },
    { id: 4, type: "Injured Bird", location: "Koramangala", urgency: "low", coordinates: [12.9279, 77.6271] },
    { id: 5, type: "Stray Dog", location: "Whitefield", urgency: "medium", coordinates: [12.9698, 77.7500] },
    { id: 6, type: "Snake Rescue", location: "Yelahanka", urgency: "high", coordinates: [13.1008, 77.5963] }
  ]);

  // Update with provided data if available
  useEffect(() => {
    if (mapData && mapData.length > 0) {
      setRescueData(mapData);
    }
  }, [mapData]);

  // Create urgency-based marker icons
  const highIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const mediumIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const lowIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Get marker based on urgency
  const getMarkerByUrgency = (urgency) => {
    switch(urgency.toLowerCase()) {
      case 'high': return highIcon;
      case 'medium': return mediumIcon;
      default: return lowIcon;
    }
  };

  // Get text color class based on urgency
  const getTextColorClass = (urgency) => {
    switch(urgency.toLowerCase()) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  return (
    <div className="w-full h-96 border border-gray-300 rounded-lg overflow-hidden">
      <MapContainer 
        center={[12.9716, 77.5946]} 
        zoom={11} 
        className="h-full w-full"
        whenCreated={(map) => {
          setTimeout(() => {
            map.invalidateSize();
          }, 100);
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {rescueData.map(point => (
          <Marker 
            key={point.id} 
            position={point.coordinates}
            icon={getMarkerByUrgency(point.urgency)}
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-bold">{point.type}</h3>
                <p>{point.location}</p>
                <p className={`text-sm font-semibold ${getTextColorClass(point.urgency)}`}>
                  {point.urgency} priority
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="flex justify-center space-x-4 bg-white p-2 border-t border-gray-300">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-600 mr-1"></div>
          <span className="text-xs">High Urgency</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
          <span className="text-xs">Medium Urgency</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
          <span className="text-xs">Low Urgency</span>
        </div>
      </div>
    </div>
  );
};

export default RescueMap;