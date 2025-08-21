import { db } from '../config/db.js';

export async function criarFinanceiro({ franqueadoId, servico, valor, mes_execucao, ano_execucao }) {
  const query = `
    INSERT INTO financeiro (id, franqueado_id, servico, valor, mes_execucao, ano_execucao)
    VALUES (UUID(), ?, ?, ?, ?, ?)
  `;
  const [result] = await db.query(query, [franqueadoId, servico, valor, mes_execucao, ano_execucao]);
  return result;
}

export async function listarFinanceiro(franqueadoId) {
  const query = `SELECT * FROM financeiro WHERE franqueado_id = ?`;
  const [rows] = await db.query(query, [franqueadoId]);
  return rows;
}

export async function buscarFinanceiroPorId(id) {
  const query = `SELECT * FROM financeiro WHERE id = ?`;
  const [rows] = await db.query(query, [id]);
  return rows[0];
}

export async function atualizarFinanceiro(id, { servico, valor, mes_execucao, ano_execucao }) {
  const query = `
    UPDATE financeiro
    SET servico = ?, valor = ?, mes_execucao = ?, ano_execucao = ?
    WHERE id = ?
  `;
  const [result] = await db.query(query, [servico, valor, mes_execucao, ano_execucao, id]);
  return result;
}

export async function deletarFinanceiro(id) {
  const query = `DELETE FROM financeiro WHERE id = ?`;
  const [result] = await db.query(query, [id]);
  return result;
}
