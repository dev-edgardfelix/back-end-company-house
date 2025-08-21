import { db } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

export async function findByEmailAndCnpj(email, cnpj) {
  const [rows] = await db.query(
    'SELECT * FROM franqueados WHERE email = ? AND cnpj = ?',
    [email, cnpj]
  );
  return rows[0];
}

export async function create(nome_empresa, email, senhaHash, cnpj, telefone) {
  const id = uuidv4(); 
  const [result] = await db.query(
    'INSERT INTO franqueados (id, nome_empresa, email, senha, cnpj, telefone) VALUES (?, ?, ?, ?, ?, ?)',
    [id, nome_empresa, email, senhaHash, cnpj, telefone]
  );
  return id;  
}

export async function findByEmail(email) {
  const [rows] = await db.query('SELECT * FROM franqueados WHERE email = ?', [email]);
  return rows[0];
}

export async function findByCnpj(cnpj) {
  const [rows] = await db.query('SELECT * FROM franqueados WHERE cnpj = ?', [cnpj]);
  return rows[0];
}

export async function saveResetToken(email, token) {
  const expireTime = new Date(Date.now() + 15 * 60 * 1000);
  await db.query(
    'UPDATE franqueados SET reset_token = ?, reset_token_expire = ? WHERE email = ?',
    [token, expireTime, email]
  );
}

export async function findByResetToken(token) {
  const [rows] = await db.query(
    'SELECT * FROM franqueados WHERE reset_token = ? AND reset_token_expire > NOW()',
    [token]
  );
  return rows[0];
}

export async function updatePassword(id, senhaHash) {
  await db.query(
    'UPDATE franqueados SET senha = ?, reset_token = NULL, reset_token_expire = NULL WHERE id = ?',
    [senhaHash, id]
  );
}
