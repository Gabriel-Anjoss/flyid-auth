import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { ptBR } from './messages/pt-BR';
import { en } from './messages/en';
import { es } from './messages/es';

export type LocaleKey = 'pt-BR' | 'en-GB' | 'en-US' | 'es-ES';

// Estrutura de cada opção de idioma exibida no seletor
export interface LocaleOption {
  label: string;
  value: LocaleKey;
  intlLocale: string;
}

// Lista de idiomas disponíveis no seletor
export const LOCALE_OPTIONS: LocaleOption[] = [
  { label: 'Português (BR)', value: 'pt-BR', intlLocale: 'pt-BR' },
  { label: 'English (GB)',   value: 'en-GB', intlLocale: 'en-GB' },
  { label: 'English (US)',   value: 'en-US', intlLocale: 'en-US' },
  { label: 'Español (ES)',   value: 'es-ES', intlLocale: 'es'    },
];

const messagesMap: Record<LocaleKey, Record<string, string>> = {
  'pt-BR': ptBR,
  'en-GB': en,
  'en-US': en,
  'es-ES': es,
};

// Tipo do contexto — expõe o locale atual e a função para alterá-lo
interface LocaleContextType {
  locale: LocaleKey;
  setLocale: (l: LocaleKey) => void;
}

// Contexto com valor padrão PT-BR
const LocaleContext = createContext<LocaleContextType>({
  locale: 'pt-BR',
  setLocale: () => {},
});

export const useLocale = () => useContext(LocaleContext);

// Provider que envolve a aplicação e fornece o locale e as traduções via IntlProvider
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<LocaleKey>('pt-BR');

  // Busca a opção correspondente ao locale atual para obter o intlLocale correto
  const option = LOCALE_OPTIONS.find(o => o.value === locale)!;

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={option.intlLocale} messages={messagesMap[locale]}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
}