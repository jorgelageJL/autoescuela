module.exports = app => {
  const Alumno = require("../controllers/alumno.controller.js");
  // const auth = require("../controllers/auth.js");
  const router = require("express").Router();

  // Create a new Alumno
  router.post("/", Alumno.create);

  // Retrieve all Alumnos
  router.get("/", /*auth.isAuthenticated,*/ Alumno.findAll);

  // Retrieve a single Alumno by id
  router.get("/:id", /*auth.isAuthenticated,*/ Alumno.findOne);

  // // Retrieve a single Alumno by dni or email
  // router.get("/dni_email/:field", /*auth.isAuthenticated,*/ Alumno.findByDniOrEmail);

  // Update an Alumno by id
  router.put("/:id", /*auth.isAuthenticated,*/ Alumno.update);

  // Sign in
  // router.post("/signin", auth.signin);

  // Delete an Alumno by id
  router.delete("/:id", Alumno.delete);

  // // Delete all Alumnos
  // router.delete("/", Alumno.deleteAll);

  app.use('/api/alumnos', router);
};