import { Alert } from "@mui/material";

type Props = {
  message: string;
};

function AuthError({ message }: Props) {
  if (!message) return null;

  return <Alert severity="error">{message}</Alert>;
}

export default AuthError;