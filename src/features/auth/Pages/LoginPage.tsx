import { useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";
import AuthError from "../components/AuthError";

function LoginPage() {
  const [error, setError] = useState("");

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f5f5f5" }}
    >
      <Container maxWidth="xs">
        <Stack spacing={3}>
          <Typography variant="h4" textAlign="center" fontWeight="bold">
            Fly.id
          </Typography>

          <Typography variant="body2" textAlign="center" color="text.secondary">
            Faça login para continuar
          </Typography>

          <AuthError message={error} />

          <LoginForm onError={setError} />
        </Stack>
      </Container>
    </Box>
  );
}

export default LoginPage;