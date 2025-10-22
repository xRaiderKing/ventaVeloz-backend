import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    correo: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Por favor ingresa un correo válido"],
    },
    contrasena: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
      select: false, // No se devuelve por defecto en las consultas
    },
    rol: {
      type: String,
      enum: ["mesero", "admin"],
      default: "mesero",
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Encriptar contraseña antes de guardar
usuarioSchema.pre("save", async function (next) {
  // Solo encriptar si la contraseña fue modificada
  if (!this.isModified("contrasena")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.contrasena = await bcrypt.hash(this.contrasena, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
usuarioSchema.methods.compararContrasena = async function (contrasenaIngresada) {
  return await bcrypt.compare(contrasenaIngresada, this.contrasena);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
