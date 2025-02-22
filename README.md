
# ClockIn - Employee Time Tracking System

ClockIn is a comprehensive system for managing employee attendance, clocking in and out, and submitting requests for time off. The system includes validation features, user role management, GPS-based clocking, and reporting. It's designed for ease of use, featuring an intuitive interface that helps both employees and HR managers streamline their processes.

## Features

### Validation Features
- **Login/Register**: 
  - **Admin**: Manage subscriptions, payment confirmations, and user packages (up to X users).
  - **Validation**: 
    - Google account and username/password login.
    - Location checking for every action made by users.
    - **Location Validation**:
      - Office's computer: Location not required.
      - Mobile users: Location required.

### Clock In / Clock Out
- **Clock In**:
  - Ask for permission to access GPS location.
  - Capture GPS location, date, time (from an external source), and user information.
  - If the user is late to clock in, they will be required to input a reason.
- **Clock Out**: Same process as clock-in.
- Multiple clock-ins/outs per day are allowed.

### Employee Report
- **Access Rights Management**: Admin, HR, and Manager roles have different access to records.
- **User Reports**:
  - Users can view their own clock-in history via a calendar or table.
  - Filters for date range, employee name/number, position, department, and attendance status.
  - Export data to Excel or CSV.
- **Dashboard**: Personal dashboard for every user.

### Form Submits
- **Pre-created forms** for users to fill in and submit:
  - Holiday, sick leave, and other types of leave.
  - Edit clock-in/clock-out times.
  - Request for ½ workday.
  - Medical leave with the option to upload a picture.

### Form Approval
- **Admin/HR/Manager**: Approve or reject user requests for leave or clock-in/clock-out adjustments.

### User Rights Management
- **Roles/Positions**: Define roles (e.g., Employee A is Employee B’s Boss).
  - This will affect the data shown in employee reports.

### Minimum Features
- **Clock In** functionality.
- **HR Page** for managing reports.
- **Review Clock-In History** and download data.
- **User-Friendly UX/UI**: Simple and easy-to-navigate design.
- **GPS** integration for accurate clocking.

## Installation

### Frontend Setup (React)
1. Clone the repository:
   ```bash
   git clone https://github.com/chatinunk97/clockin-React.git
   ```

2. Navigate to the project directory and install dependencies:
   ```bash
   cd clockin-React
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

### Backend Setup (API)
1. Clone the backend repository:
   ```bash
   git clone https://github.com/chatinunk97/clockin-API.git
   ```

2. Navigate to the backend project directory and install dependencies:
   ```bash
   cd clockin-API
   npm install
   ```

3. Setup Google API key and Nodemailer:
   - Configure **Google API** using OAuth.
   - Set up **Nodemailer** for email functionality.

4. Start the backend server:
   ```bash
   npm start
   ```

## System Requirements
- Node.js v12 or higher
- Google API key and OAuth setup for authentication
- Database (e.g., PostgreSQL or MongoDB) for data storage

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
