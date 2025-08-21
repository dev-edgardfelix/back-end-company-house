import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Routes
import authRoutes from './src/routes/auth.routes.js';
import prestadoresRoutes from './src/routes/prestadores.routes.js';
import obrasRoutes from './src/routes/obras.routes.js';
import materiaisRoutes from './src/routes/materiais.routes.js';
import financeiroRoutes from './src/routes/financeiro.routes.js';
import fornecedoresRoutes from './src/routes/fornecedores.routes.js';

// Middleware of erros
import { errorHandler } from './src/middlewares/error.middleware.js';

dotenv.config();
const app = express();

//CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('Unautorized',401));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/prestadores', prestadoresRoutes);
app.use('/obras', obrasRoutes);
app.use('/materiais', materiaisRoutes);
app.use('/financeiro', financeiroRoutes);
app.use('/fornecedores', fornecedoresRoutes);

// Middleware of erros
app.use(errorHandler);

export default app;
