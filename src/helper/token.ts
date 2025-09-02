import { JWTPayload, jwtVerify, SignJWT } from "jose";

interface MyPayload extends JWTPayload {
  email: string;
  name: string;
}

export async function generateJwt(payload: MyPayload) {
  const secret = new TextEncoder().encode(process.env.SECRET_JWT_KEY);

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);

  return token;
}

export async function verifyJwt(token: string) {
  const secret = new TextEncoder().encode(process.env.SECRET_JWT_KEY);

  try {
    const { payload } = await jwtVerify(token, secret);
    return { valid: true, payload };
  } catch (err) {
    return { valid: false, error: err };
  }
}
