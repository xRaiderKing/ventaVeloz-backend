import express from "express";
import {
  crearVenta,
  obtenerVentas,
  obtenerVentasPorFecha,
  obtenerEstadisticas,
  obtenerVentaPorId,
  obtenerVentasPorMesero,
} from "../controllers/ventaController.js";
import { proteger, esAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rutas protegidas - requieren autenticación
router.post("/", proteger, crearVenta); // Crear venta (meseros y admin)
router.get("/", proteger, esAdmin, obtenerVentas); // Obtener todas las ventas (solo admin)
router.get("/fecha", proteger, esAdmin, obtenerVentasPorFecha); // Filtrar por fecha (solo admin)
router.get("/estadisticas", proteger, esAdmin, obtenerEstadisticas); // Estadísticas (solo admin)
router.get("/mesero/:meseroId", proteger, obtenerVentasPorMesero); // Ventas de un mesero
router.get("/:id", proteger, esAdmin, obtenerVentaPorId); // Obtener venta por ID (solo admin)

export default router;
