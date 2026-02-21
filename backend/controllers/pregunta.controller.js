const db = require("../models");
const Pregunta = db.Pregunta;
const Op = db.Sequelize.Op;
const fs = require("fs");
const path = require("path");
// const utils = require("../utils.js");

// Create a new Pregunta
exports.create = (req, res) => {
  // Validate request
  if (!req.body.enunciado || !req.body.opcion_a || !req.body.opcion_b ||
    !req.body.opcion_c || !req.body.respuesta || !req.body.tema || !req.body.id_test) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Pregunta
  const pregunta = {
    enunciado: req.body.enunciado,
    opcion_a: req.body.opcion_a,
    opcion_b: req.body.opcion_b,
    opcion_c: req.body.opcion_c,
    respuesta: req.body.respuesta,
    tema: req.body.tema,
    filename: req.file ? req.file.filename : "default.jpg",
    id_test: req.body.id_test
  };

  // Pregunta.findOne({ where: { dni: Pregunta.dni } })
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

  // Save new Pregunta in the database
  Pregunta.create(pregunta)
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
          err.message || "Some error occurred while creating the Pregunta."
      });
    });
};

// Retrieve all Preguntas from the database.
exports.findAll = (req, res) => {
  Pregunta.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Preguntas."
      });
    });
};

// Find a single Pregunta by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pregunta.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.send({
          message: `Pregunta with id=${id} was not found.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Pregunta with id=" + id
      });
    });
};

// Find a Pregunta by Test
exports.findAllByTest = (req, res) => {
  // Validate request
  // if (!req.body.id_test) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  Pregunta.findAll({ where: { id_test: req.params.id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving a Pregunta."
      });
    });
};

// Update Pregunta by id
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const pregunta = await Pregunta.findByPk(id);
    if (!pregunta) {
      return res.status(404).send({ message: "Pregunta not found." });
    }

    // Armamos el objeto con los campos que sí se envían
    let updatedData = { ...req.body };

    // si llega archivo, actualizar filename
    if (req.file) {
      // si hay nueva imagen, eliminar la anterior
      if (pregunta.filename) {
        const oldImagePath = path.join(__dirname, '..', 'public', 'images', pregunta.filename);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Error deleting old image:", err);
          else console.log("Old image deleted:", pregunta.filename);
        });
      }
      updatedData.filename = req.file.filename;
    }

    const [num] = await Pregunta.update(updatedData, {
      where: { id_pregunta: id }
    });

    if (num === 1) {
      res.send({
        message: "Pregunta was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Pregunta with id=${id}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Pregunta with id=" + id
    });
  }
};

// Delete Pregunta by id
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    // 1. Buscar la bicicleta
    const pregunta = await Pregunta.findByPk(id);
    if (!pregunta) {
      return res.status(404).send({
        message: `Pregunta with id=${id} not found.`
      });
    }

    // 2. Si tiene imagen, borrarla del sistema de archivos
    if (pregunta.filename) {
      const imagePath = path.join(__dirname, "../public/images", pregunta.filename);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("🗑 Imagen eliminada:", pregunta.filename);
      } else {
        console.log("⚠️ Imagen no encontrada en disco:", imagePath);
      }
    }

    // Borrar registro
    const num = await Pregunta.destroy({
      where: { id_pregunta: id }
    });

    if (num === 1) {
      res.send({
        message: "Pregunta was deleted successfully."
      });
    } else {
      res.status(404).send({
        message: `Cannot delete Pregunta with id=${id}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error deleting Pregunta with id=" + id
    });
  }
};

// Delete all Preguntas from the database.
exports.deleteAll = (req, res) => {
  Pregunta.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Preguntas were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Preguntas."
      });
    });
};