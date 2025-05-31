import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RescueMap from './RescueMap';

function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("assigned");
  const [rescueCases, setRescueCases] = useState({
    assigned: [],
    pending: [],
    available: []
  });
  const [mapData, setMapData] = useState([]);
  const navigate = useNavigate();

  // Redirect if no user
  useEffect(() => {
    if (!user) {
      navigate("/volunteer/login");
    }
  }, [user, navigate]);

  // Fetch rescue cases data
  useEffect(() => {
    if (!user) return;
    
    // Mock API call
    setTimeout(() => {
      const mockCases = {
        assigned: [
          { 
            id: 1, 
            type: "Injured Dog", 
            status: "In Progress", 
            location: "Near City Park", 
            coordinates: [77.5946, 12.9716], // [long, lat]
            urgency: "High"
          },
          { 
            id: 2, 
            type: "Abandoned Kittens", 
            status: "Assigned", 
            location: "Electronic City", 
            coordinates: [77.6654, 12.8458],
            urgency: "Medium"
          }
        ],
        pending: [
          { 
            id: 3, 
            type: "Wildlife Rescue", 
            status: "Pending", 
            location: "Bannerghatta Road", 
            coordinates: [77.5928, 12.8698],
            urgency: "Medium"
          }
        ],
        available: [
          { 
            id: 4, 
            type: "Injured Bird", 
            status: "Available", 
            location: "Koramangala", 
            coordinates: [77.6245, 12.9352],
            urgency: "Low"
          },
          { 
            id: 5, 
            type: "Stray Dog", 
            status: "Available", 
            location: "Whitefield", 
            coordinates: [77.7500, 12.9698],
            urgency: "Medium"
          },
          { 
            id: 6, 
            type: "Snake Rescue", 
            status: "Available", 
            location: "Yelahanka", 
            coordinates: [77.5963, 13.1004],
            urgency: "High"
          }
        ]
      };
      
      setRescueCases(mockCases);
      
      // Prepare data for map display
      setMapData([
        ...mockCases.assigned,
        ...mockCases.pending,
        ...mockCases.available
      ]);
    }, 500);
  }, [user, navigate]);

  // Accept a case
  const acceptCase = (caseId) => {
    // Move case from available to assigned
    const caseToAccept = rescueCases.available.find(c => c.id === caseId);
    if (caseToAccept) {
      setRescueCases({
        ...rescueCases,
        assigned: [...rescueCases.assigned, {...caseToAccept, status: "Assigned"}],
        available: rescueCases.available.filter(c => c.id !== caseId)
      });
      
      // Update map data
      setMapData(prev => {
        return prev.map(item => 
          item.id === caseId ? {...item, status: "Assigned"} : item
        );
      });
    }
  };

  // Mark case as completed
  const completeCase = (caseId) => {
    setRescueCases({
      ...rescueCases,
      assigned: rescueCases.assigned.filter(c => c.id !== caseId)
    });
    
    // Update map data
    setMapData(prev => prev.filter(item => item.id !== caseId));
  };

  // Get marker color based on urgency
  const getMarkerColor = (urgency) => {
    switch (urgency.toLowerCase()) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      default: return "text-green-600";
    }
  };

  // Simple Map Component (placeholder for actual map implementation)
  const LocalRescueMap = () => {
    return (
      <div className="bg-gray-200 border border-gray-300 rounded h-96 overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-500">
          <div className="text-center">
            <p className="mb-2">Map would display {mapData.length} rescue locations here</p>
            <p className="text-sm">(Using React-Leaflet in actual implementation)</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 w-full max-w-md p-4">
            {mapData.map(point => (
              <div key={point.id} className="bg-white p-2 rounded shadow text-sm">
                <p className="font-bold">{point.type}</p>
                <p className="text-xs">{point.location}</p>
                <p className={`text-xs ${getMarkerColor(point.urgency)}`}>
                  {point.urgency} priority
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-xl font-bold">Welcome, {user.name}!</h2>
        <p className="text-gray-600">Thank you for your dedication to animal rescue.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Cases Section */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Rescue Cases</h3>
            <div className="flex border-b">
              <button
                className={`py-2 px-4 ${
                  activeTab === "assigned" ? "border-b-2 border-green-600 font-bold" : ""
                }`}
                onClick={() => setActiveTab("assigned")}
              >
                My Cases ({rescueCases.assigned.length})
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "pending" ? "border-b-2 border-green-600 font-bold" : ""
                }`}
                onClick={() => setActiveTab("pending")}
              >
                Pending ({rescueCases.pending.length})
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "available" ? "border-b-2 border-green-600 font-bold" : ""
                }`}
                onClick={() => setActiveTab("available")}
              >
                Available ({rescueCases.available.length})
              </button>
            </div>
          </div>

          <div className="overflow-auto max-h-96">
            {activeTab === "assigned" && (
              rescueCases.assigned.length > 0 ? (
                <ul className="divide-y">
                  {rescueCases.assigned.map((item) => (
                    <li key={item.id} className="py-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold">{item.type}</h4>
                          <p className="text-sm text-gray-600">Location: {item.location}</p>
                          <p className="text-sm text-gray-600">Status: {item.status}</p>
                          <p className={`text-sm font-medium ${getMarkerColor(item.urgency)}`}>
                            Urgency: {item.urgency}
                          </p>
                        </div>
                        <button
                          onClick={() => completeCase(item.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          Mark Complete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-4 text-center text-gray-500">No assigned cases</p>
              )
            )}

            {activeTab === "pending" && (
              rescueCases.pending.length > 0 ? (
                <ul className="divide-y">
                  {rescueCases.pending.map((item) => (
                    <li key={item.id} className="py-4">
                      <div>
                        <h4 className="font-bold">{item.type}</h4>
                        <p className="text-sm text-gray-600">Location: {item.location}</p>
                        <p className="text-sm text-gray-600">Status: {item.status}</p>
                        <p className={`text-sm font-medium ${getMarkerColor(item.urgency)}`}>
                          Urgency: {item.urgency}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-4 text-center text-gray-500">No pending cases</p>
              )
            )}

            {activeTab === "available" && (
              rescueCases.available.length > 0 ? (
                <ul className="divide-y">
                  {rescueCases.available.map((item) => (
                    <li key={item.id} className="py-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold">{item.type}</h4>
                          <p className="text-sm text-gray-600">Location: {item.location}</p>
                          <p className={`text-sm font-medium ${getMarkerColor(item.urgency)}`}>
                            Urgency: {item.urgency}
                          </p>
                        </div>
                        <button
                          onClick={() => acceptCase(item.id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          Accept Case
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-4 text-center text-gray-500">No available cases</p>
              )
            )}
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-bold mb-4">Rescue Map</h3>
          <RescueMap />
          <div className="mt-2">
            <p className="text-xs text-gray-500">
              Red: High Urgency | Yellow: Medium Urgency | Green: Low Urgency
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;