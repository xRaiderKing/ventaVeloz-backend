import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
    },
    categoria: {
      type: String,
      required: [true, "La categoría es obligatoria"],
      trim: true,
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
    },
    disponible: {
      type: Boolean,
      default: true,
    },
    imagen: {
      type: String, // Puedes guardar aquí la URL de Firebase o un path local
      default: "",
    },
  },
  {
    timestamps: true, 
  }
);

const Producto = mongoose.model("Producto", productoSchema);

export default Producto;
