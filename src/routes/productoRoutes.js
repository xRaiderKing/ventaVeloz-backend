import express from "express";
import {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
  subirImagenProducto,
  eliminarImagenProducto,
} from "../controllers/productoController.js";

import { proteger, esAdmin } from "../middleware/authMiddleware.js";
import { upload } from "../config/multer.js";

const router = express.Router();

// Rutas CRUD
router.post("/", proteger, esAdmin, crearProducto); // Crear
router.get("/", proteger, obtenerProductos); // Leer todos
router.get("/:id", proteger, obtenerProductoPorId); // Leer uno
router.put("/:id", proteger, esAdmin, actualizarProducto); // Actualizar
router.delete("/:id", proteger, esAdmin, eliminarProducto); // Eliminar

// Rutas de imágenes
router.post("/:id/imagen", proteger, esAdmin, upload.single("imagen"), subirImagenProducto); // Subir imagen
router.delete("/:id/imagen", proteger, esAdmin, eliminarImagenProducto); // Eliminar imagen

export default router;
