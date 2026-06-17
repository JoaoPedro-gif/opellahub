import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {

  const data = await req.json();

  const client = await clientPromise;
  const db = client.db("opellahub");

  await db.collection("users").insertOne({
    name: data.name,
    username: data.username,
    email: data.email,
    password: data.password,
    verified: false,
    code: data.code,
    createdAt: new Date()
  });

  return Response.json({ success: true });
}