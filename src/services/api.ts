import { auth } from "./firebase";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";

export async function getUserMe() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error(
      "Usuário não está logado."
    );
  }

  const token =
    await user.getIdToken();

  const response = await fetch(
    `${API_URL}/users/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Erro ao buscar dados do usuário."
    );
  }

  return response.json();
}