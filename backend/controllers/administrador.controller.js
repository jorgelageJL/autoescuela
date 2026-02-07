const db = require("../models");
const Administrador = db.administrador;
const Op = db.Sequelize.Op;
// const utils = require("../utils.js");
// const  bcrypt  =  require('bcryptjs');

// Create and Save a new Administrador
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre || !req.body.apellidos || !req.body.dni
    || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an Administrador
  let administrador = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    dni: req.body.dni,
    email: req.body.email,
    password: req.body.password
  };

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

      // Save new Administrador in the database
      Administrador.create(administrador)
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
              err.message || "Some error occurred while creating the Administrador."
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

// Retrieve all Administradores from the database.
exports.findAll = (req, res) => {
  Administrador.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Administrador with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Administrador.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Administrador with id=" + id
      });
    });
};

// Update an Administrador by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Administrador.update(req.body, {
    where: { id: id }
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

// // Delete a Administrador with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   User.destroy({
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "User was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete User with id=${id}. Maybe User was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete User with id=" + id
//       });
//     });
// };

// // Delete all Administradores from the database.
// exports.deleteAll = (req, res) => {
//   User.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Tutorials were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     });
// };

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
// };

// Find Administrador by username and password
exports.findUserByUsernameAndPassword = (req, res) => {
  const user = req.body.username;
  const pwd = req.body.password;

  Administrador.findOne({ where: { username: user, password: pwd } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};