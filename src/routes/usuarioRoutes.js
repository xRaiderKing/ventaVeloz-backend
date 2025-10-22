import express from "express";
import {
  registrarUsuario,
  loginUsuario,
  obtenerPerfil,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/usuarioController.js";
import { proteger, esAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rutas públicas
router.post("/registro", registrarUsuario); // Registrar nuevo usuario
router.post("/login", loginUsuario); // Login

// Rutas protegidas (requieren autenticación)
router.get("/perfil", proteger, obtenerPerfil); // Obtener perfil del usuario autenticado

// Rutas de administración (requieren autenticación + rol admin)
router.get("/", proteger, esAdmin, obtenerUsuarios); // Obtener todos los usuarios
router.get("/:id", proteger, esAdmin, obtenerUsuarioPorId); // Obtener usuario por ID
router.put("/:id", proteger, esAdmin, actualizarUsuario); // Actualizar usuario
router.delete("/:id", proteger, esAdmin, eliminarUsuario); // Eliminar usuario

export default router;
