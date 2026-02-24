const db = require("../models");
const Administrador = db.Administrador;
const Op = db.Sequelize.Op;
// const utils = require("../utils.js");
const  bcrypt  =  require('bcryptjs');

// Create a new Administrador
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre || !req.body.apellidos || !req.body.dni
    || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

const administrador = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    dni: req.body.dni,
    email: req.body.email,
    password: req.body.password // el modelo lo encripta
  };
  Administrador.create(administrador)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error creating Administrador."
      });
    });

  // Administrador.findOne({ where: { dni: administrador.dni } })
  //   .then(data => {
  //     if (data) {
  //       const result = bcrypt.compareSync(administrador.password, data.password);
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

  const field = req.params.field;

  Administrador.findOne({
    where: {
      [Op.or]: [
        { dni: field },
        { email: field }
      ]
    }
  })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving Administrador."
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

// Update an Administrador by id
exports.update = (req, res) => {
  const id = req.params.id;

  Administrador.update(req.body, {
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

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {
//   User.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
exports.login = async (req, res) => {

  if (!req.body.password || (!req.body.dni && !req.body.email)) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  try {

    const admin = await Administrador.findOne({
      where: {
        [Op.or]: [
          { dni: req.body.dni },
          { email: req.body.email }
        ]
      }
    });

    if (!admin) {
      return res.status(404).send({
        message: "Administrador not found."
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      admin.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid password."
      });
    }

    res.send({
      message: "Login successful",
      administrador: admin
    });

  } catch (error) {
    res.status(500).send({
      message: "Error during login."
    });
  }
};
// };