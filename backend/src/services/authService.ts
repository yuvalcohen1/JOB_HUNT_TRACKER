import sql from "../db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const SALT_ROUNDS = 10;

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

function mapRow(row: any): User {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    createdAt: row.created_at,
  };
}

export async function registerUser(
  email: string,
  password: string,
  name: string,
): Promise<User> {
  const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
  if (existing.length > 0) {
    throw new Error("EMAIL_TAKEN");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const [row] = await sql`
    INSERT INTO users (email, password, name)
    VALUES (${email}, ${hashedPassword}, ${name})
    RETURNING id, email, name, created_at
  `;

  return mapRow(row);
}

export async function loginUser(
  email: string,
  password: string,
): Promise<{ user: User; token: string }> {
  const [row] = await sql`SELECT * FROM users WHERE email = ${email}`;
  if (!row) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const passwordMatch = await bcrypt.compare(password, row.password);
  if (!passwordMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const user = mapRow(row);
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

  return { user, token };
}
