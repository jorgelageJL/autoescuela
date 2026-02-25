module.exports = app => {
  const Resultado = require("../controllers/resultado.controller.js");
  const auth = require("../controllers/auth.js");
  const router = require("express").Router();

  // Create a new Resultado
  router.post("/", auth.isAuthenticated, Resultado.upsert);

  // Retrieve all Resultados
  router.get("/", auth.isAuthenticated, Resultado.findAll);
  
  // Retrieve a single Resultado by id Test
  router.get("/test/:id", auth.isAuthenticated, Resultado.findAlumnoByIdTest);
  
  // Retrieve a single Resultado by id Alumno
  router.get("/alumno/:id", auth.isAuthenticated, Resultado.findTestByIdAlumno);

  // Retrieve a single Resultado by id
  router.get("/:id_test/:id_alumno", auth.isAuthenticated, Resultado.findOne);

  // Update Resultado
  // router.put("/:id_test/:id_alumno", /*auth.isAuthenticated,*/ Resultado.update);
  router.put("/", auth.isAuthenticated, Resultado.upsert);

  // Delete Resultado by id
  router.delete("/:id_test/:id_alumno", auth.isAuthenticated, Resultado.delete);

  // // Delete all Resultados
  // router.delete("/", auth.isAuthenticated, Resultado.deleteAll);

  app.use('/api/resultados', router);
};