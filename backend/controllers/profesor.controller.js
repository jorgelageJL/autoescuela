const db = require("../models");
const Profesor = db.Profesor;
const Op = db.Sequelize.Op;
// const utils = require("../utils.js");
const  bcrypt  =  require('bcryptjs');

// Create new Profesor
exports.create = (req, res) => {

  if (!req.body.nombre || !req.body.apellidos || !req.body.dni
      || !req.body.email || !req.body.password) {
    return res.status(400).send({
      message: "Todos los campos son obligatorios"
    });
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const profesor = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    dni: req.body.dni,
    email: req.body.email,
    password: hashedPassword
  };

  Profesor.create(profesor)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error al crear profesor"
      });
    });
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
exports.login = (req, res) => {

  if (!req.body.password || (!req.body.dni && !req.body.email)) {
    return res.status(400).send({
      message: "DNI/email y password obligatorios"
    });
  }

  const condition = req.body.dni
    ? { dni: req.body.dni }
    : { email: req.body.email };

  Profesor.findOne({ where: condition })
    .then(user => {

      if (!user) {
        return res.status(404).send({
          message: "Profesor no encontrado"
        });
      }

      const valid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!valid) {
        return res.status(401).send({
          message: "Password incorrecta"
        });
      }

      const userWithoutPassword = {
        id_profesor: user.id_profesor,
        nombre: user.nombre,
        apellidos: user.apellidos,
        email: user.email,
        dni: user.dni
      };

      res.send(userWithoutPassword);
    })
    .catch(() => {
      res.status(500).send({
        message: "Error en login"
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

// Find Profesor by password and dni or email
exports.findByPasswordAndDniOrEmail = (req, res) => {

  // Validar request
  if (!req.body.password || (!req.body.dni && !req.body.email)) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const password = req.body.password;
  const dni = req.body.dni;

  // Buscar SOLO por dni o email (NO por password)
  const condition = dni
    ? { dni: dni }
    : { email: req.body.email };

  Profesor.findOne({ where: condition })
    .then(user => {

      if (!user) {
        return res.status(404).send({
          message: "Profesor not found"
        });
      }

      // 🔐 Comparar contraseña encriptada
      const passwordIsValid = bcrypt.compareSync(
        password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid password"
        });
      }

      // Opcional: quitar password antes de enviar
      const userWithoutPassword = {
        id_profesor: user.id_profesor,
        nombre: user.nombre,
        apellidos: user.apellidos,
        email: user.email,
        dni: user.dni,
        id_admin: user.id_admin
      };

      res.send(userWithoutPassword);

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Profesor."
      });
    });
	};

// Update Profesor by id
exports.update = (req, res) => {
  const id = req.params.id;

  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

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
          message: `Cannot update Profesor with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Profesor with id=" + id
      });
    });
};

// Delete Profesor by id
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