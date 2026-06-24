import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {

    const { email, password } = await req.json();

    const client = await clientPromise;
    const db = client.db("opellahub");

    const user = await db.collection("users").findOne({
      email,
    });

    if (!user) {
      return Response.json({
        success: false,
        message: "Usuário não encontrado.",
      });
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {
      return Response.json({
        success: false,
        message: "Senha inválida.",
      });
    }

    if (!user.verified) {
      return Response.json({
        success: false,
        message: "Conta não validada.",
      });
    }

    return Response.json({
        success: true,
        user: {
            name: user.name,
            username: user.username,
            email: user.email,
            avatar: user.avatar || null,
        },
    });

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}