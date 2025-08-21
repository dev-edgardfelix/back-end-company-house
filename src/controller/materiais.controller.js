import * as materiaisService from '../services/materiais.service.js';

export async function getMateriais(req, res, next) {
  try {
    const materiais = await materiaisService.getMateriais(req.user.id);
    res.json(materiais);
  } catch (error) {
    next(error);
  }
}

export async function createMaterial(req, res, next) {
  try {
    const franqueadoId = req.user.id;
    const { nome, descricao, medida, quantidade, valor } = req.body;

    if (quantidade == null || isNaN(quantidade)) {
      return res.status(400).json({ message: 'Quantidade inválida' });
    }

    const id = await materiaisService.createMaterial({ 
      nome, descricao, medida, quantidade, valor, franqueadoId 
    });

    res.status(201).json({ message: 'Material cadastrado com sucesso', id });
  } catch (error) {
    next(error);
  }
}

export async function updateMaterial(req, res, next) {
  try {
    const franqueadoId = req.user.id;
    const { id } = req.params;
    const dadosAtualizados = req.body;
    await materiaisService.updateMaterial(id, franqueadoId, dadosAtualizados);
    res.json({ message: 'Material atualizado com sucesso' });
  } catch (error) {
    next(error);
  }
}

export async function deleteMaterial(req, res, next) {
  try {
    const franqueadoId = req.user.id;
    const { id } = req.params;
    await materiaisService.deleteMaterial(id, franqueadoId);
    res.json({ message: 'Material removido' });
  } catch (error) {
    next(error);
  }
}
