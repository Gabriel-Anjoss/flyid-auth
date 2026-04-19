import { render, screen, fireEvent } from '@testing-library/react';
import { LocaleProvider } from '../../../../i18n/LocaleContext';
import LoginForm from '../LoginForm';

jest.mock('../../services/firebaseAuth', () => ({
  login: jest.fn(),
}));

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <LocaleProvider>{children}</LocaleProvider>
);

describe('LoginForm - componentes', () => {
  it('deve renderizar o campo de email', () => {
    render(<LoginForm onError={jest.fn()} />, { wrapper: Wrapper });
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('deve renderizar o campo de senha', () => {
    render(<LoginForm onError={jest.fn()} />, { wrapper: Wrapper });
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
  });

  it('deve renderizar o botão de enviar', () => {
    render(<LoginForm onError={jest.fn()} />, { wrapper: Wrapper });
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  it('deve atualizar o campo de email ao digitar', () => {
    render(<LoginForm onError={jest.fn()} />, { wrapper: Wrapper });
    const input = screen.getByLabelText(/email/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'teste@email.com' } });
    expect(input.value).toBe('teste@email.com');
  });

  it('deve atualizar o campo de senha ao digitar', () => {
    render(<LoginForm onError={jest.fn()} />, { wrapper: Wrapper });
    const input = screen.getByLabelText(/senha/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '123456' } });
    expect(input.value).toBe('123456');
  });
});