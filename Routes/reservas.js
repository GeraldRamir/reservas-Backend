import express from 'express';
import Reserva from '../models/Reserva.js';

const reservasRoutes = express.Router();

router.post('/', async (req, res) => {
  try {
    const nueva = new Reserva(req.body);
    await nueva.save();

    // Emitir evento a los clientes conectados
    const io = req.app.get('io');
    io.emit('nueva-reserva', nueva); // Puedes emitir a todos

    res.status(201).json({ message: 'Reserva enviada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar reserva' });
  }
});

router.get('/', async (req, res) => {
  try {
    const reservas = await Reserva.find().sort({ creadoEn: -1 });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reservas' });
  }
});

export default reservasRoutes;
