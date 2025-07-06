const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/api/send-pdf-email', async (req, res) => {
  const { pdfData, fileName, recipient } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'carlosplucinski1@gmail.com',
        pass: 'gapprpdzzsgklxdj' // senha de app gerada no Google
      },
    });

    const base64String = pdfData.split(',')[1];

    const mailOptions = {
      from: 'carlosplucinski1@gmail.com', // deve ser igual ao user
      to: recipient,
      subject: 'Seu currículo em PDF',
      text: 'Segue o currículo em anexo.',
      attachments: [
        {
          filename: fileName,
          content: base64String,
          encoding: 'base64',
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'E-mail enviado com sucesso!' });

  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ error: 'Erro ao enviar e-mail.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});
