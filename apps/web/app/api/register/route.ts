import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {

  try {

    const data = await req.json();

    const client = await clientPromise;

    const db = client.db("opellahub");

    // Verifica se já existe usuário com o mesmo e-mail
    const existingUser = await db
      .collection("users")
      .findOne({
        email: data.email,
      });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Este e-mail já está cadastrado.",
        },
        {
          status: 400,
        }
      );
    }

    // Criptografa a senha
    const hashedPassword =
      await bcrypt.hash(
        data.password,
        10
      );

    const result = await db
      .collection("users")
      .insertOne({
        name: data.name,
        username: data.username,
        email: data.email,

        // senha criptografada
        password: hashedPassword,

        verified: false,
        code: data.code,
        createdAt: new Date(),
      });

    return Response.json({
      success: true,
      insertedId: result.insertedId,
    });

  } catch (error) {

    console.error(
      "REGISTER ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}
