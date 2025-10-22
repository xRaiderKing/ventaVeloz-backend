import express from "express";
import {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/productoController.js";

import { proteger, esAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rutas CRUD
router.post("/", proteger, esAdmin,crearProducto); // Crear
router.get("/", proteger, obtenerProductos); // Leer todos
router.get("/:id", proteger, obtenerProductoPorId); // Leer uno
router.put("/:id", proteger, esAdmin,actualizarProducto); // Actualizar
router.delete("/:id", proteger, esAdmin,eliminarProducto); // Eliminar

export default router;
