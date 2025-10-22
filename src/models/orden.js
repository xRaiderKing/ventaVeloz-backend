import mongoose from "mongoose";

const ordenSchema = new mongoose.Schema({
  mesa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mesa",
    required: true,
  },
  mesero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario", // lo agregaremos después
    required: false,
  },
  productos: [
    {
      productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true,
      },
      nombre: String,
      cantidad: {
        type: Number,
        required: true,
        min: 1,
      },
      precioUnitario: {
        type: Number,
        required: true,
      },
      subtotal: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    enum: ["pendiente", "en preparación", "servida", "pagada", "cancelada"],
    default: "pendiente",
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Orden = mongoose.model("Orden", ordenSchema);
export default Orden;
