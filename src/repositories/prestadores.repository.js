import { db } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

export async function findAll(franqueadoId) {
  const [rows] = await db.query(
    'SELECT * FROM prestadores WHERE franqueado_id = ?',
    [franqueadoId]
  );
  return rows;
}

export async function findById(id) {
  const [rows] = await db.query('SELECT * FROM prestadores WHERE id = ?', [id]);
  return rows[0];
}

export async function create({ nome_completo, funcao, contato, observacoes, franqueadoId }) {
  const id = uuidv4();
  await db.query(
    'INSERT INTO prestadores (id, nome_completo, funcao, contato, observacoes, franqueado_id) VALUES (?, ?, ?, ?, ?, ?)',
    [id, nome_completo, funcao, contato, observacoes, franqueadoId]
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

  const sql = `UPDATE prestadores SET ${fields.join(', ')} WHERE id = ?`;
  await db.query(sql, values);
}

export async function remove(id) {
  await db.query('DELETE FROM prestadores WHERE id = ?', [id]);
}


export async function findAllSemFiltro() {
  const [rows] = await db.query('SELECT * FROM prestadores');
  return rows;
}
