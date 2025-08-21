import * as financeiroService from '../services/financeiro.service.js';

export async function criarFinanceiro(req, res) {
  try {
    const franqueadoId = req.user.id;
    const { servico, valor, mes_execucao, ano_execucao } = req.body;

    await financeiroService.criarFinanceiro({
      franqueadoId,
      servico,
      valor,
      mes_execucao,
      ano_execucao
    });

    return res.status(201).json({ message: 'Registro financeiro criado com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar registro financeiro:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function listarFinanceiro(req, res) {
  try {
    const franqueadoId = req.user.id;
    const dados = await financeiroService.listarFinanceiro(franqueadoId);
    return res.json(dados);
  } catch (error) {
    console.error('Erro ao listar registros financeiros:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function buscarFinanceiroPorId(req, res) {
  try {
    const franqueadoId = req.user.id;
    const { id } = req.params;
    const registro = await financeiroService.buscarFinanceiroPorId(id, franqueadoId);
    if (!registro) {
      return res.status(404).json({ error: 'Registro não encontrado' });
    }
    return res.json(registro);
  } catch (error) {
    console.error('Erro ao buscar registro financeiro:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function atualizarFinanceiro(req, res) {
  try {
    const franqueadoId = req.user.id;
    const { id } = req.params;
    const dados = req.body;
    await financeiroService.atualizarFinanceiro(id, franqueadoId, dados);
    return res.json({ message: 'Registro atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar registro financeiro:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export async function deletarFinanceiro(req, res) {
  try {
    const franqueadoId = req.user.id;
    const { id } = req.params;
    await financeiroService.deletarFinanceiro(id, franqueadoId);
    return res.json({ message: 'Registro deletado com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar registro financeiro:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
