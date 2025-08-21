import { db } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

export async function findAll(franqueadoId) {
  const [rows] = await db.query(
    `SELECT id, funcao, local, prestador_nome, prestador_contato, status, data_inicio, data_finalizacao,progresso,observacoes
     FROM obras WHERE franqueado_id = ?`,
    [franqueadoId]
  );
  return rows;
}

export async function findById(id) {
  const [rows] = await db.query('SELECT * FROM obras WHERE id = ?', [id]);
  return rows[0];
}

export async function create({ funcao, local, prestador_nome, prestador_contato, observacoes, franqueadoId }) {
  const id = uuidv4();

  await db.query(
    `INSERT INTO obras (id, franqueado_id, funcao, local, prestador_nome, prestador_contato, observacoes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, franqueadoId, funcao, local, prestador_nome, prestador_contato, observacoes]
  );

  return id;
}

export async function updateStatus(id, status) {
  let sql, params;

  if (status === 'finalizado') {
    sql = `UPDATE obras 
           SET status = ?, progresso = 100, data_finalizacao = CURRENT_TIMESTAMP 
           WHERE id = ?`;
    params = [status, id];
  } else {
    sql = `UPDATE obras SET status = ? WHERE id = ?`;
    params = [status, id];
  }

  await db.query(sql, params);
}


export async function remove(id) {
  await db.query('DELETE FROM obras WHERE id = ?', [id]);
}

export async function update(id, franqueadoId, fields) {
  const keys = Object.keys(fields);
  if (keys.length === 0) return;

  const setClause = keys.map(key => `${key} = ?`).join(', ');
  const values = keys.map(key => fields[key]);

  await db.query(
    `UPDATE obras SET ${setClause} WHERE id = ? AND franqueado_id = ?`,
    [...values, id, franqueadoId]
  );
}

export async function getProgress(franqueadoId) {
  const [rows] = await db.query(
    `SELECT status FROM obras WHERE franqueado_id = ?`,
    [franqueadoId]
  );
  return rows;
}

export async function findUltimaFinalizada(franqueadoId) {
  const [rows] = await db.query(
    `SELECT funcao, data_finalizacao
     FROM obras
     WHERE franqueado_id = ? AND status = 'finalizado'
     ORDER BY data_finalizacao DESC
     LIMIT 1`,
    [franqueadoId]
  );
  return rows[0] || null;
}

export async function findProximaAndamento(franqueadoId) {
  const [rows] = await db.query(
    `SELECT funcao, data_inicio
     FROM obras
     WHERE franqueado_id = ? AND status = 'andamento'
     ORDER BY data_inicio DESC
     LIMIT 1`,
    [franqueadoId]
  );
  return rows[0] || null;
}

export async function countObrasAndamento(franqueadoId) {
  const [rows] = await db.query(
    `SELECT COUNT(*) AS total
     FROM obras
     WHERE franqueado_id = ? AND status = 'andamento'`,
    [franqueadoId]
  );
  return rows[0].total || 0;
}

export async function updateProgress(id, franqueadoId, progresso) {
  if (progresso === 100) {
 
    await db.query(
      `UPDATE obras 
       SET progresso = ?, status = 'finalizado', data_finalizacao = CURRENT_TIMESTAMP
       WHERE id = ? AND franqueado_id = ?`,
      [progresso, id, franqueadoId]
    );
  } else {
  
    await db.query(
      `UPDATE obras 
       SET progresso = ? 
       WHERE id = ? AND franqueado_id = ?`,
      [progresso, id, franqueadoId]
    );
  }
}


export async function getObraProgressById(id, franqueadoId) {
  const [rows] = await db.query(
    `SELECT id, funcao, progresso 
     FROM obras 
     WHERE id = ? AND franqueado_id = ?`,
    [id, franqueadoId]
  );
  return rows[0] || null;
}
