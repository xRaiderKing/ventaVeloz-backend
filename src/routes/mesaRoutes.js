import express from "express";
import {
  crearMesa,
  obtenerMesas,
  obtenerMesaPorId,
  actualizarMesa,
  eliminarMesa,
} from "../controllers/mesaController.js";
<<<<<<< HEAD
import { proteger, esAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", proteger, esAdmin, crearMesa);
router.get("/", proteger, obtenerMesas);
router.get("/:id", proteger, obtenerMesaPorId);
router.put("/:id", proteger, actualizarMesa);
router.delete("/:id", proteger, esAdmin, eliminarMesa);
=======
import { esAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", esAdmin, crearMesa);
router.get("/", obtenerMesas);
router.get("/:id", obtenerMesaPorId);
router.put("/:id", actualizarMesa);
router.delete("/:id", esAdmin, eliminarMesa);
>>>>>>> c3f965d4d770e2488edd6a975c5a34ea863b974d

export default router;
