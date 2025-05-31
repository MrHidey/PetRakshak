import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReportCase from './components/ReportCase';
import NavBar2 from './components/NavBar2';
import Header from './components/Header';
import Footer from './components/Footer';
import InfoCard from './components/InfoCard';
import VolunteerForm from './components/VolunteerForm';
import Hero from './components/Hero';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import Dashboard2 from './components/Dashboard2';
import LoginForm2 from './components/LoginForm2';
import RegistrationForm2 from './components/RegistrationForm2';
import Bot from './components/Bot';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Check if user is logged in on app start
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('rescueUser');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        console.log("Loaded user from localStorage:", parsedUser);
        
        // Add role if missing but has teamName (rescue team member)
        if (!parsedUser.role && parsedUser.teamName) {
          parsedUser.role = 'rescue-team';
          localStorage.setItem('rescueUser', JSON.stringify(parsedUser));
        }
        // Add role if missing but no teamName (assume volunteer for now)
        else if (!parsedUser.role && !parsedUser.teamName && parsedUser.id) {
          parsedUser.role = 'volunteer';
          localStorage.setItem('rescueUser', JSON.stringify(parsedUser));
        }
        
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error parsing saved user:', error);
      localStorage.removeItem('rescueUser');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle logout with optional backend call
  const handleLogout = () => {
    console.log("Logging out user");
    setUser(null);
    localStorage.removeItem('rescueUser');
    
    // Optionally call backend logout endpoint
    fetch('http://localhost:5000/api/rescue-team/logout', {
      method: 'POST',
      credentials: 'include'
    }).catch(err => console.error('Logout error:', err));
  };

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Helper function to check if user is rescue team
  const isRescueTeam = (user) => {
    if (!user) return false;
    // Check for role field first, then fallback to teamName field for rescue teams
    if (user.role) {
      const role = user.role.toLowerCase().replace(/[-_\s]/g, '');
      return role === 'rescueteam' || role === 'rescue-team' || role === 'rescue_team';
    }
    // If no role but has teamName, assume it's a rescue team member
    return user.teamName !== undefined;
  };

  // Helper function to check if user is volunteer
  const isVolunteer = (user) => {
    if (!user) return false;
    if (user.role) {
      const role = user.role.toLowerCase().replace(/[-_\s]/g, '');
      return role === 'volunteer';
    }
    // If no role and no teamName, might be volunteer (adjust based on your logic)
    return user.teamName === undefined && user.id; // Has user data but no team
  };
  console.log("Current user:", user);
  console.log("Current location:", location.pathname);
  if (user) {
    console.log("User role:", user.role);
    console.log("Role type:", typeof user.role);
    console.log("Role comparison result:", user.role === 'rescue-team');
  }

  // Define routes where InfoCard and Footer should not appear
  const hideInfoAndFooter = [
    '/volunteer/dashboard',
    '/rescue-team/dashboard',
    '/volunteer/login',
    '/volunteer/register',
    '/rescue-team/login',
    '/rescue-team/register'
  ];

  const shouldHideInfoAndFooter = hideInfoAndFooter.includes(location.pathname);

  return (
    <>
      <NavBar2 user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/ReportCase" element={<ReportCase />} />

        {/* Rescue Team Routes */}
        <Route 
          path="/rescue-team/login" 
          element={
            isRescueTeam(user) ? 
            <Navigate to="/rescue-team/dashboard" replace /> : 
            <LoginForm2 setUser={setUser} />
          } 
        />
        <Route 
          path="/rescue-team/register" 
          element={
            isRescueTeam(user) ? 
            <Navigate to="/rescue-team/dashboard" replace /> : 
            <RegistrationForm2 setUser={setUser} />
          } 
        />
        <Route 
          path="/rescue-team/dashboard" 
          element={
            isRescueTeam(user) ? 
            <Dashboard2 user={user} onLogout={handleLogout} /> : 
            <Navigate to="/rescue-team/login" replace />
          } 
        />
        {/* Default redirect for /rescue-team */}
        <Route 
          path="/rescue-team" 
          element={<Navigate to="/rescue-team/dashboard" replace />} 
        />

        {/* Volunteer Routes */}
        <Route 
          path="/volunteer" 
          element={
            isVolunteer(user) ? 
            <Navigate to="/volunteer/dashboard" replace /> : 
            <VolunteerForm />
          } 
        />
        <Route 
          path="/volunteer/login" 
          element={
            isVolunteer(user) ? 
            <Navigate to="/volunteer/dashboard" replace /> : 
            <LoginForm setUser={setUser} />
          } 
        />
        <Route 
          path="/volunteer/register" 
          element={
            isVolunteer(user) ? 
            <Navigate to="/volunteer/dashboard" replace /> : 
            <RegistrationForm setUser={setUser} />
          } 
        />
        <Route 
          path="/volunteer/dashboard" 
          element={
            isVolunteer(user) ? 
            <Dashboard user={user} onLogout={handleLogout} /> : 
            <Navigate to="/volunteer/login" replace />
          } 
        />

        {/* Catch all route for 404 */}
        <Route 
          path="*" 
          element={
            <div className="container mx-auto p-4 text-center">
              <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
              <p>The page you're looking for doesn't exist.</p>
            </div>
          } 
        />
      </Routes>
      
      {/* Only show InfoCard and Footer on certain pages */}
      {!shouldHideInfoAndFooter && (
        <>
          <InfoCard />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;