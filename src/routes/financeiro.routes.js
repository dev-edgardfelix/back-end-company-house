import express from 'express';
import { verificarToken } from '../middlewares/auth.middleware.js';
import {
  criarFinanceiro,
  listarFinanceiro,
  buscarFinanceiroPorId,
  atualizarFinanceiro,
  deletarFinanceiro
} from '../controller/financeiro.controller.js';

const router = express.Router();

router.post('/', verificarToken, criarFinanceiro);
router.get('/', verificarToken, listarFinanceiro);
router.get('/:id', verificarToken, buscarFinanceiroPorId);
router.put('/:id', verificarToken, atualizarFinanceiro);
router.delete('/:id', verificarToken, deletarFinanceiro);

export default router;
