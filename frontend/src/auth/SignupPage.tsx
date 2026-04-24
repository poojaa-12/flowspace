import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await signup(email, password, displayName);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Display name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button type="submit">Create account</button>
    </form>
  );
};

export default SignupPage;

