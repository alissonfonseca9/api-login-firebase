import { useState } from "react";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { getUserMe } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState<any>(null);

  const [errorMessage, setErrorMessage] = useState("");

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const carregarPerfil = async () => {
    setErrorMessage("");

    try {
      const data = await getUserMe();

      console.log(data);

      setProfileData(data);
    } catch (error) {
      console.error(error);

      setErrorMessage("Não foi possível carregar os dados do usuário.");
    }
  };

  return (
    <div>
      <h1>Usuário Logado</h1>

      <p>
        <strong>Email:</strong> {auth.currentUser?.email}
      </p>

      <button onClick={carregarPerfil}>Carregar Perfil via NestJS</button>

      <br />
      <br />

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {profileData && (
        <div>
          <h2>Perfil vindo do Firestore</h2>

          <p>
            <strong>Nome:</strong> {profileData.name}
          </p>

          <p>
            <strong>Email:</strong> {profileData.email}
          </p>

          <p>
            <strong>UID:</strong> {profileData.uid}
          </p>

          <p>
            <strong>Criado em:</strong> {profileData.createdAt}
          </p>
        </div>
      )}

      <button onClick={logout}>Sair</button>
    </div>
  );
}

export default Dashboard;
