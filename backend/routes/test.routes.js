module.exports = app => {
  const Test = require("../controllers/test.controller.js");
  const auth = require("../controllers/auth.js");
  const router = require("express").Router();

  // Create a new Test
  router.post("/", auth.isAuthenticated, Test.create);

  // Retrieve all Tests
  router.get("/", auth.isAuthenticated, Test.findAll);

  // Retrieve a single Test by id
  router.get("/:id", auth.isAuthenticated, Test.findOne);

  // Update a Test by id
  router.put("/:id", auth.isAuthenticated, Test.update);

  // Delete a Test by id
  router.delete("/:id", auth.isAuthenticated, Test.delete);

  // // Delete all Tests
  // router.delete("/", auth.isAuthenticated, Test.deleteAll);

  app.use('/api/tests', router);
};