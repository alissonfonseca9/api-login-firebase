import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../services/firebase";
import { useNavigate } from "react-router-dom";

import "../styles/auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!name.trim()) {
      alert("Digite seu nome.");
      return;
    }

    if (!email.trim()) {
      alert("Digite seu email.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    if (!strongPassword.test(password)) {
      alert(
        "A senha deve conter:\n\n" +
          "- 8 caracteres\n" +
          "- 1 letra maiúscula\n" +
          "- 1 letra minúscula\n" +
          "- 1 número\n" +
          "- 1 caractere especial",
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name: name,
        email: email,
        createdAt: new Date().toISOString(),
      });

      alert("Usuário criado com sucesso!");

      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Cadastro</h1>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="btn btn-login" onClick={register}>
          Cadastrar
        </button>

        <p className="link" onClick={() => navigate("/")}>
          Já possui conta? Entrar
        </p>
      </div>
    </div>
  );
}

export default Register;
