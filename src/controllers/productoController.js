import Producto from "../models/producto.js";
import { subirImagen, eliminarImagen, extraerPublicId } from "../config/cloudinary.js";


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

    // Eliminar imagen de Cloudinary si existe
    if (producto.imagen) {
      const publicId = extraerPublicId(producto.imagen);
      if (publicId) {
        try {
          await eliminarImagen(publicId);
        } catch (cloudinaryError) {
          console.error("Error al eliminar imagen de Cloudinary:", cloudinaryError);
          // Continuamos con la eliminación del producto aunque falle la imagen
        }
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
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Eliminar imagen anterior de Cloudinary si existe
    if (producto.imagen) {
      const oldPublicId = extraerPublicId(producto.imagen);
      if (oldPublicId) {
        try {
          await eliminarImagen(oldPublicId);
        } catch (cloudinaryError) {
          console.error("Error al eliminar imagen anterior:", cloudinaryError);
          // Continuamos con la subida de la nueva imagen
        }
      }
    }

    // Subir nueva imagen a Cloudinary
    const result = await subirImagen(req.file.buffer, 'productos');
    
    // Guardar URL de Cloudinary en el producto
    producto.imagen = result.url;
    await producto.save();

    res.json({
      message: "Imagen subida correctamente",
      imagen: result.url,
      producto,
    });
  } catch (error) {
    console.error("Error al subir imagen:", error);
    res.status(500).json({ 
      message: "Error al subir la imagen", 
      error: error.message 
    });
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

    // Eliminar imagen de Cloudinary
    const publicId = extraerPublicId(producto.imagen);
    if (publicId) {
      try {
        await eliminarImagen(publicId);
      } catch (cloudinaryError) {
        console.error("Error al eliminar de Cloudinary:", cloudinaryError);
        // Continuamos actualizando el producto aunque falle la eliminación
      }
    }

    // Actualizar producto
    producto.imagen = "";
    await producto.save();

    res.json({ message: "Imagen eliminada correctamente", producto });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la imagen", error });
  }
};
