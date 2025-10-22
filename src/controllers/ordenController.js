import Orden from "../models/orden.js";
import Mesa from "../models/mesa.js";

// Crear una orden
export const crearOrden = async (req, res) => {
  try {
    const { mesa, productos } = req.body;

    // Validar mesa
    const mesaExiste = await Mesa.findById(mesa);
    if (!mesaExiste) return res.status(404).json({ mensaje: "Mesa no encontrada" });

    // Calcular total
    const total = productos.reduce((acc, p) => acc + p.subtotal, 0);

    const nuevaOrden = new Orden({
      ...req.body,
      total,
    });

    await nuevaOrden.save();

    // Cambiar estado de la mesa a "ocupada"
    mesaExiste.estado = "ocupada";
    await mesaExiste.save();

    res.status(201).json(nuevaOrden);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear la orden", error });
  }
};

// Obtener todas las órdenes
export const obtenerOrdenes = async (req, res) => {
  try {
    const ordenes = await Orden.find()
      .populate("mesa")
      .populate("mesero")
      .populate("productos.productoId");
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener órdenes", error });
  }
};

// Obtener una orden por ID
export const obtenerOrdenPorId = async (req, res) => {
  try {
    const orden = await Orden.findById(req.params.id)
      .populate("mesa")
      .populate("mesero")
      .populate("productos.productoId");
    if (!orden) return res.status(404).json({ mensaje: "Orden no encontrada" });
    res.json(orden);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la orden", error });
  }
};

// Actualizar una orden (por ejemplo, cambiar estado)
export const actualizarOrden = async (req, res) => {
  try {
    const ordenActualizada = await Orden.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ordenActualizada) return res.status(404).json({ mensaje: "Orden no encontrada" });

    // Si se paga la orden, liberar la mesa
    if (req.body.estado === "pagada") {
      const mesa = await Mesa.findById(ordenActualizada.mesa);
      mesa.estado = "disponible";
      await mesa.save();
    }

    res.json(ordenActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar la orden", error });
  }
};

// Eliminar una orden
export const eliminarOrden = async (req, res) => {
  try {
    const ordenEliminada = await Orden.findByIdAndDelete(req.params.id);
    if (!ordenEliminada) return res.status(404).json({ mensaje: "Orden no encontrada" });
    res.json({ mensaje: "Orden eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la orden", error });
  }
};
