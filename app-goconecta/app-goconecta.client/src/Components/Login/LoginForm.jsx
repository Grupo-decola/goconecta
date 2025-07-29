import React, { useState } from "react";
import LoginDTO from "../dtos/LoginDTO";

function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = new LoginDTO(form);

    try {
      const resposta = await fetch("https://localhost:7093/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        console.log("Login realizado:", dados);
        alert("Login realizado com sucesso!");

        // Aqui você pode salvar o token no localStorage, se vier
        // localStorage.setItem("token", dados.token);
      } else {
        alert("E-mail ou senha inválidos");
      }
    } catch (erro) {
      console.error("Erro ao fazer login:", erro);
      alert("Erro ao conectar com o servidor");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginForm;