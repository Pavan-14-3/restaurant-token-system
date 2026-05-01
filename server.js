const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "010101",
  database: "restaurant"
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// ✅ 1. Test route
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// ✅ 2. Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "12345") {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// ✅ 3. Order API
app.post("/order", (req, res) => {
  const { items, total, method } = req.body;
  const orderId = "ORDER-" + Math.floor(Math.random() * 10000);

  const query = `
    INSERT INTO orders (order_id, data, total, method)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [orderId, JSON.stringify(items), total, method], (err) => {
    if (err) {
      console.log("❌ Insert error:", err);
      res.status(500).send("Database error");
    } else {
      res.json({ success: true, orderId });
    }
  });
});

// ✅ Start server on Port 5001
app.listen(5001, () => {
  console.log("🚀 Server running on http://localhost:5001");
});
 