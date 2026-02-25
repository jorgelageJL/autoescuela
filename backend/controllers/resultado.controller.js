const db = require("../models");
const Resultado = db.Resultado;

// Retrieve all Resultados from the database.
exports.findAll = (req, res) => {
  Resultado.findAll()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Resultados."
      });
    });
};

// Find Alumno by id_test
exports.findAlumnoByIdTest = (req, res) => {
  Alumno.findByPk(req.params.id, {
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

// Find Test by id_alumno
exports.findTestByIdAlumno = (req, res) => {
  Test.findByPk(req.params.id, {
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

// Find a single Resultado by ids
exports.findOne = (req, res) => {
  const id_test = req.params.id_test;
  const id_alumno = req.params.id_alumno;

  Resultado.findOne({ where: { id_test: id_test, id_alumno: id_alumno } })
    .then(data => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
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

// Create a new Resultado
exports.create = async (req, res) => {
  if (!req.body.id_test || !req.body.id_alumno || req.body.nota < 0) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  try {
    const data = await Resultado.create(req.body);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error creating Test"
    });
  }
};

exports.upsert = async (req, res) => {
  try {
    await Resultado.upsert(req.body);

    res.status(200).send({
      message: "Resultado created or updated successfully."
    });
  } catch (error) {
    res.status(500).send({
      message: "Error saving Resultado."
    });
  }
};

// // Update Resultado by id
// exports.update = (req, res) => {
//   const id_test = req.params.id_test;
//   const id_alumno = req.params.id_alumno;
//   console.log(req.body)

//   Resultado.update(req.body, {
//     where: { id_test: id_test, id_alumno: id_alumno }
//   })
//     .then(([num]) => {
//       if (num === 1) {
//         res.send({
//           message: "Resultado was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update Resultado with id_test=${id_test} and id_alumno=${id_alumno}. Maybe Resultado was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: `Error updating Resultado with id_test=${id_test} and id_alumno=${id_alumno}.`
//       });
//     });
// };

// Delete Resultado by id
exports.delete = (req, res) => {
  const id_test = req.params.id_test;
  const id_alumno = req.params.id_alumno;

  Resultado.destroy({
    where: { id_test: id_test, id_alumno: id_alumno }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Resultado was deleted successfully!"
        });
      } else {
        res.status(400).send({
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
      res.status(200).send({ message: `${nums} Resultados were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Resultados."
      });
    });
};