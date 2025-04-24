const pool = require("../config/db_pgsql");
const queries = require("../queries/author.queries");

//Obtener todos los autores
const getAllAuthors = async () => {
  const result = await pool.query(queries.getAllAuthors);
  return result.rows;
};

//Obtener autor por email
const getAuthorByEmail = async (email) => {
  const result = await pool.query(queries.getAuthorByEmail, [email]);
  return result.rows[0];
}

//Crear autor
const createAuthor = async (name, surname, email, image) => {
  const values = [name, surname, email, image];

  try {
    await pool.query(queries.createAuthor, values);
  } catch (err) {
    throw err;
  }
};

//Actualizar autor por email
const updateAuthorByEmail = async (name, surname, email, image) => {
  const query = queries.updateAuthorByEmail;
  const values = [name, surname, image, email];
  return await pool.query(query, values)
}

//Borrar autor por email
const deleteAuthorByEmail = async (email) => {
  const result = await pool.query(queries.deleteAuthorByEmail, [email]);
  return result;
}


module.exports = {
  getAllAuthors,
  getAuthorByEmail,
  createAuthor,
  updateAuthorByEmail,
  deleteAuthorByEmail
};