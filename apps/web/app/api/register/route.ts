import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {

  try {

    const data = await req.json();

    const client = await clientPromise;

    const db = client.db("opellahub");

    const result = await db.collection("users").insertOne({
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      verified: false,
      code: data.code,
      createdAt: new Date(),
    });

    return Response.json({
      success: true,
      insertedId: result.insertedId,
    });

  } catch (error) {

    console.error("REGISTER ERROR:", error);

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