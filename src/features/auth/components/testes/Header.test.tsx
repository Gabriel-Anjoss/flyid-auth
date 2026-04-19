import { render, screen, fireEvent } from '@testing-library/react';
import { LocaleProvider } from '../../../../i18n/LocaleContext';
import Header from '../Header';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <LocaleProvider>{children}</LocaleProvider>
);

describe('Header', () => {
  it('deve renderizar o logo fly.id', () => {
    render(<Header />, { wrapper: Wrapper });
    expect(screen.getByText(/fly\.id/i)).toBeInTheDocument();
  });

  it('deve renderizar o botão de idioma', () => {
    render(<Header />, { wrapper: Wrapper });
    expect(screen.getByRole('button', { name: /pt-br/i })).toBeInTheDocument();
  });

  it('deve abrir o menu de idiomas ao clicar', () => {
    render(<Header />, { wrapper: Wrapper });
    fireEvent.click(screen.getByRole('button', { name: /pt-br/i }));
    expect(screen.getByText('Português (BR)')).toBeInTheDocument();
    expect(screen.getByText('English (GB)')).toBeInTheDocument();
    expect(screen.getByText('Español (ES)')).toBeInTheDocument();
  });

  it('não deve exibir botão de logout por padrão', () => {
    render(<Header />, { wrapper: Wrapper });
    expect(screen.queryByText(/sair/i)).not.toBeInTheDocument();
  });

  it('deve exibir botão de logout quando showLogout=true', () => {
    render(<Header showLogout onLogout={jest.fn()} />, { wrapper: Wrapper });
    expect(screen.getByText(/sair/i)).toBeInTheDocument();
  });

  it('deve chamar onLogout ao clicar em Sair', () => {
    const mockLogout = jest.fn();
    render(<Header showLogout onLogout={mockLogout} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText(/sair/i));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});