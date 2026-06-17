import nodemailer from "nodemailer";

export async function POST(req: Request) {

  try {

    const { email, code } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"OpellaHub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Código de verificação - OpellaHub",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Bem-vindo ao OpellaHub</h2>

          <p>Seu código de verificação é:</p>

          <h1 style="
            color:#0b3d2e;
            letter-spacing:4px;
          ">
            ${code}
          </h1>

          <p>
            Utilize este código para concluir o cadastro.
          </p>

          <p>
            Caso você não tenha solicitado este cadastro,
            ignore este e-mail.
          </p>
        </div>
      `,
    });

    return Response.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Erro ao enviar email",
      },
      {
        status: 500,
      }
    );
  }
}