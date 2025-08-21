import * as materiaisRepository from '../repositories/materiais.repository.js';

export async function getMateriais(franqueadoId) {
  return await materiaisRepository.findAll(franqueadoId);
}

export async function createMaterial(materialData) {
  return await materiaisRepository.create(materialData);
}

export async function updateMaterial(id, franqueadoId, dadosAtualizados) {
  const material = await materiaisRepository.findById(id);
  if (!material || material.franqueado_id !== franqueadoId) {
    throw new Error('Material não encontrado ou sem permissão');
  }
  await materiaisRepository.update(id, dadosAtualizados);
}

export async function deleteMaterial(id, franqueadoId) {
  const material = await materiaisRepository.findById(id);
  if (!material || material.franqueado_id !== franqueadoId) {
    throw new Error('Material não encontrado ou sem permissão');
  }
  await materiaisRepository.remove(id);
}
