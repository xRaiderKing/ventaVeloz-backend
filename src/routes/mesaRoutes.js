import express from "express";
import {
  crearMesa,
  obtenerMesas,
  obtenerMesaPorId,
  actualizarMesa,
  eliminarMesa,
} from "../controllers/mesaController.js";

import { proteger, esAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", proteger, esAdmin, crearMesa);
router.get("/", proteger, obtenerMesas);
router.get("/:id", proteger, obtenerMesaPorId);
router.put("/:id", proteger, actualizarMesa);
router.delete("/:id", proteger, esAdmin, eliminarMesa);

export default router;
