import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

function PrivateRoute({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;