module.exports = app => {
    const administrador = require("../controllers/administrador.controller.js");
    // const auth = require("../controllers/auth.js");
    var router = require("express").Router();
  
    // Create a new Administrador
    router.post("/", administrador.create);
  
    // Retrieve all Administradores
    router.get("/", /*auth.isAuthenticated,*/ administrador.findAll);
    
    // Retrieve a single Administrador with id
    router.get("/:id", /*auth.isAuthenticated,*/ administrador.findOne);
  
    // Update an Administrador with id
    router.put("/:id", /*auth.isAuthenticated,*/ administrador.update);

    // Sign in
    // router.post("/signin", auth.signin);
  
    // // Delete a User with id
    // router.delete("/:id", users.delete);
  
    // // Create a new User
    // router.delete("/", users.deleteAll);
  
    app.use('/api/administradors', router);
  };