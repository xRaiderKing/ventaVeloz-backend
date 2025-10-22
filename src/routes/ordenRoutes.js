import express from "express";
import {
  crearOrden,
  obtenerOrdenes,
  obtenerOrdenPorId,
  actualizarOrden,
  eliminarOrden,
} from "../controllers/ordenController.js";

const router = express.Router();

router.post("/", crearOrden);
router.get("/", obtenerOrdenes);
router.get("/:id", obtenerOrdenPorId);
router.put("/:id", actualizarOrden);
router.delete("/:id", eliminarOrden);

export default router;
