const db = require("../models");
const Test = db.Test;
const Op = db.Sequelize.Op;
// const utils = require("../utils.js");
// const  bcrypt  =  require('bcryptjs');

// Create a new Test
exports.create = (req, res) => {
  // Validate request
 if (!req.body.nombre || !req.body.id_admin) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Test
  const test = {
  nombre: req.body.nombre,
  id_admin: req.body.id_admin
};

  // Test.findOne({ where: { dni: Test.dni } })
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

  // Save new Test in the database
  Test.create(test)
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
          err.message || "Some error occurred while creating the Test."
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

// Retrieve all Tests from the database.
exports.findAll = (req, res) => {
  Test.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tests."
      });
    });
};

// Find a single Test by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Test.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.send({
          message: `Test with id=${id} was not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Test with id=" + id
      });
    });
};

// Find a Test by name
exports.findByName = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Test.findOne({ where: { name: req.body.name } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving an Test."
      });
    });
};

// Update a Test by id
exports.update = (req, res) => {
  const id = req.params.id;

  Test.update(req.body, {
    where: { id_test: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Test was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Test with id=${id}. Maybe Test was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Test with id=" + id
      });
    });
};

// Delete a Test by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Test.destroy({
    where: { id_test: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Test was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Test with id=${id}. Maybe Test was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Test with id=" + id
      });
    });
};

// Delete all Tests from the database.
exports.deleteAll = (req, res) => {
  Test.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tests were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Tests."
      });
    });
};