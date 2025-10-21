import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Rutas
import productosRoutes from './src/routes/productoRoutes.js'
import mesaRoutes from './src/routes/mesaRoutes.js'
// Cargar variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas de prueba
app.use("/api/productos", productosRoutes);
app.use("/api/mesas", mesaRoutes)

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
