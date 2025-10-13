# PetRakshak

PetRakshak is a comprehensive animal rescue and welfare platform designed to bridge the gap between animal rescue organizations, volunteers, and the general public. The platform facilitates the reporting of animal rescue cases, coordinates rescue operations, and manages volunteer networks to ensure timely and effective animal welfare interventions.

## Project Overview

PetRakshak operates as a full-stack web application built with modern technologies to provide a seamless experience for all users involved in animal rescue operations. The platform enables real-time reporting, tracking, and management of animal rescue cases while maintaining a robust volunteer and rescue team network.

## Technology Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **Cloudinary**: Cloud-based image and video management
- **Multer**: Middleware for handling multipart/form-data

### Frontend
- **React.js**: Component-based UI library
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript (ES6+)**: Modern JavaScript features

## Project Structure

```
PetRakshak/
├── backend/
│   ├── controllers/
│   │   └── index.js          # Main controller logic
│   ├── middleware/
│   │   ├── cloudinary.js     # Cloudinary configuration
│   │   └── upload.js         # File upload middleware
│   ├── models/
│   │   ├── ReportCase.js     # Case reporting data model
│   │   ├── RescueTeam.js     # Rescue team data model
│   │   └── Volunteer.js      # Volunteer data model
│   ├── routes/
│   │   ├── index.js          # Main routes
│   │   ├── rescue-team.js    # Rescue team routes
│   │   └── volunteers.js     # Volunteer routes
│   ├── uploads/              # File upload directory
│   ├── package.json          # Backend dependencies
│   └── server.js             # Main server file
└── frontend/
    ├── public/
    │   ├── index.html        # Main HTML template
    │   ├── manifest.json     # PWA manifest
    │   └── robots.txt        # SEO robots file
    ├── src/
    │   ├── components/
    │   │   ├── Bot.js            # Chatbot component
    │   │   ├── Dashboard.js      # Main dashboard
    │   │   ├── Dashboard2.js     # Alternative dashboard
    │   │   ├── Footer.js         # Footer component
    │   │   ├── Header.js         # Header component
    │   │   ├── Hero.js           # Landing page hero section
    │   │   ├── InfoCard.js       # Information display cards
    │   │   ├── LoginForm.js      # User login form
    │   │   ├── LoginForm2.js     # Alternative login form
    │   │   ├── NavBar2.js        # Navigation bar
    │   │   ├── RegistrationForm.js   # User registration
    │   │   ├── RegistrationForm2.js  # Alternative registration
    │   │   ├── ReportCase.js     # Case reporting form
    │   │   ├── RescueMap.js      # Interactive rescue map
    │   │   └── VolunteerForm.js  # Volunteer registration
    │   ├── App.js            # Main application component
    │   ├── App.css           # Application styles
    │   ├── index.js          # React entry point
    │   └── index.css         # Global styles
    ├── package.json          # Frontend dependencies
    ├── tailwind.config.js    # Tailwind CSS configuration
    └── README.md             # Frontend documentation
```

## Key Features

### 🐾 Case Reporting System
- **Emergency Reporting**: Quick reporting of animals in distress
- **Photo/Video Upload**: Visual documentation of cases using Cloudinary
- **Location Tracking**: GPS coordinates for accurate rescue operations
- **Case Status Updates**: Real-time tracking of rescue progress
- **Priority Classification**: Categorization based on urgency and severity

### 👥 Volunteer Management
- **Registration System**: Comprehensive volunteer onboarding
- **Skill-based Matching**: Assign volunteers based on expertise
- **Availability Tracking**: Manage volunteer schedules and availability
- **Communication Hub**: Direct messaging between volunteers and coordinators
- **Achievement System**: Recognition and gamification for active volunteers

### 🚑 Rescue Team Coordination
- **Team Formation**: Create specialized rescue teams
- **Resource Management**: Track equipment, vehicles, and supplies
- **Mission Planning**: Coordinate rescue operations and logistics
- **Response Time Tracking**: Monitor and optimize response efficiency
- **Team Performance Analytics**: Data-driven insights for improvement

### 📊 Interactive Dashboard
- **Real-time Statistics**: Live updates on cases, volunteers, and operations
- **Geographic Visualization**: Interactive maps showing case locations
- **Performance Metrics**: KPIs for rescue operations and volunteer activity
- **Resource Allocation**: Visual representation of team and resource distribution
- **Trend Analysis**: Historical data and predictive insights

### 🤖 Intelligent Features
- **AI Chatbot**: Automated assistance for common queries
- **Smart Notifications**: Contextual alerts and updates
- **Automated Matching**: AI-powered volunteer-case matching
- **Predictive Analytics**: Forecast rescue needs and resource requirements

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB database
- Cloudinary account (for image/video storage)

### Backend Setup
1. Navigate to the backend directory:
   ```cmd
   cd backend
   ```

2. Install dependencies:
   ```cmd
   npm install
   ```

3. Create environment variables file (.env):
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```cmd
   npm run dev
   ```

5. For production:
   ```cmd
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```cmd
   cd frontend
   ```

2. Install dependencies:
   ```cmd
   npm install
   ```

3. Create environment variables file (.env):
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```

4. Start the development server:
   ```cmd
   npm start
   ```

5. Build for production:
   ```cmd
   npm run build
   ```

## API Endpoints

### Case Management
- `POST /api/cases` - Report a new rescue case
- `GET /api/cases` - Retrieve all cases
- `GET /api/cases/:id` - Get specific case details
- `PUT /api/cases/:id` - Update case information
- `DELETE /api/cases/:id` - Remove a case

### Volunteer Management
- `POST /api/volunteers/register` - Register new volunteer
- `GET /api/volunteers` - List all volunteers
- `PUT /api/volunteers/:id` - Update volunteer profile
- `POST /api/volunteers/assign` - Assign volunteer to case

### Rescue Teams
- `POST /api/rescue-teams` - Create rescue team
- `GET /api/rescue-teams` - List rescue teams
- `PUT /api/rescue-teams/:id` - Update team information
- `POST /api/rescue-teams/assign` - Assign team to case

## Database Schema

### ReportCase Model
- Case ID, reporter information, animal details
- Location coordinates, emergency level, status
- Photos/videos, rescue team assignment, timestamps

### Volunteer Model
- Personal information, contact details, skills
- Availability schedule, experience level, location
- Case history, performance ratings, certifications

### RescueTeam Model
- Team name, members, specializations, equipment
- Coverage area, response capabilities, contact info
- Mission history, success metrics, resource inventory

## Contributing

We welcome contributions from the community! Here's how you can help:

### Development Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow ESLint configuration for JavaScript
- Use meaningful component and variable names
- Write comprehensive comments for complex logic
- Maintain consistent code formatting
- Include unit tests for new features

### Bug Reports
- Use the issue tracker to report bugs
- Include detailed reproduction steps
- Provide environment information (OS, browser, versions)
- Attach relevant screenshots or error logs

## Deployment

### Production Environment
- Set up MongoDB Atlas for database hosting
- Configure Cloudinary for production image storage
- Use environment variables for all sensitive data
- Implement proper error logging and monitoring
- Set up automated backups and disaster recovery

### Recommended Hosting Platforms
- **Backend**: Heroku, Railway, or AWS EC2
- **Frontend**: Netlify, Vercel, or AWS S3 + CloudFront
- **Database**: MongoDB Atlas
- **File Storage**: Cloudinary

## Support and Contact

For questions, suggestions, or support:
- Create an issue in the GitHub repository
- Contact the development team
