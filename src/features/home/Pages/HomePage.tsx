import { Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../auth/services/firebaseAuth";
import { useAuth } from "../../auth/hooks/useAuth";
import Header from "../../auth/components/Header";
import { useIntl } from "react-intl";

function HomePage() {
  const { user, loading } = useAuth();
  const intl = useIntl();

  if (loading) return <p>Carregando...</p>;

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Header showLogout onLogout={handleLogout} />

      <div style={{ padding: "32px 24px" }}>
        <Typography variant="h5">
          {intl.formatMessage(
            { id: "home.welcome" },
            { name: user?.displayName ?? user?.email ?? "Usuário" }
          )}
        </Typography>
      </div>
    </div>
  );
}

export default HomePage;