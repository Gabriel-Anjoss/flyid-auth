import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LocaleProvider } from '../../../../i18n/LocaleContext';
import LoginPage from  '../../Pages/LoginPage';

jest.mock('../../services/firebaseAuth', () => ({
  login: jest.fn(),
}));

import { login } from '../../services/firebaseAuth';
const mockLogin = login as jest.Mock;

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <LocaleProvider>{children}</LocaleProvider>
);

describe('LoginPage - integração', () => {
  beforeEach(() => mockLogin.mockReset());

  it('deve renderizar o header com logo', () => {
    render(<LoginPage />, { wrapper: Wrapper });
    expect(screen.getByText(/fly\.id/i)).toBeInTheDocument();
  });

  it('deve renderizar os campos de email e senha', () => {
    render(<LoginPage />, { wrapper: Wrapper });
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
  });

  it('não deve exibir mensagem de erro antes de tentar login', () => {
    render(<LoginPage />, { wrapper: Wrapper });
    expect(screen.queryByText(/inválidos/i)).not.toBeInTheDocument();
  });

  it('deve exibir erro visual quando autenticação falha', async () => {
    mockLogin.mockRejectedValueOnce({ code: 'auth/wrong-password' });

    render(<LoginPage />, { wrapper: Wrapper });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'errado@email.com' },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'senhaerrada' },
    });
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(screen.getByText(/email ou senha inválidos/i)).toBeInTheDocument();
    });
  });
});