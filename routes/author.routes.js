const express = require("express");
const router = express.Router();
const authorsController = require("../controllers/author.controller");

// [GET] http://localhost:3000/api/authors
//router.get("/", authorsController.getAll); //Ruta GET para obtener todos los autores

// [GET] http://localhost:3000/api/authors?email=
router.get("/", authorsController.getAuthorHandler);

//[POST] http://localhost:3000/api/authors/
router.post("/", authorsController.createNewAuthor);

//[PUT] http://localhost:3000/api/authors/
router.put("/", authorsController.updateAuthor)

//[DELETE] http://localhost:3000/api/authors/
router.delete("/", authorsController.deleteAuthor)


module.exports = router;