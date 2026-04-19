import { render, screen } from '@testing-library/react';
import AuthError from '../AuthError';

describe('AuthError', () => {
  it('não deve renderizar nada quando message está vazia', () => {
    const { container } = render(<AuthError message="" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('deve renderizar a mensagem de erro quando preenchida', () => {
    render(<AuthError message="Email ou senha inválidos" />);
    expect(screen.getByText(/email ou senha inválidos/i)).toBeInTheDocument();
  });
});