import express from "express";
import cors from "cors";
import {Pool} from 'pg';

const app=express();
app.use(cors());
app.use(express.json());

const pool=new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:{rejectUnauthorized:false}
});

app.get('/bom/balabap1',async (req,res)=>{
  
try{
const result =await pool.query('SELECT * FROM users');
res.json(result.rows);
}catch(err){
     res.status(500).json({ error: 'Database error' });
}

app.post('/bom/balabap2', async (req, res) => {
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