import * as obrasRepository from '../repositories/obras.repository.js';

export async function getObras(franqueadoId) {
  return await obrasRepository.findAll(franqueadoId);
}

export async function createObra(obraData) {
  return await obrasRepository.create(obraData);
}

export async function finalizarObra(id, franqueadoId) {
  const obra = await obrasRepository.findById(id);
  if (!obra || obra.franqueado_id !== franqueadoId) {
    throw new Error('Obra não encontrada ou sem permissão');
  }
  await obrasRepository.updateStatus(id, 'finalizado');
}

export async function deleteObra(id, franqueadoId) {
  const obra = await obrasRepository.findById(id);
  if (!obra || obra.franqueado_id !== franqueadoId) {
    throw new Error('Obra não encontrada ou sem permissão');
  }
  await obrasRepository.remove(id);
}

export async function updateObra(id, franqueadoId, fields) {
  const obra = await obrasRepository.findById(id);
  if (!obra || obra.franqueado_id !== franqueadoId) {
    throw new Error('Obra não encontrada ou sem permissão');
  }

  await obrasRepository.update(id, franqueadoId, fields);
}

export async function getObrasProgresso(franqueadoId) {
  const obras = await obrasRepository.getProgress(franqueadoId);

  if (obras.length === 0) {
    return { message: 'Sem obras' };
  }

  const total = obras.length;
  const finalizadas = obras.filter(o => o.status === 'finalizado').length;

  const porcentagem = Math.round((finalizadas / total) * 100);

  return { porcentagem };
}

export async function getUltimaFinalizada(franqueadoId) {
  return await obrasRepository.findUltimaFinalizada(franqueadoId);
}

export async function getProximaAndamento(franqueadoId) {
  return await obrasRepository.findProximaAndamento(franqueadoId);
}

export async function getQuantidadeAndamento(franqueadoId) {
  return await obrasRepository.countObrasAndamento(franqueadoId);
}
export async function updateProgressoObra(id, franqueadoId, progresso) {
  if (progresso < 0 || progresso > 100) {
    throw new Error('O progresso deve estar entre 0 e 100');
  }

  const obra = await obrasRepository.findById(id);
  if (!obra || obra.franqueado_id !== franqueadoId) {
    throw new Error('Obra não encontrada ou sem permissão');
  }

  await obrasRepository.updateProgress(id, franqueadoId, progresso);
}


export async function getObraProgress(id, franqueadoId) {
  const obra = await obrasRepository.getObraProgressById(id, franqueadoId);
  if (!obra) {
    throw new Error('Obra não encontrada ou sem permissão');
  }
  return obra;
}
