import express from "express";
import {
  crearOrden,
  obtenerOrdenes,
  obtenerOrdenPorId,
  actualizarOrden,
  eliminarOrden,
} from "../controllers/ordenController.js";
<<<<<<< HEAD
import { proteger } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", proteger, crearOrden);
router.get("/", proteger, obtenerOrdenes);
router.get("/:id", proteger, obtenerOrdenPorId);
router.put("/:id", proteger, actualizarOrden);
router.delete("/:id", proteger, eliminarOrden);
=======

const router = express.Router();

router.post("/", crearOrden);
router.get("/", obtenerOrdenes);
router.get("/:id", obtenerOrdenPorId);
router.put("/:id", actualizarOrden);
router.delete("/:id", eliminarOrden);
>>>>>>> c3f965d4d770e2488edd6a975c5a34ea863b974d

export default router;
