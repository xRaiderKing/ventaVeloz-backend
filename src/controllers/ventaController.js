import Venta from "../models/venta.js";

// Crear nueva venta
export const crearVenta = async (req, res) => {
  try {
    const { mesa, mesero, productos, total, metodoPago, fecha } = req.body;

    const nuevaVenta = new Venta({
      mesa,
      mesero,
      productos,
      total,
      metodoPago: metodoPago || "efectivo",
      fecha: fecha || new Date(),
    });

    const ventaGuardada = await nuevaVenta.save();

    // Popular los datos de mesa y mesero
    await ventaGuardada.populate("mesa");
    await ventaGuardada.populate("mesero", "nombre correo");

    res.status(201).json(ventaGuardada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear la venta" });
  }
};

// Obtener todas las ventas
export const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate("mesa", "numero")
      .populate("mesero", "nombre correo")
      .sort({ fecha: -1 });

    res.json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener las ventas" });
  }
};

// Obtener ventas por rango de fechas
export const obtenerVentasPorFecha = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;

    if (!fechaInicio || !fechaFin) {
      return res
        .status(400)
        .json({ mensaje: "Se requieren fechaInicio y fechaFin" });
    }

    const ventas = await Venta.find({
      fecha: {
        $gte: new Date(fechaInicio),
        $lte: new Date(fechaFin),
      },
    })
      .populate("mesa", "numero")
      .populate("mesero", "nombre correo")
      .sort({ fecha: -1 });

    res.json(ventas);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener las ventas por fecha" });
  }
};

// Obtener estadísticas de ventas
export const obtenerEstadisticas = async (req, res) => {
  try {
    const { fecha } = req.query;
    let filtroFecha = {};

    if (fecha) {
      const fechaConsulta = new Date(fecha);
      const inicioDia = new Date(fechaConsulta.setHours(0, 0, 0, 0));
      const finDia = new Date(fechaConsulta.setHours(23, 59, 59, 999));

      filtroFecha = {
        fecha: {
          $gte: inicioDia,
          $lte: finDia,
        },
      };
    }

    const ventas = await Venta.find(filtroFecha);

    const totalVentas = ventas.reduce((sum, venta) => sum + venta.total, 0);
    const cantidadVentas = ventas.length;
    const promedioVenta = cantidadVentas > 0 ? totalVentas / cantidadVentas : 0;

    // Agrupar por mesero
    const ventasPorMesero = ventas.reduce((acc, venta) => {
      const meseroId = venta.mesero.toString();
      if (!acc[meseroId]) {
        acc[meseroId] = {
          total: 0,
          cantidad: 0,
        };
      }
      acc[meseroId].total += venta.total;
      acc[meseroId].cantidad += 1;
      return acc;
    }, {});

    res.json({
      totalVentas,
      cantidadVentas,
      promedioVenta,
      ventasPorMesero,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener estadísticas" });
  }
};

// Obtener venta por ID
export const obtenerVentaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const venta = await Venta.findById(id)
      .populate("mesa", "numero capacidad ubicacion")
      .populate("mesero", "nombre correo");

    if (!venta) {
      return res.status(404).json({ mensaje: "Venta no encontrada" });
    }

    res.json(venta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener la venta" });
  }
};

// Obtener ventas por mesero
export const obtenerVentasPorMesero = async (req, res) => {
  try {
    const { meseroId } = req.params;

    const ventas = await Venta.find({ mesero: meseroId })
      .populate("mesa", "numero")
      .sort({ fecha: -1 });

    res.json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener ventas del mesero" });
  }
};
