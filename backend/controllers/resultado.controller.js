const db = require("../models");
const Resultado = db.Resultado;
const Op = db.Sequelize.Op;
// const utils = require("../utils.js");
// const  bcrypt  =  require('bcryptjs');

// Create a new Resultado
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.id_test || !req.body.id_alumno || req.body.nota < 0) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Resultado.findOne({ where: { dni: Resultado.dni } })
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

  // Save new Resultado in the database
  await Resultado.create(req.body)
    .then(data => {
      // const token = utils.generateToken(data);
      // get basic user details
      // const userObj = utils.getCleanUser(data);
      // return the token along with user details
      // return res.json({ user: userObj, access_token: token });
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Resultado."
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

// Retrieve all Resultados from the database.
exports.findAll = (req, res) => {
  Resultado.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Resultados."
      });
    });
};

// Find Test by id_alumno
exports.findById = (req, res) => {
  Test.findByPk(1, {
    include: {
      model: Alumno,
      through: { attributes: [] }
    }
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving a Test."
      });
    });
};

// Find Alumno by id_test
exports.findById = (req, res) => {
  Alumno.findByPk(1, {
    include: {
      model: Test,
      through: { attributes: [] }
    }
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving an Alumno."
      });
    });
};

// Find a single Resultado by ids
exports.findOne = (req, res) => {
  const id_test = req.params.id_test;
  const id_alumno = req.params.id_alumno;

  Resultado.findOne({ where: { id_test: id_test, id_alumno: id_alumno } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.send({
          message: `Resultado with id_test=${id_test} and id_alumno=${id_alumno} was not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Resultado with id=" + id
      });
    });
};

exports.upsert = async (req, res) => {
  try {
    await Resultado.upsert(req.body);

    res.send({
      message: "Resultado created or updated successfully."
    });

  } catch (error) {
    res.status(500).send({
      message: "Error saving Resultado."
    });
  }
};

// Update Resultado by id
exports.update = (req, res) => {
  const id_test = req.params.id_test;
  const id_alumno = req.params.id_alumno;
  console.log(req.body)

  Resultado.update(req.body, {
    where: { id_test: id_test, id_alumno: id_alumno }
  })
    .then(([num]) => {
      if (num === 1) {
        res.send({
          message: "Resultado was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Resultado with id_test=${id_test} and id_alumno=${id_alumno}. Maybe Resultado was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating Resultado with id_test=${id_test} and id_alumno=${id_alumno}.`
      });
    });
};

// Delete Resultado by id
exports.delete = (req, res) => {
  const id_test = req.params.id_test;
  const id_alumno = req.params.id_alumno;

  Resultado.destroy({
    where: { id_test: id_test, id_alumno: id_alumno }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Resultado was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Resultado with id_test=${id_test} and id_alumno=${id_alumno}. Maybe Resultado was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Resultado with id_test=${id_test} and id_alumno=${id_alumno}.`
      });
    });
};

// Delete all Resultados from the database.
exports.deleteAll = (req, res) => {
  Resultado.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Resultados were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Resultados."
      });
    });
};