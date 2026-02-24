const db = require("../models");
const Resultado = db.Resultado;
const Test = db.Test;
const Alumno = db.Alumno;
const Op = db.Sequelize.Op;


/* =========================
   CREATE
========================= */

exports.create = (req, res) => {

  if (!req.body.id_test || !req.body.id_alumno || req.body.nota == null) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const resultado = {
    id_test: req.body.id_test,
    id_alumno: req.body.id_alumno,
    nota: req.body.nota
  };

  Resultado.create(resultado)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error creating Resultado."
      });
    });
};


/* =========================
   FIND ALL (por alumno)
========================= */

exports.findAll = (req, res) => {

  const id_alumno = req.query.id_alumno;

  let condition = id_alumno ? { id_alumno: id_alumno } : null;

  Resultado.findAll({
    where: condition,
    include: [{
      model: Test,
      attributes: ["nombre"]
    }],
    order: [["fecha", "DESC"]]
  })
  .then(data => res.send(data))
  .catch(err => {
    res.status(500).send({
      message: err.message || "Error retrieving Resultados."
    });
  });
};


/* =========================
   FIND ONE
========================= */

exports.findOne = (req, res) => {

  const id_test = req.params.id_test;
  const id_alumno = req.params.id_alumno;

  Resultado.findOne({
    where: {
      id_test: id_test,
      id_alumno: id_alumno
    },
    include: [{
      model: Test,
      attributes: ["nombre"]
    }]
  })
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: "Resultado not found."
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving Resultado."
    });
  });
};


/* =========================
   UPDATE
========================= */

exports.update = (req, res) => {

  const id_test = req.params.id_test;
  const id_alumno = req.params.id_alumno;

  Resultado.update(req.body, {
    where: { id_test: id_test, id_alumno: id_alumno }
  })
  .then(num => {
    if (num == 1) {
      res.send({ message: "Resultado updated successfully." });
    } else {
      res.send({
        message: "Resultado not found or body empty."
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Resultado."
    });
  });
};


/* =========================
   DELETE
========================= */

exports.delete = (req, res) => {

  const id_test = req.params.id_test;
  const id_alumno = req.params.id_alumno;

  Resultado.destroy({
    where: { id_test: id_test, id_alumno: id_alumno }
  })
  .then(num => {
    if (num == 1) {
      res.send({ message: "Resultado deleted successfully!" });
    } else {
      res.send({ message: "Resultado not found!" });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error deleting Resultado."
    });
  });
};


/* =========================
   DELETE ALL
========================= */

exports.deleteAll = (req, res) => {

  Resultado.destroy({
    where: {},
    truncate: false
  })
  .then(nums => {
    res.send({ message: `${nums} Resultados deleted successfully!` });
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Error deleting Resultados."
    });
  });
};