import Usuario from "../models/usuario.js";
import jwt from "jsonwebtoken";

// Generar token JWT
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Registrar nuevo usuario
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contrasena, rol } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExiste = await Usuario.findOne({ correo });
    if (usuarioExiste) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    // Crear usuario
    const usuario = await Usuario.create({
      nombre,
      correo,
      contrasena,
      rol,
    });

    if (usuario) {
      res.status(201).json({
        _id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
        token: generarToken(usuario._id),
      });
    }
  } catch (error) {
    res.status(400).json({ mensaje: "Error al registrar usuario", error: error.message });
  }
};

// Login de usuario
export const loginUsuario = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    // Buscar usuario y incluir contraseña
    const usuario = await Usuario.findOne({ correo }).select("+contrasena");

    if (!usuario) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    // Verificar contraseña
    const contrasenaCorrecta = await usuario.compararContrasena(contrasena);

    if (!contrasenaCorrecta) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    // Verificar si el usuario está activo
    if (!usuario.activo) {
      return res.status(401).json({ mensaje: "Usuario desactivado" });
    }

    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      token: generarToken(usuario._id),
    });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al iniciar sesión", error: error.message });
  }
};

// Obtener perfil de usuario autenticado
export const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario._id);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener perfil", error: error.message });
  }
};

// Obtener todos los usuarios (solo admin)
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuarios", error: error.message });
  }
};

// Obtener un usuario por ID
export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuario", error: error.message });
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Actualizar campos
    usuario.nombre = req.body.nombre || usuario.nombre;
    usuario.correo = req.body.correo || usuario.correo;
    usuario.rol = req.body.rol || usuario.rol;
    usuario.activo = req.body.activo !== undefined ? req.body.activo : usuario.activo;

    // Si se proporciona nueva contraseña
    if (req.body.contrasena) {
      usuario.contrasena = req.body.contrasena;
    }

    const usuarioActualizado = await usuario.save();

    res.json({
      _id: usuarioActualizado._id,
      nombre: usuarioActualizado.nombre,
      correo: usuarioActualizado.correo,
      rol: usuarioActualizado.rol,
      activo: usuarioActualizado.activo,
    });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar usuario", error: error.message });
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar usuario", error: error.message });
  }
};
