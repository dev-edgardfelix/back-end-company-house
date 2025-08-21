import nodemailer from 'nodemailer';

export async function sendEmail(to, subject, token) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #2C3E50; text-align: center;">🔐 Redefinição de Senha</h2>
      <p>Olá,</p>
      <p>Recebemos uma solicitação para redefinir sua senha no sistema <strong>Company House</strong>.</p>
      <p>Use o código abaixo para concluir a redefinição:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="font-size: 28px; font-weight: bold; color: #3498db;">${token}</span>
      </div>
      <p style="color: #e74c3c;">⚠ Este código expira em 15 minutos.</p>
      <p>Se você não solicitou a redefinição, ignore este email.</p>
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #7f8c8d; text-align: center;">
        Company House © ${new Date().getFullYear()} - Todos os direitos reservados.
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Company House" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html: htmlContent
  });
}
