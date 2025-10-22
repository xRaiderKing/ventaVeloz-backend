import express from "express";
import {
  crearMesa,
  obtenerMesas,
  obtenerMesaPorId,
  actualizarMesa,
  eliminarMesa,
} from "../controllers/mesaController.js";
import { esAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", esAdmin, crearMesa);
router.get("/", obtenerMesas);
router.get("/:id", obtenerMesaPorId);
router.put("/:id", actualizarMesa);
router.delete("/:id", esAdmin, eliminarMesa);

export default router;
