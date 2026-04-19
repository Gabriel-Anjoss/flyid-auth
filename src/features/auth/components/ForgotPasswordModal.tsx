import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Button, Typography,
} from '@mui/material';
import { useIntl } from 'react-intl';
import { resetPassword } from '../services/firebaseAuth';

// Props recebidas pelo modal
interface Props {
  open: boolean;
  onClose: () => void;
}

// Modal de recuperação de senha — envia e-mail via Firebase Auth
export default function ForgotPasswordModal({ open, onClose }: Props) {
  const intl = useIntl();

  // Estados do formulário interno do modal
  const [email, setEmail]     = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState('');

  // Chama o Firebase para enviar o e-mail de redefinição
  const handleReset = async () => {
    setError('');
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch {
      // Exibe mensagem de erro traduzida caso o envio falhe
      setError(intl.formatMessage({ id: 'forgot.error' }));
    }
  };

  // Reseta o estado interno e fecha o modal
  const handleClose = () => {
    setEmail('');
    setSuccess(false);
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">

      {/* Título do modal traduzido */}
      <DialogTitle>
        {intl.formatMessage({ id: 'forgot.title' })}
      </DialogTitle>

      <DialogContent>
        {success ? (
          // Mensagem de sucesso após envio do e-mail
          <Typography sx={{ color: 'success.main', fontSize: 14 }}>
            {intl.formatMessage({ id: 'forgot.success' })}
          </Typography>
        ) : (
          <>
            {/* Instrução para o usuário */}
            <Typography sx={{ fontSize: 14, mb: 2, color: 'text.secondary' }}>
              {intl.formatMessage({ id: 'forgot.description' })}
            </Typography>

            {/* Campo de e-mail para recuperação */}
            <TextField
              label={intl.formatMessage({ id: 'login.email' })}
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              size="small"
            />

            {/* Mensagem de erro — exibida apenas quando há falha no envio */}
            {error && (
              <Typography sx={{ color: 'error.main', fontSize: 13, mt: 1 }}>
                {error}
              </Typography>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions>
        {/* Botão de cancelar — fecha e reseta o modal */}
        <Button onClick={handleClose} size="small">
          {intl.formatMessage({ id: 'forgot.cancel' })}
        </Button>

        {/* Botão de envio — oculto após sucesso */}
        {!success && (
          <Button onClick={handleReset} variant="contained" size="small">
            {intl.formatMessage({ id: 'forgot.submit' })}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}