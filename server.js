import express from "express";
import cors from "cors";
import {Pool} from 'pg';

const app=express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,       // Your Railway database host
  user: process.env.DB_USER,       // Your database username
  password: process.env.DB_PASSWORD, // Your database password
  database: process.env.DB_NAME,   // Your database name
  waitForConnections: true,        // Ensures the pool waits for available connections
  connectionLimit: 10,             // Max number of connections to the DB
  queueLimit: 0                    // Set to 0 for unlimited waiting requests
});

app.get('/api/bombalabap1',async (req,res)=>{
  
try{
const result =await pool.query('SELECT * FROM users');
res.json(result.rows);
}catch(err){
     res.status(500).json({ error: 'Database error' });
}

app.post('/api/bombalabap2', async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    await pool.query('INSERT INTO users (name) VALUES (?)', [name]);
    res.json({ message: 'User added!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to insert user' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

});