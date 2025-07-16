import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

//local
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

// SupaBase
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

// client.query("SELECT NOW()", (err, res) => {});

export default pool;
