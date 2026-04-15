import { Button, Stack, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../auth/services/firebaseAuth";
import { useAuth } from "../../auth/hooks/useAuth";

function HomePage() {
  const { user, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

 

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <Stack spacing={2} alignItems="center" mt={10}>
      <Typography variant="h5">Bem-vindo!</Typography>

      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Stack>
  );
}

export default HomePage;