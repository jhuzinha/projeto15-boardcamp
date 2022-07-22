import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();


const { Pool } = pg;

const connection = new Pool(
    process.env.DATABASE_URL
);

export default connection;
