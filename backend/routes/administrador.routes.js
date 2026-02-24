module.exports = app => {
  const Administrador = require("../controllers/administrador.controller.js");
  const router = require("express").Router();

  // Sign in
  router.post("/signin", Administrador.signin);

  // Create a new Administrador
  router.post("/", Administrador.create);

  // Retrieve all Administradors
  router.get("/", Administrador.isAuthenticated, Administrador.findAll);

  // Retrieve a single Administrador by id
  router.get("/:id", Administrador.isAuthenticated, Administrador.findOne);

  // // Retrieve a single Administrador by dni or email
  // router.get("/dni_email/:field", /*auth.isAuthenticated,*/ administrador.findByDniOrEmail);

  // Update an Administrador by id
  router.put("/:id", Administrador.isAuthenticated, Administrador.update);

  // Delete an Administrador by id
  router.delete("/:id", Administrador.isAuthenticated, Administrador.delete);

  // // Delete all Administradors
  // router.delete("/", administrador.deleteAll);

  app.use('/api/administradors', router);
};