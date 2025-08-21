import express from 'express';
import { verificarToken } from '../middlewares/auth.middleware.js';
import { getPrestadores, createPrestador, updatePrestador, deletePrestador,getTodosPrestadores } from '../controller/prestadores.controller.js';

const router = express.Router();

router.get('/', verificarToken, getPrestadores);
router.post('/', verificarToken, createPrestador);
router.put('/:id', verificarToken, updatePrestador);
router.delete('/:id', verificarToken, deletePrestador);
router.get('/all', verificarToken, getTodosPrestadores);

export default router;
