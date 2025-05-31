// src/components/Dashboard2.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RescueMap from './RescueMap';

function Dashboard2() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed', 'Adopted'];

  const [stats, setStats] = useState({
    activeMembers: 12,
    completedRescues: 24,
    ongoingOperations: 3,
  });

  const [cases, setCases] = useState([
    {
      id: 1,
      type: 'Injured Dog',
      location: 'Near City Park',
      reporter: 'John Smith',
      contactNumber: '9876543210',
      reportedDate: '2025-05-14T10:30:00',
      assignedTo: 'Team A',
      status: 'Pending',
      urgency: 'high',
      coordinates: [12.9716, 77.5946],
      description: 'Golden retriever with injured front leg, seems to be a stray',
    },
    {
      id: 2,
      type: 'Abandoned Kittens',
      location: 'Electronic City',
      reporter: 'Priya Mehta',
      contactNumber: '8765432109',
      reportedDate: '2025-05-13T15:45:00',
      assignedTo: 'Team B',
      status: 'In Progress',
      urgency: 'medium',
      coordinates: [12.8436, 77.6605],
      description: 'Three kittens abandoned in a cardboard box near apartment complex',
    },
    {
      id: 3,
      type: 'Wildlife Rescue',
      location: 'Bannerghatta Road',
      reporter: 'Rahul Kumar',
      contactNumber: '7654321098',
      reportedDate: '2025-05-12T09:15:00',
      assignedTo: 'Team C',
      status: 'Completed',
      urgency: 'medium',
      coordinates: [12.8698, 77.5978],
      description: 'Monkey injured by electric wire, needs immediate attention',
    },
    {
      id: 4,
      type: 'Injured Bird',
      location: 'Koramangala',
      reporter: 'Aisha Khan',
      contactNumber: '6543210987',
      reportedDate: '2025-05-11T14:20:00',
      assignedTo: 'Team A',
      status: 'Completed',
      urgency: 'low',
      coordinates: [12.9279, 77.6271],
      description: 'Pigeon with broken wing found on building terrace',
    },
    {
      id: 5,
      type: 'Stray Dog',
      location: 'Whitefield',
      reporter: 'Vikram Singh',
      contactNumber: '5432109876',
      reportedDate: '2025-05-15T11:10:00',
      assignedTo: 'Team B',
      status: 'Pending',
      urgency: 'medium',
      coordinates: [12.9698, 77.7500],
      description: 'Aggressive stray dog causing issues in residential area',
    },
    {
      id: 6,
      type: 'Snake Rescue',
      location: 'Yelahanka',
      reporter: 'Deepa Nair',
      contactNumber: '4321098765',
      reportedDate: '2025-05-14T16:05:00',
      assignedTo: 'Team C',
      status: 'In Progress',
      urgency: 'high',
      coordinates: [13.1008, 77.5963],
      description: 'Snake found in residential bathroom, possibly venomous',
    },
  ]);

  const [statusFilter, setStatusFilter] = useState('All');
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState(null);
  const [filteredCases, setFilteredCases] = useState(cases);

  useEffect(() => {
    let result = [...cases];

    if (statusFilter !== 'All') {
      result = result.filter((item) => item.status === statusFilter);
    }

    if (urgencyFilter !== 'All') {
      result = result.filter((item) => item.urgency.toLowerCase() === urgencyFilter.toLowerCase());
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.type.toLowerCase().includes(term) ||
          item.location.toLowerCase().includes(term) ||
          item.reporter.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term)
      );
    }

    setFilteredCases(result);
  }, [cases, statusFilter, urgencyFilter, searchTerm]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem('rescueTeamUser'))?.token;
      if (!token) throw new Error('No authentication token found');

      const response = await fetch('/api/rescue-team/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const data = await response.json();
      if (data.stats) setStats(data.stats);
      if (data.cases && data.cases.length > 0) setCases(data.cases);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('rescueTeamUser');
    setUser(null);
    navigate('/rescue-team/login');
  };

  const updateCaseStatus = (id, newStatus) => {
    setCases(cases.map((item) => (item.id === id ? { ...item, status: newStatus } : item)));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Adopted':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyBadgeClass = (urgency) => {
    switch (urgency.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const mapData = cases.map((item) => ({
    id: item.id,
    type: item.type,
    location: item.location,
    urgency: item.urgency,
    coordinates: item.coordinates,
  }));



  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Rescue Team Dashboard</h1>
          <p className="text-gray-600">Welcome, {user?.name || 'Volunteer'}! Manage rescue cases and track progress.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="font-bold text-gray-700">Total Cases</h3>
          <p className="text-2xl font-bold">{cases.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="font-bold text-gray-700">Active Members</h3>
          <p className="text-2xl font-bold">{stats.activeMembers}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="font-bold text-gray-700">Completed Rescues</h3>
          <p className="text-2xl font-bold">{stats.completedRescues}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="font-bold text-gray-700">Ongoing Operations</h3>
          <p className="text-2xl font-bold">{stats.ongoingOperations}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Rescue Location Map</h2>
        <RescueMap mapData={mapData} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search by type, location, reporter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status Filter</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Urgency Filter</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
            >
              <option value="All">All Urgencies</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold p-4 border-b border-gray-200">Rescue Cases</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reported
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Urgency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCases.length > 0 ? (
                filteredCases.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.type}</div>
                      <div className="text-sm text-gray-500">{item.reporter}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(item.reportedDate)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getUrgencyBadgeClass(
                          item.urgency
                        )}`}
                      >
                        {item.urgency.charAt(0).toUpperCase() + item.urgency.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedCase(item)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        View Details
                      </button>
                      <select
                        className="text-sm border border-gray-300 rounded p-1"
                        value={item.status}
                        onChange={(e) => updateCaseStatus(item.id, e.target.value)}
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No cases found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Rescue Operations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Operation ID</th>
                <th className="py-2 px-4 border-b text-left">Location</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Date</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">OP-2025-001</td>
                <td className="py-2 px-4 border-b">Chennai, TN</td>
                <td className="py-2 px-4 border-b">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Completed
                  </span>
                </td>
                <td className="py-2 px-4 border-b">May 12, 2025</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500 hover:underline mr-2">View</button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">OP-2025-002</td>
                <td className="py-2 px-4 border-b">Mumbai, MH</td>
                <td className="py-2 px-4 border-b">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    In Progress
                  </span>
                </td>
                <td className="py-2 px-4 border-b">May 14, 2025</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500 hover:underline mr-2">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {selectedCase && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedCase.type}</h2>
              <button onClick={() => setSelectedCase(null)} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{selectedCase.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                        selectedCase.status
                      )}`}
                    >
                      {selectedCase.status}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reported By</p>
                  <p className="font-medium">{selectedCase.reporter}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{selectedCase.contactNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reported Date</p>
                  <p className="font-medium">{formatDate(selectedCase.reportedDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Urgency</p>
                  <p>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getUrgencyBadgeClass(
                        selectedCase.urgency
                      )}`}
                    >
                      {selectedCase.urgency.charAt(0).toUpperCase() + selectedCase.urgency.slice(1)}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <p className="font-medium">{selectedCase.assignedTo}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="font-medium">{selectedCase.description}</p>
              </div>

              <div className="border-t pt-3 mt-3">
                <p className="font-medium mb-2">Update Status</p>
                <div className="flex space-x-2">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        updateCaseStatus(selectedCase.id, status);
                        setSelectedCase({ ...selectedCase, status });
                      }}
                      className={`px-3 py-1 text-sm rounded-full ${
                        selectedCase.status === status
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {selectedCase.status === 'Completed' && (
                <div className="border-t pt-3 mt-3">
                  <Link
                    to="/adoption"
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 inline-block"
                  >
                    Move to Adoption
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard2;