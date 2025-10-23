import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Rutas
import productosRoutes from './src/routes/productoRoutes.js'
import mesaRoutes from './src/routes/mesaRoutes.js'
import ordenRoutes from './src/routes/ordenRoutes.js'
import usuarioRoutes from './src/routes/usuarioRoutes.js'
import ventaRoutes from './src/routes/ventaRoutes.js'
// Cargar variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (imágenes de productos)
app.use('/uploads', express.static('uploads'));

// Conectar a la base de datos
connectDB();

// Rutas de la API
app.use("/api/productos", productosRoutes);
app.use("/api/mesas", mesaRoutes);
app.use("/api/ordenes", ordenRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/ventas", ventaRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
