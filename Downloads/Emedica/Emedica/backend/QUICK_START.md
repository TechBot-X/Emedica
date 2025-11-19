# Quick Start - MySQL Backend Setup

## ⚡ 5-Minute Setup

### Step 1: Create MySQL Database
```bash
mysql -u root -p
```

Paste this entire schema (from schema.sql):
```sql
CREATE DATABASE IF NOT EXISTS emedica;
USE emedica;

-- [All table creation code from schema.sql]
```

### Step 2: Update `.env` file
```env
PORT=5000
JWT_SECRET=mysecretkey123
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=emedica
```

### Step 3: Install & Start
```bash
cd backend
npm install
npm run dev
```

### ✅ Done! Server running on http://localhost:5000

---

## What Changed?

| Component | Before | After |
|-----------|--------|-------|
| Database | PostgreSQL | MySQL ✓ |
| Driver | pg | mysql2 ✓ |
| Connection | CONNECTION_STRING | Individual params ✓ |
| Config File | db.js (pg) | db.js (mysql2) ✓ |
| Schema | N/A | schema.sql ✓ |

---

## Files Modified

✓ `package.json` - Changed pg to mysql2  
✓ `config/db.js` - Updated for MySQL connection  
✓ `.env` - Changed to MySQL credentials  
✓ `config/schema.sql` - Created MySQL schema  

---

## Frontend Connection

Your React frontend will connect to:
```
http://localhost:5000/api/...
```

Make sure to update any hardcoded API URLs in your React components if needed.

---

## Test Connection

```bash
curl http://localhost:5000/api/health
```

Should return success if server is running.

---

## Need Help?

- MySQL not starting? Check Services (Windows) or services (Linux)
- Port 5000 in use? Change PORT in .env
- Password incorrect? Update DB_PASSWORD in .env
- Schema failed? Run it again in MySQL Workbench

**Everything is ready! Start your backend with `npm run dev`**
