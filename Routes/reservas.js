import express from 'express';
import Reserva from '../models/Reserva.js';

const router = express.Router(); // Cambié a "router"

router.post('/', async (req, res) => {
  try {
    const nueva = new Reserva(req.body);
    await nueva.save();

    const io = req.app.get('io');
    io.emit('nueva-reserva', nueva);

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

export default router;
