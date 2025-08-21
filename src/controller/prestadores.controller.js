import * as prestadoresService from '../services/prestadores.service.js';

export async function getPrestadores(req, res, next) {
  try {
    const prestadores = await prestadoresService.getPrestadores(req.user.id);
    res.json(prestadores);
  } catch (error) {
    next(error);
  }
}

export async function createPrestador(req, res, next) {
  try {
    const franqueadoId = req.user.id;
    const { nome_completo, funcao, contato, observacoes } = req.body;
    const id = await prestadoresService.createPrestador({ nome_completo, funcao, contato, observacoes, franqueadoId });
    res.status(201).json({ message: 'Prestador cadastrado com sucesso', id });
  } catch (error) {
    next(error);
  }
}

export async function updatePrestador(req, res, next) {
  try {
    const franqueadoId = req.user.id;
    const { id } = req.params;
    const dadosAtualizados = req.body;
    await prestadoresService.updatePrestador(id, franqueadoId, dadosAtualizados);
    res.json({ message: 'Prestador atualizado com sucesso' });
  } catch (error) {
    next(error);
  }
}

export async function deletePrestador(req, res, next) {
  try {
    const franqueadoId = req.user.id;
    const { id } = req.params;
    await prestadoresService.deletePrestador(id, franqueadoId);
    res.json({ message: 'Prestador removido' });
  } catch (error) {
    next(error);
  }
}

export async function getTodosPrestadores(req, res, next) {
  try {
    const prestadores = await prestadoresService.getTodosPrestadores();
    res.json(prestadores);
  } catch (error) {
    next(error);
  }
}
