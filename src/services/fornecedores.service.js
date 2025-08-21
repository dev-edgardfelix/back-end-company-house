import * as fornecedoresRepository from '../repositories/fornecedores.repository.js';

export async function getFornecedores(franqueadoId) {
  return await fornecedoresRepository.findAll(franqueadoId);
}

export async function createFornecedor(fornecedorData) {
  return await fornecedoresRepository.create(fornecedorData);
}

export async function updateFornecedor(id, franqueadoId, dadosAtualizados) {
  const fornecedor = await fornecedoresRepository.findById(id);
  if (!fornecedor || fornecedor.franqueado_id !== franqueadoId) {
    throw new Error('Fornecedor não encontrado ou sem permissão');
  }
  await fornecedoresRepository.update(id, dadosAtualizados);
}

export async function deleteFornecedor(id, franqueadoId) {
  const fornecedor = await fornecedoresRepository.findById(id);
  if (!fornecedor || fornecedor.franqueado_id !== franqueadoId) {
    throw new Error('Fornecedor não encontrado ou sem permissão');
  }
  await fornecedoresRepository.remove(id);
}

export async function getTodosFornecedores() {
  return await fornecedoresRepository.findAllSemFiltro();
}
