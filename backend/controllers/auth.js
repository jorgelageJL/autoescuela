const db = require("../models");
const jwt = require('jsonwebtoken');
const Alumno = db.Alumno;
const Profesor = db.Profesor;
const Administrador = db.Administrador;

exports.isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided."
      });
    }

    const token = authHeader.split(" ")[1]; // Bearer TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    let user = await Alumno.findByPk(decoded.id);
    
    if (user) {
      req.user = decoded; // guardar datos del usuario
      // user.user.rol = 'aaa';
      console.log(req.user)
      return next();
    }

    user = await Profesor.findByPk(decoded.id);

    if (user) {
      req.user = decoded; // guardar datos del usuario
      console.log(req.user)
      return next();
    }

    user = await Administrador.findByPk(decoded.id);

    if (user) {
      req.user = decoded; // guardar datos del usuario
      console.log(req.user)
      return next();
    } else {
      return res.status(401).json({
        message: "Invalid User."
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token."
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided."
      });
    }

    const token = authHeader.split(" ")[1]; // Bearer TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    let user = await Administrador.findByPk(decoded.id);

    if (user) {
      req.user = decoded; // guardar datos del usuario
      return next();
    } else {
      return res.status(401).json({
        message: "Invalid Admin."
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token."
    });
  }
};