import { useState } from 'react';
import { Container } from '@mui/material';
import { useIntl } from 'react-intl';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import AuthError from '../components/AuthError';

function LoginPage() {
  const [error, setError] = useState('');
  const intl = useIntl();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header />

      <Container maxWidth="xs" sx={{ pt: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <AuthError message={error} />
          <LoginForm
            onError={() => setError(intl.formatMessage({ id: 'login.error' }))}
          />
        </div>
      </Container>
    </div>
  );
}

export default LoginPage;