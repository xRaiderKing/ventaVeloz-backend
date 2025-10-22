import express from "express";
import {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/productoController.js";
import { esAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rutas CRUD
router.post("/", esAdmin,crearProducto); // Crear
router.get("/", obtenerProductos); // Leer todos
router.get("/:id", obtenerProductoPorId); // Leer uno
router.put("/:id", esAdmin,actualizarProducto); // Actualizar
router.delete("/:id", esAdmin,eliminarProducto); // Eliminar

export default router;
