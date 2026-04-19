import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { login } from '../services/firebaseAuth';
import ForgotPasswordModal from './ForgotPasswordModal';

// Props recebidas pelo componente
type Props = {
  onError: (message: string) => void;
};

// Formulário de login com campos de e-mail, senha e recuperação de senha
function LoginForm({ onError }: Props) {
  const intl = useIntl();

  // Estados dos campos do formulário
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  // Controla a visibilidade do modal de recuperação de senha
  const [forgotOpen, setForgotOpen] = useState(false);

  // Realiza o login e redireciona para /home em caso de sucesso
  const handleLogin = async () => {
    try {
      await login(email, password);
      window.location.href = '/home';
    } catch (error: unknown) {
      // Extrai o código de erro do Firebase e repassa ao componente pai
      const code = (error as { code?: string }).code ?? '';
      onError(code);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Título da seção traduzido */}
      <Typography variant="h6" sx={{ fontWeight: 500 }}>
        {intl.formatMessage({ id: 'login.title' })}
      </Typography>

      {/* Campo de e-mail */}
      <TextField
        label={intl.formatMessage({ id: 'login.email' })}
        value={email}
        onChange={e => setEmail(e.target.value)}
        fullWidth
      />

      {/* Campo de senha */}
      <TextField
        label={intl.formatMessage({ id: 'login.password' })}
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Botão de envio do formulário */}
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#43A047' } }}
        >
          {intl.formatMessage({ id: 'login.submit' })}
        </Button>

        {/* Botão que abre o modal de recuperação de senha */}
        <Button
          variant="text"
          size="small"
          onClick={() => setForgotOpen(true)}
          sx={{ fontSize: 11, color: 'text.secondary' }}
        >
          {intl.formatMessage({ id: 'login.forgot' })}
        </Button>

        {/* Modal de recuperação de senha */}
        <ForgotPasswordModal
          open={forgotOpen}
          onClose={() => setForgotOpen(false)}
        />
      </div>
    </div>
  );
}

export default LoginForm;