import * as prestadoresRepository from '../repositories/prestadores.repository.js';

export async function getPrestadores(franqueadoId) {
  return await prestadoresRepository.findAll(franqueadoId);
}

export async function createPrestador(prestadorData) {
  return await prestadoresRepository.create(prestadorData);
}

export async function updatePrestador(id, franqueadoId, dadosAtualizados) {
  const prestador = await prestadoresRepository.findById(id);
  if (!prestador || prestador.franqueado_id !== franqueadoId) {
    throw new Error('Prestador não encontrado ou sem permissão');
  }
  await prestadoresRepository.update(id, dadosAtualizados);
}

export async function deletePrestador(id, franqueadoId) {
  const prestador = await prestadoresRepository.findById(id);
  if (!prestador || prestador.franqueado_id !== franqueadoId) {
    throw new Error('Prestador não encontrado ou sem permissão');
  }
  await prestadoresRepository.remove(id);
}

export async function getTodosPrestadores() {
  return await prestadoresRepository.findAllSemFiltro();
}
