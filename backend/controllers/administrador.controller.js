const db = require("../models");
const Administrador = db.Administrador;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "Email and Password required."
      });
    }

    const admin = await Administrador.findOne({ where: { email } });

    if (!admin) {
      return res.status(401).json({
        error: true,
        message: "Administrador not found."
      });
    }

    const passwordIsValid = bcrypt.compareSync(password, admin.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        error: true,
        message: "Invalid password."
      });
    }

    // Payload limpio
    const payload = {
      id: admin.id_admin,
      nombre: admin.nombre,
      email: admin.email,
      password: admin.password,
      isAdmin: true
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.json({
      user: payload,
      access_token: token
    });

  } catch (err) {
    res.status(500).json({
      message: err.message || "Signin error"
    });
  }
};

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
    console.log(decoded)

    const admin = await Administrador.findByPk(decoded.id);

    if (!admin) {
      return res.status(401).json({
        message: "Invalid user."
      });
    }

    req.user = decoded; // guardar datos del usuario
    next();

  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token."
    });
  }
};

// Retrieve all Administradors from the database.
exports.findAll = (req, res) => {
  Administrador.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Administradors."
      });
    });
};

// Find a single Administrador by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Administrador.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.send({
          message: `Administrador with id=${id} was not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Administrador with id=" + id
      });
    });
};

// Find Administrador by dni or email
exports.findByDniOrEmail = (req, res) => {
  const field = req.params.field

  Administrador.findOne({ where: { dni: field } || { email: field } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving an Administrador."
      });
    });
};

// Find an Administrador by password and dni or email
exports.findByPasswordAndDniOrEmail = (req, res) => {
  // Validate request
  if (!req.body.password || !req.body.dni && !req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const password = req.body.password;
  const dni = req.body.dni;
  const condition = dni ? { dni: dni, password: password } : { email: req.body.email, password: password };

  Administrador.findOne({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving an Administrador."
      });
    });
};

// Create a new Administrador
exports.create = async (req, res) => {
  try {
    const administrador = {
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      dni: req.body.dni,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    };

    const data = await Administrador.create(administrador);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error creating Administrador"
    });
  }
};

// Update an Administrador by id
exports.update = (req, res) => {
  const id = req.params.id;

  const administrador = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    dni: req.body.dni,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  };

  Administrador.update(administrador, {
    where: { id_admin: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Administrador was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Administrador with id=${id}. Maybe Administrador was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Administrador with id=" + id
      });
    });
};

// Delete an Administrador by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Administrador.destroy({
    where: { id_admin: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Administrador was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Administrador with id=${id}. Maybe Administrador was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Administrador with id=" + id
      });
    });
};

// Delete all Administradors from the database.
exports.deleteAll = (req, res) => {
  Administrador.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Administradors were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Administradors."
      });
    });
};