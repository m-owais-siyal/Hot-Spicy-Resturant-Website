# Restaurant Management System

## Project Overview
This project is a comprehensive Restaurant Management System (RMS) designed to streamline the operations of a restaurant. The system leverages React for the frontend and basic PHP for the backend, providing a robust and user-friendly platform for managing various aspects of restaurant operations, including menu management, order processing, table reservations, staff management, and customer feedback.

## Features

1. **User Authentication & Authorization**
   - Secure login and registration for administrators, staff, and customers.
   - Role-based access control to ensure appropriate permissions for different users.

2. **Menu Management**
   - Dynamic creation and editing of menu items.
   - Categorization of menu items.
   - Price and availability management.

3. **Order Management**
   - Real-time order placement and tracking.
   - Integration with kitchen display systems.
   - Order history and status updates.

4. **Table Reservation System**
   - Online table booking interface for customers.
   - Reservation management dashboard for staff.
   - Automated notifications for reservations.

5. **Inventory Management**
   - Tracking of stock levels for ingredients and supplies.
   - Automated alerts for low stock items.
   - Detailed inventory reports.

6. **Staff Management**
   - Staff scheduling and shift management.
   - Employee performance tracking.
   - Payroll management.

7. **Customer Feedback**
   - Integrated feedback forms.
   - Review and rating system.
   - Customer satisfaction analytics.

8. **Analytics and Reporting**
   - Sales and revenue reports.
   - Customer behavior insights.
   - Operational efficiency metrics.

## Technology Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Redux**: For state management.
- **Axios**: For making HTTP requests.
- **React Router**: For routing and navigation.
- **Material-UI**: For modern and responsive UI components.

### Backend
- **PHP**: Server-side scripting language.
- **MySQL**: Database management system.
- **XAMPP**: A free and open-source cross-platform web server solution stack package.

## Installation and Setup

### Clone the Repository
```bash
git clone https://github.com/m-owais-siyal/Hot-Spicy-Resturant-Website.git
cd restaurant-management-system
```

## Backend Setup

### Install XAMPP
- Download and install [XAMPP](https://www.apachefriends.org/index.html).

### Start XAMPP
- Launch XAMPP and start the Apache and MySQL modules.

### Configure Database
- Create a new database in phpMyAdmin.
- Import the database schema from **/api/resturant.sql**.

### Move Backend Files
- Copy the **php** and **apis** folders into the **htdocs** directory of XAMPP.

### Update Database Configuration
- Edit the database connection settings in the PHP files as needed.

## Frontend Setup

### Install Node.js and npm
- Download and install [Node.js](https://nodejs.org/).

### Navigate to Frontend Directory
```bash
cd frontend
```
## Install Dependencies

```bash
npm install
```
## Start the React Development Server

```bash
npm start
```

## Usage

- Access the application via **http://localhost/{your-backend-folder}**.
- Use the frontend interface for managing menus, orders, reservations, and other functionalities.
- Admin users can access additional management features through the admin dashboard.

## Project Structure

### Backend (Basic PHP)
```bash
backend/
├── php/
│   ├── db.php
│   └── other-php-files.php
└── apis/
    ├── resturant.sql
    ├── menu-api.php
    ├── order-api.php
    └── other-api-files.php
```
### Frontend (React)
```bash
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── services/
│   └── utils/
```
## Conclusion
The Restaurant Management System project successfully delivers a powerful tool for managing restaurant operations efficiently. By utilizing modern technologies like React for the frontend and basic PHP for the backend, the system provides a seamless user experience and robust functionality, making it an invaluable asset for any restaurant.
