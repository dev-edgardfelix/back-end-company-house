import express from 'express';
import { verificarToken } from '../middlewares/auth.middleware.js';
import { getMateriais, createMaterial, updateMaterial, deleteMaterial } from '../controller/materiais.controller.js';

const router = express.Router();

router.get('/', verificarToken, getMateriais);
router.post('/', verificarToken, createMaterial);
router.put('/:id', verificarToken, updateMaterial);
router.delete('/:id', verificarToken, deleteMaterial);

export default router;
