module.exports = app => {
  const Resultado = require("../controllers/resultado.controller.js");
  // const auth = require("../controllers/auth.js");
  const router = require("express").Router();

  // Create a new Resultado
  router.post("/", Resultado.upsert);

  // Retrieve all Resultados
  router.get("/", /*auth.isAuthenticated,*/ Resultado.findAll);

  // Retrieve a single Resultado by id
  router.get("/:id_test/:id_alumno", /*auth.isAuthenticated,*/ Resultado.findOne);

  // Update Resultado
  // router.put("/:id_test/:id_alumno", /*auth.isAuthenticated,*/ Resultado.update);
  router.put("/", Resultado.upsert);

  // Delete Resultado by id
  router.delete("/:id_test/:id_alumno", Resultado.delete);

  // // Delete all Resultados
  // router.delete("/", Resultado.deleteAll);

  app.use('/api/resultados', router);
};