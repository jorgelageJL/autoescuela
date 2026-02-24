module.exports = app => {
  const auth = require("../controllers/auth.controller.js");
  const router = require("express").Router();

  // Login
  router.post("/signin", auth.signin);

  app.use("/api/auth", router);
};