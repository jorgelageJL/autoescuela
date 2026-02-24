const db = require("../models");
const Alumno = db.Alumno;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
// const utils = require("../utils.js");

// Create a new Alumno
exports.create = (req, res) => {

  if (!req.body.nombre || !req.body.apellidos || !req.body.dni
    || !req.body.email || !req.body.password || !req.body.id_profesor) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const alumno = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    dni: req.body.dni,
    email: req.body.email,
    password: hashedPassword,
    id_profesor: req.body.id_profesor
  };

  Alumno.create(alumno)
    .then(data => res.status(201).send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error creating Alumno."
      });
    });

exports.findByAlumno = (req, res) => {

  const id = req.params.id;

  db.Resultado.findAll({
    where: { id_alumno: id },
    include: [{
      model: db.Test,
      attributes: ['nombre']
    }]
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
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

  if (!req.body.password || (!req.body.dni && !req.body.email)) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const { password, dni, email } = req.body;

  const condition = dni ? { dni: dni } : { email: email };

  Alumno.findOne({ where: condition })
    .then(data => {

      if (!data) {
        return res.status(404).send({
          message: "Alumno not found."
        });
      }

      // 🔐 Comparar contraseña encriptada
      const passwordIsValid = bcrypt.compareSync(password, data.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid password."
        });
      }

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