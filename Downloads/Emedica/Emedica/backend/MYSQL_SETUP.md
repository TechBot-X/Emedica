# Emedica Backend - MySQL Setup Guide

## Prerequisites
- Node.js installed
- MySQL Server installed and running
- npm or yarn package manager

---

## Step 1: Setup MySQL Database

### Option A: Using MySQL Command Line

1. Open MySQL Command Prompt (or terminal)

2. Login to MySQL:
```bash
mysql -u root -p
```
(Enter your MySQL password when prompted)

3. Run the schema file to create database and tables:
```bash
source c:\Users\digvi\Downloads\Emedica\Emedica\backend\config\schema.sql
```

Or paste the entire schema.sql content directly in MySQL.

### Option B: Using MySQL Workbench

1. Open MySQL Workbench
2. Create a new connection or use existing one
3. Go to File → Open SQL Script
4. Select `schema.sql`
5. Click Execute (or press Ctrl+Enter)

---

## Step 2: Configure Environment Variables

1. Open `.env` file in the backend folder:
```
c:\Users\digvi\Downloads\Emedica\Emedica\backend\.env
```

2. Update with your MySQL credentials:
```env
PORT=5000
JWT_SECRET=your_secret_key_here_change_this
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=emedica
```

Replace:
- `your_mysql_password` - Your MySQL root password
- `your_secret_key_here_change_this` - A strong secret key for JWT

---

## Step 3: Install Dependencies

```bash
cd backend
npm install
```

This will install:
- express (web framework)
- mysql2 (MySQL driver)
- jsonwebtoken (authentication)
- cors (cross-origin requests)
- morgan (logging)
- dotenv (environment variables)

---

## Step 4: Verify Database Connection

Check if `db.js` file looks like this:

```javascript
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'emedica',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
```

---

## Step 5: Start Backend Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

You should see:
```
Server running on port 5000
```

---

## Step 6: Test API Connection

Use Postman or curl to test:

```bash
GET http://localhost:5000/api/health
```

Or test login endpoint:
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "doctor@email.com",
  "password": "password123"
}
```

---

## Database Tables Overview

### Users Table
Stores all user accounts (patients, doctors, admins)

### Patients Table
Stores patient-specific information linked to users

### Doctors Table
Stores doctor information (specialization, license, etc.)

### Appointments Table
Stores appointment bookings between patients and doctors

### Medical Records Table
Stores patient diagnoses and treatments

### Prescriptions Table
Stores medicine prescriptions for patients

### Consultations Table
Stores consultation sessions between doctors and patients

---

## Common Issues & Solutions

### Issue 1: "Connection refused"
**Solution:**
- Make sure MySQL server is running
- Check if credentials in .env are correct
- Verify host is 'localhost' not '127.0.0.1'

### Issue 2: "Database does not exist"
**Solution:**
- Run schema.sql again to create database
- Make sure you have admin privileges

### Issue 3: "Access denied for user 'root'"
**Solution:**
- Update DB_PASSWORD in .env with correct password
- If no password, leave it empty

### Issue 4: Port 5000 already in use
**Solution:**
- Change PORT in .env file
- Or stop other application using port 5000

---

## Next Steps

1. ✅ MySQL database is setup
2. ✅ Backend is configured
3. ✅ API server is running
4. Next: Connect frontend to backend by updating API URLs
5. Next: Test endpoints with sample data

---

## Useful MySQL Commands

Check if database exists:
```sql
SHOW DATABASES;
```

Select database:
```sql
USE emedica;
```

View all tables:
```sql
SHOW TABLES;
```

View table structure:
```sql
DESCRIBE users;
```

See all users:
```sql
SELECT * FROM users;
```

Clear a table:
```sql
DELETE FROM users;
```

---

## Backend API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user

### Users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `GET /api/users` - List all users (admin only)

### Appointments
- `GET /api/appointments` - List appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment

### Medical Records
- `GET /api/medicalrecords/:patientId` - Get records
- `POST /api/medicalrecords` - Add record

---

**Setup Complete! Your MySQL backend is ready to use.**
