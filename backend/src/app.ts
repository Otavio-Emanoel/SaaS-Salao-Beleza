import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';

// Configuração do Firebase
import './config/firebase';

// Importa as rotas
import clientRoutes from './routes/clientRoutes';
import adminRoutes from './routes/adminRoutes';
import professionalRoutes from './routes/professionalRoutes';
import scheduleRoutes from './routes/scheduleRoutes';
import salonRoutes from './routes/salonRoutes';
import authRoutes from './routes/authRoutes';
import serviceRoutes from './routes/serviceRoutes';

const app: Application = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota para clientes
app.use('/api/client', clientRoutes);

// Rota para profissionais
app.use('/api/professional', professionalRoutes);

// Rota para administradores
app.use('/api/admin', adminRoutes);

// Rota para salões
app.use('/api/salons', salonRoutes);

// Rota para autenticação
app.use('/api/auth', authRoutes);

// Rota para agendamentos
app.use('/api/schedules', scheduleRoutes);

// Rota para serviços
app.use('/api/services', serviceRoutes);

// Rota padrão para checar se servidor está rodando
app.get('/', (req: Request, res: Response) => {
  res.send('API do SaaS de agendamento de salões está funcionando!');
});


export default app;
