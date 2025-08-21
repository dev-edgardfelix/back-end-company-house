import * as financeiroRepository from '../repositories/financeiro.repository.js';

export async function criarFinanceiro(dados) {
  return await financeiroRepository.criarFinanceiro(dados);
}

export async function listarFinanceiro(franqueadoId) {
  return await financeiroRepository.listarFinanceiro(franqueadoId);
}

export async function buscarFinanceiroPorId(id, franqueadoId) {
  const registro = await financeiroRepository.buscarFinanceiroPorId(id);
  if (!registro || registro.franqueado_id !== franqueadoId) {
    return null;
  }
  return registro;
}

export async function atualizarFinanceiro(id, franqueadoId, dados) {
  const registro = await financeiroRepository.buscarFinanceiroPorId(id);
  if (!registro || registro.franqueado_id !== franqueadoId) {
    throw new Error('Registro não encontrado ou sem permissão');
  }
  return await financeiroRepository.atualizarFinanceiro(id, dados);
}

export async function deletarFinanceiro(id, franqueadoId) {
  const registro = await financeiroRepository.buscarFinanceiroPorId(id);
  if (!registro || registro.franqueado_id !== franqueadoId) {
    throw new Error('Registro não encontrado ou sem permissão');
  }
  return await financeiroRepository.deletarFinanceiro(id);
}
