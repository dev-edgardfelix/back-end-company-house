import * as fornecedoresService from '../services/fornecedores.service.js';

export async function getFornecedores(req, res, next) {
  try {
    const fornecedores = await fornecedoresService.getFornecedores(req.user.id);
    res.json(fornecedores);
  } catch (error) {
    next(error);
  }
}

export async function createFornecedor(req, res, next) {
  try {
    const franqueadoId = req.user.id;
    const { nome_empresa, tipo_produto_servico, contato, observacoes } = req.body;
    const id = await fornecedoresService.createFornecedor({
      nome_empresa,
      tipo_produto_servico,
      contato,
      observacoes,
      franqueadoId
    });
    res.status(201).json({ message: 'Fornecedor cadastrado com sucesso', id });
  } catch (error) {
    next(error);
  }
}

export async function updateFornecedor(req, res, next) {
  try {
    const franqueadoId = req.user.id;
    const { id } = req.params;
    const dadosAtualizados = req.body;
    await fornecedoresService.updateFornecedor(id, franqueadoId, dadosAtualizados);
    res.json({ message: 'Fornecedor atualizado com sucesso' });
  } catch (error) {
    next(error);
  }
}

export async function deleteFornecedor(req, res, next) {
  try {
    const franqueadoId = req.user.id;
    const { id } = req.params;
    await fornecedoresService.deleteFornecedor(id, franqueadoId);
    res.json({ message: 'Fornecedor removido' });
  } catch (error) {
    next(error);
  }
}

export async function getTodosFornecedores(req, res, next) {
  try {
    const fornecedores = await fornecedoresService.getTodosFornecedores();
    res.json(fornecedores);
  } catch (error) {
    next(error);
  }
}
