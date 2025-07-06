
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Create MySQL pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // e.g. 'containers-us-west-123.railway.app'
  user: process.env.DB_USER,       // e.g. 'root'
  password: process.env.DB_PASS,   // your MySQL password
  database: process.env.DB_NAME,   // your database name
  port: process.env.DB_PORT,       // e.g. 1234 (check Railway)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// POST route to insert data
app.post("/api/add", async (req, res) => {
  const { name, email } = req.body;

  try {
    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    const [result] = await pool.execute(sql, [name, email]);

    res.status(200).json({
      message: "Data inserted successfully",
      insertId: result.insertId
    });
  } catch (err) {
    console.error("Database insert error:", err);
    res.status(500).json({ error: "Insert failed" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// For local development
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
