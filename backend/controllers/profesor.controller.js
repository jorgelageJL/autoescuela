const db = require("../models");
const Profesor = db.Profesor;
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

    const user = await Profesor.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        error: true,
        message: "Profesor not found."
      });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        error: true,
        message: "Invalid password."
      });
    }

    // Payload limpio
    const payload = {
      id: user.id_profesor,
      nombre: user.nombre,
      email: user.email,
      password: user.password,
      isAdmin: false
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.status(200).json({
      user: payload,
      access_token: token
    });

  } catch (err) {
    res.status(500).json({
      message: err.message || "Signin error"
    });
  }
};

// exports.isAuthenticated = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({
//         message: "No token provided."
//       });
//     }

//     const token = authHeader.split(" ")[1]; // Bearer TOKEN
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decoded)
//     const user = await Profesor.findByPk(decoded.id);

//     if (!user) {
//       return res.status(401).json({
//         message: "Invalid Profesor."
//       });
//     }

//     req.user = decoded; // guardar datos del usuario
//     next();

//   } catch (err) {
//     return res.status(401).json({
//       message: "Invalid or expired token."
//     });
//   }
// };

// Retrieve all Profesors from the database.
exports.findAll = (req, res) => {
  Profesor.findAll()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Profesors."
      });
    });
};

// Find a single Profesor by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Profesor.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(400).send({
          message: `Profesor with id=${id} was not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Profesor with id=" + id
      });
    });
};

// Find Profesor by password and dni or email
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

  Profesor.findOne({ where: condition })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving a Profesor."
      });
    });
};

// Create a new Profesor
exports.create = async (req, res) => {
  if (!req.body || !req.body.nombre || !req.body.apellidos || !req.body.dni
    || !req.body.email || !req.body.password || !req.body.id_admin) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  try {
    const user = {
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      dni: req.body.dni,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      id_admin: req.body.id_admin
    };

    const data = await Profesor.create(user);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error creating Profesor"
    });
  }
};

// Update Profesor by id
exports.update = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const id = req.params.id;
  try {
    const user = {};

    if (req.body.nombre)
      user.nombre = req.body.nombre;

    if (req.body.apellidos)
      user.apellidos = req.body.apellidos;

    if (req.body.dni)
      user.dni = req.body.dni;

    if (req.body.email)
      user.email = req.body.email;

    if (req.body.password)
      user.password = bcrypt.hashSync(req.body.password, 8);

    if (req.body.id_admin)
      user.id_admin = req.body.id_admin;

    const [num] = await Profesor.update(user, {
      where: { id_profesor: id }
    });

    if (num == 1) {
      res.status(200).send({
        message: "Profesor was updated successfully."
      });
    } else {
      res.status(400).send({
        message: `Cannot update Profesor with id=${id}. Maybe Profesor was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Profesor with id=" + id
    });
  }
};

// Delete Profesor by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Profesor.destroy({
    where: { id_profesor: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Profesor was deleted successfully!"
        });
      } else {
        res.status(400).send({
          message: `Cannot delete Profesor with id=${id}. Maybe Profesor was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Profesor with id=" + id
      });
    });
};

// Delete all Profesors from the database.
exports.deleteAll = (req, res) => {
  Profesor.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.status(200).send({ message: `${nums} Profesors were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Profesors."
      });
    });
};