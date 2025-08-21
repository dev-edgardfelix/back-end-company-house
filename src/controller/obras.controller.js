import * as obrasService from '../services/obras.service.js';

export async function getObras(req, res, next) {
  try {
    const obras = await obrasService.getObras(req.user.id);
    res.json(obras);
  } catch (error) {
    next(error);
  }
}

export async function createObra(req, res, next) {
  try {
    const franqueadoId = req.user.id;
    const { funcao, local, prestador_nome, prestador_contato, observacoes } = req.body;
    const id = await obrasService.createObra({ funcao, local, prestador_nome, prestador_contato, observacoes, franqueadoId });
    res.status(201).json({ message: 'Obra adicionada com sucesso', id });
  } catch (error) {
    next(error);
  }
}

export async function finalizarObra(req, res, next) {
  try {
    const franqueadoId = req.user.id;
    const { id } = req.params;
    await obrasService.finalizarObra(id, franqueadoId);
    res.json({ message: 'Obra finalizada' });
  } catch (error) {
    next(error);
  }
}

export async function deleteObra(req, res, next) {
  try {
    const franqueadoId = req.user.id;
    const { id } = req.params;
    await obrasService.deleteObra(id, franqueadoId);
    res.json({ message: 'Obra removida' });
  } catch (error) {
    next(error);
  }
}

export async function updateObra(req, res, next) {
  try {
    const franqueadoId = req.user.id;
    const { id } = req.params;
    const fields = req.body; 

    await obrasService.updateObra(id, franqueadoId, fields);
    res.json({ message: 'Obra atualizada com sucesso' });
  } catch (error) {
    next(error);
  }
}
export async function getObrasProgresso(req, res, next) {
  try {
    const franqueadoId = req.user.id;
    const progresso = await obrasService.getObrasProgresso(franqueadoId);
    res.json(progresso);
  } catch (error) {
    next(error);
  }
}


export async function getUltimaFinalizada(req, res, next) {
  try {
    const franqueadoId = req.user.id;
    const obra = await obrasService.getUltimaFinalizada(franqueadoId);

    if (!obra) {
      return res.json({ message: 'Nenhuma obra finalizada encontrada' });
    }

    res.json({
      titulo: "Última Conclusão",
      funcao: obra.funcao,
      concluido: obra.data_finalizacao
    });
  } catch (error) {
    next(error);
  }
}

export async function getProximaAndamento(req, res, next) {
  try {
    const franqueadoId = req.user.id;
    const obra = await obrasService.getProximaAndamento(franqueadoId);

    if (!obra) {
      return res.json({ message: 'Nenhuma obra em andamento encontrada' });
    }

    res.json({
      titulo: "Próxima Etapa",
      funcao: obra.funcao,
      inicio: obra.data_inicio
    });
  } catch (error) {
    next(error);
  }
}


export async function getQuantidadeAndamento(req, res, next) {
  try {
    const franqueadoId = req.user.id;
    const quantidade = await obrasService.getQuantidadeAndamento(franqueadoId);

    res.json({
      titulo: "Obras que precisam ser finalizadas",
      quantidade
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProgressoObra(req, res, next) {
  try {
    const franqueadoId = req.user.id;
    const { id } = req.params;
    const { progresso } = req.body;

    await obrasService.updateProgressoObra(id, franqueadoId, progresso);

    if (progresso === 100) {
      return res.json({ message: 'Progresso atualizado para 100% e obra finalizada automaticamente' });
    }

    res.json({ message: 'Progresso da obra atualizado com sucesso' });
  } catch (error) {
    next(error);
  }
}



export async function getObraProgress(req, res, next) {
  try {
    const franqueadoId = req.user.id;
    const { id } = req.params;
    const obra = await obrasService.getObraProgress(id, franqueadoId);
    res.json(obra);
  } catch (error) {
    next(error);
  }
}
