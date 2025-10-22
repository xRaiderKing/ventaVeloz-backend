import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";

// Proteger rutas - verificar token
export const proteger = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Obtener token del header
      token = req.headers.authorization.split(" ")[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener usuario del token (sin contraseña)
      req.usuario = await Usuario.findById(decoded.id).select("-contrasena");

      if (!req.usuario) {
        return res.status(401).json({ mensaje: "No autorizado, usuario no encontrado" });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ mensaje: "No autorizado, token inválido" });
    }
  }

  if (!token) {
    res.status(401).json({ mensaje: "No autorizado, no hay token" });
  }
};

// Verificar si es admin
export const esAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.rol === "admin") {
    next();
  } else {
    res.status(403).json({ mensaje: "Acceso denegado. Solo administradores" });
  }
};
