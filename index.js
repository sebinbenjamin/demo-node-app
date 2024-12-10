const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

require('dotenv').config();

// Create a connection to the database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const app = express();
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000' // Allow only requests from this origin
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.get('/todos', (req, res) => {
  pool.query('SELECT * FROM todos', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running on PORT', PORT);
})