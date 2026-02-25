module.exports = app => {
  const Profesor = require("../controllers/profesor.controller.js");
  const auth = require("../controllers/auth.js");
  const router = require("express").Router();

  // Sign in
  router.post("/signin", Profesor.signin);

  // Create a new Profesor
  router.post("/", Profesor.create);

  // Retrieve all Profesors
  router.get("/", auth.isAuthenticated, Profesor.findAll);

  // Retrieve a single Profesor by id
  router.get("/:id", auth.isAuthenticated, Profesor.findOne);

  // // Retrieve a single Profesor by dni or email
  // router.get("/dni_email/:field", /*auth.isAuthenticated,*/ Profesor.findByDniOrEmail);

  // Update a Profesor by id
  router.put("/:id", auth.isAuthenticated, Profesor.update);

  // Delete a Profesor by id
  router.delete("/:id", auth.isAuthenticated, Profesor.delete);

  // // Delete all Profesors
  // router.delete("/", auth.isAuthenticated, Profesor.deleteAll);

  app.use('/api/profesors', router);
};