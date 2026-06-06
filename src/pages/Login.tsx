import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
const googleIcon =
  "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const loginGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);

      navigate("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const resetPassword = async () => {
    if (!email) {
      alert("Digite seu email primeiro.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);

      alert("Email de recuperação enviado.");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Faça seu Login</h1>
        <h1>Entrar</h1>

        <p className="subtitle">Acesse sua conta</p>

        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-login" onClick={login}>
          Entrar
        </button>
        <div className="divider">ou</div>

        <button className="btn btn-google" onClick={loginGoogle}>
          Entrar com Google
        </button>

        <p className="link" onClick={resetPassword}>
          Esqueci minha senha
        </p>

        <p className="link" onClick={() => navigate("/cadastro")}>
          Não possui conta? Cadastre-se
        </p>
      </div>
    </div>
  );
}

export default Login;
