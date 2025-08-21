import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as authRepository from '../repositories/auth.repository.js';
import { sendEmail } from '../utils/sendEmail.js';
export async function login(email, cnpj, senha) {
 
  const franqueado = await authRepository.findByEmailAndCnpj(email, cnpj);
  if (!franqueado) throw new Error('E-mail e/ou CNPJ inválidos');

  const senhaValida = await bcrypt.compare(senha, franqueado.senha);
  if (!senhaValida) throw new Error('Úsuario ou senha ínvalidos!');

  const token = jwt.sign(
    { id: franqueado.id, email: franqueado.email, cnpj: franqueado.cnpj },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  delete franqueado.senha;

  return { token, franqueado };
}

export async function register(nome_empresa, email, senha, cnpj, telefone) {
  
  const existeCnpj = await authRepository.findByCnpj(cnpj);
  if (existeCnpj) throw new Error('CNPJ já cadastrado');

  const existeEmail = await authRepository.findByEmail(email);
  if (existeEmail) throw new Error('E-mail já cadastrado');

  const hash = await bcrypt.hash(senha, 10);
  const id = await authRepository.create(nome_empresa, email, hash, cnpj, telefone);

  return { message: 'Franqueado cadastrado com sucesso', id };
}


export async function forgotPassword(email) {
  const user = await authRepository.findByEmail(email);
  if (!user) throw new Error('E-mail não encontrado');

  const token = Math.floor(100000 + Math.random() * 900000).toString();

  await authRepository.saveResetToken(email, token);

  await sendEmail(email, 'Redefinição de Senha - Company House', token);

  return { message: 'Token enviado para o seu email' };
}

export async function resetPassword(token, novaSenha) {
  const user = await authRepository.findByResetToken(token);
  if (!user) throw new Error('Token inválido ou expirado');

  const hash = await bcrypt.hash(novaSenha, 10);
  await authRepository.updatePassword(user.id, hash);

  return { message: 'Senha redefinida com sucesso' };
}
