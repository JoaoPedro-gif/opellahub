import nodemailer from "nodemailer";

export async function POST(req: Request) {

  const { email, code } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "SEUEMAIL@gmail.com",
      pass: "SENHA-APP"
    }
  });

  await transporter.sendMail({
    from: "OpellaHub",
    to: email,
    subject: "Código de confirmação",
    text: `Seu código é: ${code}`
  });

  return Response.json({ success: true });
}
