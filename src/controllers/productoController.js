import Producto from "../models/producto.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};


export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};


export const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};


export const actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!productoActualizado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};


export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Eliminar imagen si existe
    if (producto.imagen) {
      const imagePath = path.join(__dirname, "../../", producto.imagen);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Producto.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};

// Subir imagen de producto
export const subirImagenProducto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No se proporcionó ninguna imagen" });
    }

    const producto = await Producto.findById(id);
    if (!producto) {
      // Eliminar archivo subido si el producto no existe
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Eliminar imagen anterior si existe
    if (producto.imagen) {
      const oldImagePath = path.join(__dirname, "../../", producto.imagen);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Guardar ruta de la nueva imagen
    const imagePath = `uploads/productos/${req.file.filename}`;
    producto.imagen = imagePath;
    await producto.save();

    res.json({
      message: "Imagen subida correctamente",
      imagen: imagePath,
      producto,
    });
  } catch (error) {
    // Si hay error, eliminar archivo subido
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: "Error al subir la imagen", error });
  }
};

// Eliminar imagen de producto
export const eliminarImagenProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    if (!producto.imagen) {
      return res.status(400).json({ message: "El producto no tiene imagen" });
    }

    // Eliminar archivo del servidor
    const imagePath = path.join(__dirname, "../../", producto.imagen);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Actualizar producto
    producto.imagen = "";
    await producto.save();

    res.json({ message: "Imagen eliminada correctamente", producto });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la imagen", error });
  }
};
