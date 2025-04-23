const { getAllAuthors, getAuthorByEmail, createAuthor, updateAuthorByEmail, deleteAuthorByEmail } = require("../models/author.model");

//Función para obtener todos los autores
const getAll = async (req, res) => {
  try {
    const authors = await getAllAuthors();
    res.json(authors);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener autores");
  }
};

//Función para obtener autor con endpoint email
const getAuthorHandler = async (req, res) => {
  const { email } = req.query;

  try {
    if (email) {
      const author = await getAuthorByEmail(email);

      if (!author) {
        return res.status(404).send({ message: "Autor no encontrado" });
      }

      return res.status(200).json(author);
    }

    const authors = await getAllAuthors();
    res.status(200).json(authors);

  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener el autor");
  }
};

//Función para crear nuevo autor
const createNewAuthor = async (req, res) => {
  const { name, surname, email, image } = req.body;

  try {
    await createAuthor(name, surname, email, image);
    res.status(201).send({ message: `Usuario creado: ${email}` });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error al crear el autor" });
  }
};

//Función para modificar autor
const updateAuthor = async (req, res) => {
  const { name, surname, email, image } = req.body;

  try {
    const result = await updateAuthorByEmail(name, surname, email, image);
    if(result.rowCount === 0){
      return res.status(404).send({ message: "Autor no encontrado"})
    }
    res.status(200).send({ message: `Usuario actualizado: ${email}`})
  } catch(err){
    console.error(err)
    res.status(500).send({ message: "Error al actualizar autor"})
  }
}

//Función para eliminar a autor buscado por email
const deleteAuthor = async (req, res) => {
  const { email } = req.body;
  try{
    const result = await deleteAuthorByEmail(email);
    if(result.rowCount === 0){
      return res.status(404).send({ message: "Autor no encontrado"})
    }
    res.status(200).send({ message: `Se ha borrado: ${email}`})
  } catch (err){
    console.error(err)
    res.status(500).send({ message: "Error al borrar autor"})
  }
}

module.exports = {
  getAll,
  getAuthorHandler,
  createNewAuthor,
  updateAuthor,
  deleteAuthor
};