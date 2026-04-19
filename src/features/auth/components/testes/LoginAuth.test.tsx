import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LocaleProvider } from '../../../../i18n/LocaleContext';
import LoginForm from '../LoginForm';
import { login } from '../../services/firebaseAuth'; 

jest.mock('../../services/firebaseAuth', () => ({
  login: jest.fn(),
}));

const mockLogin = login as jest.Mock;

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <LocaleProvider>{children}</LocaleProvider>
);

const fillAndSubmit = () => {
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'teste@email.com' },
  });
  fireEvent.change(screen.getByLabelText(/senha/i), {
    target: { value: '123456' },
  });
  fireEvent.click(screen.getByRole('button', { name: /enviar/i }));
};

describe('Autenticação - fluxo de login', () => {
  beforeEach(() => mockLogin.mockReset());

  it('deve chamar login com email e senha corretos', async () => {
    mockLogin.mockResolvedValueOnce({});
    render(<LoginForm onError={jest.fn()} />, { wrapper: Wrapper });
    fillAndSubmit();

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('teste@email.com', '123456');
    });
  });

  it('não deve chamar onError quando login tem sucesso', async () => {
    mockLogin.mockResolvedValueOnce({});
    const onError = jest.fn();
    render(<LoginForm onError={onError} />, { wrapper: Wrapper });
    fillAndSubmit();

    await waitFor(() => {
      expect(onError).not.toHaveBeenCalled();
    });
  });

  it('deve chamar onError quando login falha', async () => {
    mockLogin.mockRejectedValueOnce({ code: 'auth/wrong-password' });
    const onError = jest.fn();
    render(<LoginForm onError={onError} />, { wrapper: Wrapper });
    fillAndSubmit();

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });
});