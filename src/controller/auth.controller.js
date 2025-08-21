import * as authService from '../services/auth.service.js';

export async function login(req, res, next) {
  try {
    const { email, cnpj, senha } = req.body;
    const result = await authService.login(email, cnpj, senha);
    res.json(result);
  } catch (error) {
    next(error);
  }
}


export async function register(req, res, next) {
  try {
    const { nome_empresa, email, senha, cnpj, telefone } = req.body;
    const result = await authService.register(nome_empresa, email, senha, cnpj, telefone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const { token, novaSenha } = req.body;
    const result = await authService.resetPassword(token, novaSenha);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
