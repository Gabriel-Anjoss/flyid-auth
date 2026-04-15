import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { login } from "../services/firebaseAuth";

type Props = {
  onError: (message: string) => void;
};

function LoginForm({ onError }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      window.location.href = "/home";
    } catch (error: any) {
  console.log(error.code); // 👈 importante
  console.log(error.message);
  onError("Email ou senha inválidos");
}
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />

      <TextField
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <Button variant="contained" size="large" fullWidth onClick={handleLogin}>
        Entrar
      </Button>
    </Stack>
  );
}

export default LoginForm;