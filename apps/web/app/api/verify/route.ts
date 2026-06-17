import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {

  try {

    const { email, code } =
      await req.json();

    const client =
      await clientPromise;

    const db =
      client.db("opellahub");

    const user =
      await db
        .collection("users")
        .findOne({
          email,
        });

    if (!user) {
      return Response.json({
        success: false,
        message:
          "Usuário não encontrado.",
      });
    }

    if (user.code !== code) {
      return Response.json({
        success: false,
        message:
          "Código inválido.",
      });
    }

    await db
      .collection("users")
      .updateOne(
        {
          email,
        },
        {
          $set: {
            verified: true,
          },
        }
      );

    return Response.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        success: false,
        message:
          "Erro ao validar código.",
      },
      {
        status: 500,
      }
    );
  }
}