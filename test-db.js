const pool = require('./config/db_pgsql');

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('DB Conectada', res.rows[0]);
  } catch (err) {
    console.error('Error de conexión:', err.message);
  } finally {
    pool.end();
  }
})();