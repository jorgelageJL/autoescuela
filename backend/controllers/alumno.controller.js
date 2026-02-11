const db = require("../models");
const Alumno = db.Alumno;
const Op = db.Sequelize.Op;
// const utils = require("../utils.js");
// const  bcrypt  =  require('bcryptjs');

// Create a new Alumno
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre || !req.body.apellidos || !req.body.dni
    || !req.body.email || !req.body.password || !req.body.id_profesor) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an Alumno
  const alumno = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    dni: req.body.dni,
    email: req.body.email,
    password: req.body.password,
    id_profesor: req.body.id_profesor
  };

  // Alumno.findOne({ where: { dni: Alumno.dni } })
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

  // Save new Alumno in the database
  Alumno.create(alumno)
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
          err.message || "Some error occurred while creating the Alumno."
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

// Retrieve all Alumno from the database.
exports.findAll = (req, res) => {
  Alumno.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Alumnos."
      });
    });
};

// Find a single Alumno by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Alumno.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.send({
          message: `Alumno with id=${id} was not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Alumno with id=" + id
      });
    });
};

// Find an Alumno by password and dni or email
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

  Alumno.findOne({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving an Alumno."
      });
    });
};

// Update an Alumno by id
exports.update = (req, res) => {
  const id = req.params.id;

  Alumno.update(req.body, {
    where: { id_alumno: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Alumno was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Alumno with id=${id}. Maybe Alumno was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Alumno with id=" + id
      });
    });
};

// Delete an Alumno by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Alumno.destroy({
    where: { id_alumno: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Alumno was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Alumno with id=${id}. Maybe Alumno was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Alumno with id=" + id
      });
    });
};

// Delete all Alumnos from the database.
exports.deleteAll = (req, res) => {
  Alumno.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Alumnos were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Alumnos."
      });
    });
};