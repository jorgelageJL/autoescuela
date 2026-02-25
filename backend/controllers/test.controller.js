const db = require("../models");
const Test = db.Test;

// Retrieve all Tests from the database.
exports.findAll = (req, res) => {
  Test.findAll()
    .then(data => {
      res.status(200).send(data);
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
        res.status(200).send(data);
      } else {
        res.status(404).send({
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

// Create a new Test
exports.create = async (req, res) => {
  if (!req.body || !req.body.nombre || !req.body.id_admin) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  try {
    const newObj = {
      nombre: req.body.nombre,
      id_admin: req.body.id_admin
    };

    const data = await Test.create(newObj);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error creating Test"
    });
  }
};

// Update a Test by id
exports.update = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const id = req.params.id;
  try {
    const newObj = {};

    if (req.body.nombre)
      newObj.nombre = req.body.nombre;

    if (req.body.id_admin)
      newObj.id_admin = req.body.id_admin;

    const [num] = await Test.update(newObj, {
      where: { id_test: id }
    });

    if (num == 1) {
      res.status(200).send({
        message: "Test was updated successfully."
      });
    } else {
      res.status(400).send({
        message: `Cannot update Test with id=${id}. Maybe Test was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Test with id=" + id
    });
  }
};

// Delete a Test by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Test.destroy({
    where: { id_test: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Test was deleted successfully!"
        });
      } else {
        res.status(400).send({
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
      res.status(200).send({ message: `${nums} Tests were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Tests."
      });
    });
};