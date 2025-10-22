import express from "express";
import {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/productoController.js";
<<<<<<< HEAD
import { proteger, esAdmin } from "../middleware/authMiddleware.js";
=======
import { esAdmin } from "../middleware/authMiddleware.js";
>>>>>>> c3f965d4d770e2488edd6a975c5a34ea863b974d

const router = express.Router();

// Rutas CRUD
<<<<<<< HEAD
router.post("/", proteger, esAdmin,crearProducto); // Crear
router.get("/", proteger, obtenerProductos); // Leer todos
router.get("/:id", proteger, obtenerProductoPorId); // Leer uno
router.put("/:id", proteger, esAdmin,actualizarProducto); // Actualizar
router.delete("/:id", proteger, esAdmin,eliminarProducto); // Eliminar
=======
router.post("/", esAdmin,crearProducto); // Crear
router.get("/", obtenerProductos); // Leer todos
router.get("/:id", obtenerProductoPorId); // Leer uno
router.put("/:id", esAdmin,actualizarProducto); // Actualizar
router.delete("/:id", esAdmin,eliminarProducto); // Eliminar
>>>>>>> c3f965d4d770e2488edd6a975c5a34ea863b974d

export default router;
