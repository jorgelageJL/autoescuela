const db = require("../models");
const Alumno = db.Alumno;
const Profesor = db.Profesor;
const Administrador = db.Administrador;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "AVeryStrongPassword";

// LOGIN
exports.signin = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).send({ message: "Email, password, and role required." });
  }

  let userModel;

  if (role === "alumno") userModel = Alumno;
  else if (role === "profesor") userModel = Profesor;
  else if (role === "admin") userModel = Administrador;
  else return res.status(400).send({ message: "Invalid role" });

  try {
    const user = await userModel.findOne({ where: { email: email } });
    if (!user) return res.status(404).send({ message: "User not found" });

    // Verificar password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(401).send({ message: "Invalid password" });

    // Generar token
    const token = jwt.sign(
      { id: user.id || user.id_alumno || user.id_profesor || user.id_admin, role: role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.send({
      id: user.id || user.id_alumno || user.id_profesor || user.id_admin,
      email: user.email,
      role: role,
      token: token
    });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};