import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST || "aws-1-ap-south-1.pooler.supabase.com",
  database: process.env.DB_NAME || "postgres",
  user: process.env.DB_USER || "postgres.ueujpsbaffzigqfglqglqhi",
  password: process.env.DB_PASS || "Varshi@5126",
  port: parseInt(process.env.DB_PORT || "5432"),
  ssl: { rejectUnauthorized: false },
});

async function addAdmin() {
  try {
    // Insert admin user into participants table
    const query = `
      INSERT INTO participants (name, email, roll_number, participant_type, school_id, department)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (email) DO NOTHING
      RETURNING participant_id, name, email;
    `;

    const values = [
      'Admin User', // name
      'hanmanthraobd@gmail.com', // email
      'ADMIN001', // roll_number
      'admin', // participant_type
      1, // school_id
      'Administration' // department
    ];

    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      console.log('Admin user added successfully:', result.rows[0]);
    } else {
      console.log('Admin user already exists or could not be added');
    }

  } catch (error) {
    console.error('Error adding admin user:', error);
  } finally {
    await pool.end();
  }
}

addAdmin();