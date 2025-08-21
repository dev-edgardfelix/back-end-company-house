import { db } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

export async function findAll(franqueadoId) {
  const [rows] = await db.query(
    'SELECT * FROM fornecedores WHERE franqueado_id = ?',
    [franqueadoId]
  );
  return rows;
}

export async function findById(id) {
  const [rows] = await db.query('SELECT * FROM fornecedores WHERE id = ?', [id]);
  return rows[0];
}

export async function create({ nome_empresa, tipo_produto_servico, contato, observacoes, franqueadoId }) {
  const id = uuidv4();
  await db.query(
    `INSERT INTO fornecedores (id, nome_empresa, tipo_produto_servico, contato, observacoes, franqueado_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, nome_empresa, tipo_produto_servico, contato, observacoes, franqueadoId]
  );
  return id;
}

export async function update(id, dados) {
  const fields = [];
  const values = [];

  for (const key in dados) {
    fields.push(`${key} = ?`);
    values.push(dados[key]);
  }

  values.push(id);
  const sql = `UPDATE fornecedores SET ${fields.join(', ')} WHERE id = ?`;
  await db.query(sql, values);
}

export async function remove(id) {
  await db.query('DELETE FROM fornecedores WHERE id = ?', [id]);
}

export async function findAllSemFiltro() {
  const [rows] = await db.query('SELECT * FROM fornecedores');
  return rows;
}
