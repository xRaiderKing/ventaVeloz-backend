import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema(
  {
    mesa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mesa",
      required: true,
    },
    mesero: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    productos: [
      {
        nombre: {
          type: String,
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
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
    metodoPago: {
      type: String,
      enum: ["efectivo", "tarjeta", "transferencia"],
      default: "efectivo",
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Índices para mejorar consultas
ventaSchema.index({ fecha: -1 });
ventaSchema.index({ mesero: 1 });
ventaSchema.index({ mesa: 1 });

const Venta = mongoose.model("Venta", ventaSchema);
export default Venta;
