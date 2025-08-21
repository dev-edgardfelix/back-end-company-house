import express from 'express';
import { verificarToken } from '../middlewares/auth.middleware.js';
import {
  getFornecedores,
  createFornecedor,
  updateFornecedor,
  deleteFornecedor,
  getTodosFornecedores
} from '../controller/fornecedores.controller.js';

const router = express.Router();

router.get('/', verificarToken, getFornecedores);
router.post('/', verificarToken, createFornecedor);
router.put('/:id', verificarToken, updateFornecedor);
router.delete('/:id', verificarToken, deleteFornecedor);
router.get('/all', verificarToken, getTodosFornecedores);

export default router;
