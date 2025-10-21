import mongoose from "mongoose";

const mesaSchema = new mongoose.Schema({
  numero: {
    type: Number,
    required: true,
    unique: true,
  },
  capacidad: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    enum: ["disponible", "ocupada", "reservada"],
    default: "disponible",
  },
  ubicacion: {
    type: String,
    default: "interior", // o "terraza", etc.
  },
  meseroAsignado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario", // Asignar que mesero esta atendiendo esa mesa
    default: null,
  },
});

const Mesa = mongoose.model("Mesa", mesaSchema);
export default Mesa;
