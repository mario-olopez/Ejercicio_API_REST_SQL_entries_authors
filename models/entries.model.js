const pool = require('../config/db_pgsql');
const queries = require('../queries/entries.queries');

const getAllEntries = async () => {
  const result = await pool.query(queries.getAllEntries);
  return result.rows;
};

const updateEntryByTitle = async (oldTitle, newTitle, content, category) => {
  const values = [newTitle, content, category, oldTitle];
  const result = await pool.query(queries.updateEntryByTitle, values)
  return result;
}

const deleteEntryByTitle = async (title) => {
  const result = await pool.query(queries.deleteEntryByTitle, [title]);
  return result;
};

module.exports = {
  getAllEntries,
  updateEntryByTitle,
  deleteEntryByTitle
};