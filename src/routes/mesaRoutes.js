import express from "express";
import {
  crearMesa,
  obtenerMesas,
  obtenerMesaPorId,
  actualizarMesa,
  eliminarMesa,
} from "../controllers/mesaController.js";

const router = express.Router();

router.post("/", crearMesa);
router.get("/", obtenerMesas);
router.get("/:id", obtenerMesaPorId);
router.put("/:id", actualizarMesa);
router.delete("/:id", eliminarMesa);

export default router;
