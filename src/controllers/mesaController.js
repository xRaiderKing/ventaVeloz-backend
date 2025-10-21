import Mesa from "../models/mesa.js";

// Crear una mesa
export const crearMesa = async (req, res) => {
  try {
    const nuevaMesa = new Mesa(req.body);
    await nuevaMesa.save();
    res.status(201).json(nuevaMesa);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear la mesa", error });
  }
};

// Obtener todas las mesas
export const obtenerMesas = async (req, res) => {
  try {
    const mesas = await Mesa.find().populate("meseroAsignado");
    res.json(mesas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las mesas", error });
  }
};

// Obtener una mesa por ID
export const obtenerMesaPorId = async (req, res) => {
  try {
    const mesa = await Mesa.findById(req.params.id).populate("meseroAsignado");
    if (!mesa) return res.status(404).json({ mensaje: "Mesa no encontrada" });
    res.json(mesa);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la mesa", error });
  }
};

// Actualizar una mesa
export const actualizarMesa = async (req, res) => {
  try {
    const mesaActualizada = await Mesa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mesaActualizada) return res.status(404).json({ mensaje: "Mesa no encontrada" });
    res.json(mesaActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar la mesa", error });
  }
};

// Eliminar una mesa
export const eliminarMesa = async (req, res) => {
  try {
    const mesaEliminada = await Mesa.findByIdAndDelete(req.params.id);
    if (!mesaEliminada) return res.status(404).json({ mensaje: "Mesa no encontrada" });
    res.json({ mensaje: "Mesa eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la mesa", error });
  }
};
