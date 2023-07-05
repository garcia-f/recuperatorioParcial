const ctrlReservas = {};
const Reserva = require('../models/Reserva')

// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
ctrlReservas.obtenerReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({
            where: {
                estado: true
            }
        });

        return res.json(reservas);
    } catch (error) {
        console.log('Error al obtener las reservas', error);
        return res.status(500).json({
            message: 'Error al obtener las reservas'
        })
    }
}

// Obtener una reserva
ctrlReservas.obtenerReserva = async (req, res) => {
    const { id } = req.params;

    try {
        const reserva = await Reserva.findOne({
            where: {
                id,
                estado: true
            }
        });

        if (!reserva) {
            throw ({
                status: 404,
                message: 'No existe la reserva'
            })
        }
    
        return res.json(reserva);

    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}

// Crear una reserva
ctrlReservas.crearReserva = async (req, res) => {
    const { nombre, apellido, email, fecha_salida, fecha_llegada, telefono, codigo } = req.body;

    try {
        const reserva = await Reserva.create({
            nombre,
            apellido,
            email,
            telefono,
            fecha_salida,
            fecha_llegada,
            codigo
        });

        if (!reserva) {
            throw ({
                status: 400,
                message: 'No se pudo realizar la reserva'
            })
        }

        return res.json(reserva);
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}

// Actualizar una reserva
ctrlReservas.actualizarReserva = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, fecha_salida, fecha_llegada, telefono, codigo } = req.body;
    
    try {
        const reservaActualizada = await Reserva.update({
            nombre,
            apellido,
            email,
            telefono,
            fecha_salida,
            fecha_llegada,
            codigo
        }, {
            where: {
                id,
                estado: true
            }
        });

        if (!reservaActualizada) {
            throw ({
                status: 400,
                message: 'No se pudo actualizar la reserva'
            })
        }

        return res.json({
            message: 'Reserva actualizada correctamente',
            reservaActualizada
            
        });
    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}

// Eliminar una reserva de forma lógica
ctrlReservas.eliminarReserva = async (req, res) => {
    const { id } = req.params;

    try {
        const reservaEliminada = await Reserva.update({
            estado: false
        }, {
            where: {
                id,
                estado: true
            }
        });

        if (!reservaEliminada) {
            throw ({
                status: 400,
                message: 'No se pudo eliminar la reserva'
            })
        }

         return res.json({
         message: 'Reserva eliminada correctamente',
         reservaEliminada
     });
    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}

module.exports = ctrlReservas;