import express from "express";
import {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/productoController.js";

const router = express.Router();

// Rutas CRUD
router.post("/", crearProducto); // Crear
router.get("/", obtenerProductos); // Leer todos
router.get("/:id", obtenerProductoPorId); // Leer uno
router.put("/:id", actualizarProducto); // Actualizar
router.delete("/:id", eliminarProducto); // Eliminar

export default router;
