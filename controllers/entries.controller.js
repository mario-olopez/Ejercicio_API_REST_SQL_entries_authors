const { getAllEntries, updateEntryByTitle, deleteEntryByTitle} = require("../models/entries.model");

//Controlador para obtener todas las entradas
const getAll = async (req, res) => {
  try {
    const entries = await getAllEntries();
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener las entradas");
  }
};

//Controlador para actualizar una entrada en función del título

const updateEntry = async (req, res) => {
  const oldTitle = req.params.title //Este es el título que recibimos en la URL y que queremos modificar
  const { newTitle, content, category } = req.body; //Los nuevos datos que ponemos en el body

  try {
    const result = await updateEntryByTitle(oldTitle, newTitle, content, category);

    if(result.rowCount === 0){
      return res.status(404).send({ message: "No se ha encontrado una entrada con ese título"})
    }
    res.status(200).send({ message: `Se ha modificado la entry: ${oldTitle}`})
  } catch(err){
    console.log(err)
    res.status(500).send({ message: "Error al modificar la entrada"})
  }
}

//Borrar una entrada buscada por título
const deleteEntry = async (req, res) => {
  const title = req.params.title;

  try {
    const result = await deleteEntryByTitle(title);

    if(result.rowCount === 0){
      return res.status(404).send({ message: "No se ha encontrado una entrada con ese título"})
    }
    res.status(200).send({ message: `Se ha borrado la entrada con título ${title}`})
  } catch(err){
    console.log(err)
    res.status(500).send({ message: "Error al borrar la entrada"})
  }
}

module.exports = {
  getAll,
  updateEntry,
  deleteEntry
};