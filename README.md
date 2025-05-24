
# 📊 Sales Data Analysis API

This project provides a backend API built with **Node.js** and **MongoDB** to load, refresh, and analyze large-scale historical sales data from CSV files.

---

## ⚙️ Prerequisites

- **Node.js** `v18+`
- **MongoDB** (installed locally or MongoDB Atlas)
- **npm**

---

## 🚀 Setup Instructions

```bash
# Clone repository
Download .zip file

# Install dependencies
npm install

# Create .env file
cp .env

# Start the development server
npm start
```

---

## 🧪 API Endpoints

| Method | Route                  | Body / Params         | Description                        | Sample Response |
|--------|------------------------|-----------------------|------------------------------------|------------------|
| GET    | /api/refresh           | -                     | Trigger manual CSV data refresh    | `{ "message": "Data refreshed successfully" }` |
| GET    | /api/analysis/revenue  | `startDate`, `endDate`| Get total revenue in range         | `{ "totalRevenue": 23000.55 }` |
| GET    | /api/analysis/product  | `startDate`, `endDate`| Revenue by product                 | `{ "products": [{"name": "iPhone", "revenue": 12000}] }` |

---

## 🛠️ Environment Variables (`.env`)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/salesdb
CSV_FILE_PATH=./data/sales.csv
```

---

## 📅 Daily Refresh

- A cron job runs every midnight to refresh the database from the CSV.
- Logs stored in `logs/app.log`

---

## ✅ Success Criteria

- Modular architecture
- Graceful error handling
- Clean logs
- Efficient data loader for large CSVs