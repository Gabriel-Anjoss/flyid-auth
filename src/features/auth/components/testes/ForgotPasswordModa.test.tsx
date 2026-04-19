import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LocaleProvider } from '../../../../i18n/LocaleContext';
import ForgotPasswordModal from '../ForgotPasswordModal';
import { resetPassword } from '../../services/firebaseAuth';

jest.mock('../../services/firebaseAuth', () => ({
  resetPassword: jest.fn(),
}));

const mockReset = resetPassword as jest.Mock; // 👈 estava faltando isso

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <LocaleProvider>{children}</LocaleProvider>
);

describe('ForgotPasswordModal', () => {
  beforeEach(() => mockReset.mockReset());

  it('não deve renderizar quando closed', () => {
    render(<ForgotPasswordModal open={false} onClose={jest.fn()} />, { wrapper: Wrapper });
    expect(screen.queryByText(/recuperar senha/i)).not.toBeInTheDocument();
  });

  it('deve renderizar o modal quando open', () => {
    render(<ForgotPasswordModal open onClose={jest.fn()} />, { wrapper: Wrapper });
    expect(screen.getByText(/recuperar senha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('deve exibir mensagem de sucesso após envio', async () => {
    mockReset.mockResolvedValueOnce({});
    render(<ForgotPasswordModal open onClose={jest.fn()} />, { wrapper: Wrapper });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'usuario@email.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(screen.getByText(/e-mail enviado/i)).toBeInTheDocument();
    });
  });

  it('deve exibir mensagem de erro quando envio falha', async () => {
    mockReset.mockRejectedValueOnce(new Error('auth/user-not-found'));
    render(<ForgotPasswordModal open onClose={jest.fn()} />, { wrapper: Wrapper });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'naoexiste@email.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));

    await waitFor(() => {
      expect(screen.getByText(/não foi possível enviar/i)).toBeInTheDocument();
    });
  });

  it('deve chamar onClose ao clicar em cancelar', () => {
    const onClose = jest.fn();
    render(<ForgotPasswordModal open onClose={onClose} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});