module.exports = app => {
  const Pregunta = require("../controllers/pregunta.controller.js");
  // const auth = require("../controllers/auth.js");
  const router = require("express").Router();
  // Find by test choose	
   router.get("/test/:id", Pregunta.findByTest);
  // Create a new Pregunta
  router.post("/", Pregunta.create);
  // Retrieve all Preguntas
  router.get("/", /*auth.isAuthenticated,*/ Pregunta.findAll);
  // Retrieve a single Pregunta by id
  router.get("/:id", /*auth.isAuthenticated,*/ Pregunta.findOne);
  // // Retrieve a single Pregunta by enunciado
  // router.get("/dni_email/:field", /*auth.isAuthenticated,*/ Pregunta.findByDniOrEmail);
  // Update Pregunta by id
  router.put("/:id", /*auth.isAuthenticated,*/ Pregunta.update);
  // Delete Pregunta by id
  router.delete("/:id", Pregunta.delete);
  // // Delete all Preguntas
  // router.delete("/", Pregunta.deleteAll);
  app.use('/api/preguntas', router);
};