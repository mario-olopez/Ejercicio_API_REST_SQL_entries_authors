const express = require('express');
const router = express.Router();
const entriesController = require('../controllers/entries.controller');

//http://localhost:3000/api/entries
router.get("/", entriesController.getAll); //Ruta get para obtener todas las entries

//http://localhost:3000/api/entries/
router.put("/:title", entriesController.updateEntry) //Definimos ruta PUT que toma el título como parámetro

//http://localhost:3000/api/entries/
router.delete("/:title", entriesController.deleteEntry) //Ruta delete para borrar una entrada


module.exports = router;