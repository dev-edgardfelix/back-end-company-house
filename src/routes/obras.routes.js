import express from 'express';
import { verificarToken } from '../middlewares/auth.middleware.js';
import { getObras, createObra, finalizarObra, deleteObra,updateObra,getObrasProgresso,getUltimaFinalizada,getProximaAndamento,getQuantidadeAndamento,updateProgressoObra,getObraProgress } from '../controller/obras.controller.js';

const router = express.Router();

router.get('/', verificarToken, getObras);
router.post('/', verificarToken, createObra);
router.put('/:id/finalizar', verificarToken, finalizarObra);
router.delete('/:id', verificarToken, deleteObra);
router.put('/:id', verificarToken, updateObra);
router.get('/progresso', verificarToken, getObrasProgresso);
router.get('/ultima-finalizada', verificarToken, getUltimaFinalizada);
router.get('/proxima-andamento', verificarToken, getProximaAndamento);
router.get('/quantidade-andamento', verificarToken, getQuantidadeAndamento);
router.put('/:id/progresso', verificarToken, updateProgressoObra);
router.get('/:id/progresso', verificarToken, getObraProgress);


export default router;
