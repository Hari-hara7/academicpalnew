// lib/hash.ts
import bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hashed: string) {
  return await bcrypt.compare(password, hashed);
}
