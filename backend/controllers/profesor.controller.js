const db = require("../models");
const Profesor = db.Profesor;
const Op = db.Sequelize.Op;
// const utils = require("../utils.js");
// const  bcrypt  =  require('bcryptjs');

// Create a new Profesor
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre || !req.body.apellidos || !req.body.dni
    || !req.body.email || !req.body.password || !req.body.id_admin) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Profesor
  const profesor = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    dni: req.body.dni,
    email: req.body.email,
    password: req.body.password,
    id_admin: req.body.id_admin
  };

  // Profesor.findOne({ where: { dni: Profesor.dni } })
  //   .then(data => {
  //     if (data) {
  //       const result = bcrypt.compareSync(Profesor.password, data.password);
  //       if (!result) return res.status(401).send('Password not valid!');
  //       const token = utils.generateToken(data);
  //       // get basic user details
  //       const userObj = utils.getCleanUser(data);
  //       // return the token along with user details
  //       return res.json({ user: userObj, access_token: token });
  //     }

  //     administrador.password = bcrypt.hashSync(req.body.password);

  // Save new Administrador in the database
  Profesor.create(profesor)
    .then(data => {
      // const token = utils.generateToken(data);
      // get basic user details
      // const userObj = utils.getCleanUser(data);
      // return the token along with user details
      // return res.json({ user: userObj, access_token: token });
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Profesor."
      });
    });

  // })
  // .catch(err => {
  //   res.status(500).send({
  //     message:
  //       err.message || "Some error occurred while retrieving tutorials."
  //   });
  // });
};

// Retrieve all Profesors from the database.
exports.findAll = (req, res) => {
  Profesor.findAll()
    .then(data => {
      res.send(data);
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
        res.send(data);
      } else {
        res.send({
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

// Find a Profesor by password and dni or email
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
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving a Profesor."
      });
    });
};

// Update a Profesor by id
exports.update = (req, res) => {
  const id = req.params.id;

  Profesor.update(req.body, {
    where: { id_profesor: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Profesor was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Profesor with id=${id}. Maybe Profesor was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Profesor with id=" + id
      });
    });
};

// Delete a Profesor by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Profesor.destroy({
    where: { id_profesor: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Profesor was deleted successfully!"
        });
      } else {
        res.send({
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
      res.send({ message: `${nums} Profesors were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Profesors."
      });
    });
};