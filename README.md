# SwiftAid - Disaster Relief Platform

SwiftAid is a web-based platform designed to connect disaster victims with volunteers, facilitating quick and efficient emergency assistance when it matters most.

## Features

### For Those Seeking Help
- **Create Relief Requests**: Users can submit detailed requests for assistance, including:
  - Location mapping with Google Maps integration
  - Specific needs description
  - Contact information
  - Real-time status tracking

### For Volunteers
- **Volunteer Registration**: Comprehensive volunteer profile creation with:
  - Personal information
  - Location preferences
  - Skills and availability
  - Interactive map for location selection

### Request Management
- **Active Request Tracking**: View and manage all active relief requests
- **Volunteer Assignment**: Match volunteers with specific requests
- **Status Updates**: Track the progress of assigned requests
- **Request Filtering**: Separate views for active and assigned requests

## Technical Stack

- **Frontend**: React.js with React Bootstrap for UI components
- **State Management**: React Hooks for local state management
- **Routing**: React Router for navigation
- **Maps Integration**: Google Maps API for location services
- **HTTP Client**: Axios for API communication
- **Backend**: JSON Server (development)
- **Styling**: Custom CSS and Bootstrap

## Key Components

1. **Home Page**
   - Platform introduction
   - How it works section
   - FAQ section

2. **New Request Page**
   - Interactive form for submitting relief requests
   - Google Maps integration for precise location marking
   - Real-time validation

3. **Requests Dashboard**
   - Overview of all active requests
   - Volunteer assignment interface
   - Status tracking and management

4. **Volunteer Registration**
   - Detailed registration form
   - Location preference mapping
   - Skills and availability input

## Design Features

- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Intuitive Navigation**: Clear and user-friendly navigation structure
- **Interactive Maps**: Google Maps integration for precise location selection
- **Consistent Styling**: Cohesive color scheme and design language
- **Accessibility**: Built with accessibility considerations

## Color Scheme

- Primary Blue: `#1a237e`
- Accent Red: `#e53935`
- Text Dark: `#424242`
- Background Light: `#f8f9fa`

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Start the JSON server:
   ```bash
   json-server --watch db.json --port 3000
   ```

## Future Enhancements

- Real-time notifications for new requests and assignments
- Mobile app development
- Advanced filtering and search capabilities
- Integration with emergency services
- Chat functionality between volunteers and requesters