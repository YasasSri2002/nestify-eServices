'use server'
import { jwtDecode } from "jwt-decode";

interface TokenPayLoad {
  exp?: number;
}

export async function IsExpired(token: string): Promise<boolean> {
  try {
    const decodedToken = jwtDecode<TokenPayLoad>(token);
    return decodedToken.exp ? decodedToken.exp * 1000 < Date.now() : true;
  } catch {
    return true;
  }
}