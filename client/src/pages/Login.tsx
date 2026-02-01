import { useState } from "react";
import apiFetch from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("role", data.user.role);
    login(data.accessToken);
    navigate("/dashboard");
  };

  return (
    <div className="container py-5">
      <h1>Login</h1>

      <form onSubmit={handleLogin} className="col-md-4">
        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}
