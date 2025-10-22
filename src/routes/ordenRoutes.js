import express from "express";
import {
  crearOrden,
  obtenerOrdenes,
  obtenerOrdenPorId,
  actualizarOrden,
  eliminarOrden,
} from "../controllers/ordenController.js";
import { proteger } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", proteger, crearOrden);
router.get("/", proteger, obtenerOrdenes);
router.get("/:id", proteger, obtenerOrdenPorId);
router.put("/:id", proteger, actualizarOrden);
router.delete("/:id", proteger, eliminarOrden);

export default router;
