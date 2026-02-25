module.exports = app => {
  const Pregunta = require("../controllers/pregunta.controller.js");
  const auth = require("../controllers/auth.js");
  const router = require("express").Router();
  let upload = require('../multer/upload');

  // Create a new Pregunta
  router.post("/", auth.isAdmin, upload.single('filename'), Pregunta.create);

  // Retrieve all Preguntas
  router.get("/", auth.isAuthenticated, Pregunta.findAll);

  // Retrieve a single Pregunta by id
  router.get("/:id", auth.isAuthenticated, Pregunta.findOne);

  // Retrieve all Preguntas by Test
  router.get("/id_test/:id", auth.isAuthenticated, Pregunta.findAllByTest);

  // Update Pregunta by id
  router.put("/:id", auth.isAdmin, (req, res, next) => {
    upload.single('filename')(req, res, function (err) {
      if (err) console.log("Error multer:", err);
      next();
    });
  }, Pregunta.update);

  // Delete Pregunta by id
  router.delete("/:id", auth.isAdmin, Pregunta.delete);

  // // Delete all Preguntas
  // router.delete("/", auth.isAuthenticated, Pregunta.deleteAll);

  app.use('/api/preguntas', router);
};