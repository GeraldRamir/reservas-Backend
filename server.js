import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import reservasRoutes from './routes/reservas.js';
import dotenv from 'dotenv';
import colors from 'colors';

const app = express();
const server = http.createServer(app); // <- Para socket.io
const io = new Server(server, {
  cors: { origin: '*' },
});

app.use(cors());
app.use(express.json());
dotenv.config();
// Conectar a MongoDB
connectDB();

// Socket.IO disponible en todas partes
app.set('io', io);

// Rutas
app.use('/api/reservas', reservasRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(colors.cyan.bold(`Servidor funcionando en el puerto ${PORT}`));
});