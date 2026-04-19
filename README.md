# Fly.id 

Projeto desenvolvido como desafio técnico utilizando React, TypeScript, MUI e Firebase.

## Tecnologias
- React
- TypeScript
- Vite
- MUI
- Firebase Auth

## Funcionalidades da aplicação

- Login com e-mail e senha via Firebase Auth
- Redirecionamento para home após autenticação
- Feedback visual de erro em caso de falha no login
- Recuperação de senha por e-mail
- Seletor de idioma (PT-BR, EN-GB, EN-US, ES)
- Logout na página home

## Rodar o projeto
npm install
npm run dev

## Para rodar os testes 
npm run test

## Observações

Durante a execução da aplicação foram feitas resoluções de algumas dependências por conta das versões..... 


## ---------------------------------------------

## RELATÓRIO DE TESTES

## Os testes passaram com sucesso, fluxo de autenticação e componentes de interface 

## Resultado por suite 


| Suite | Arquivo | Testes | Status |
|---|---|---|---|
| AuthError | `AuthError.test.tsx` | 2 | ✅ |
| Header | `Header.test.tsx`       | 6 | ✅ |
| LoginForm | `LoginForm.test.tsx` | 5 | ✅ |
| LoginAuth | `LoginAuth.test.tsx` | 3 | ✅ |
| LoginPage | `LoginPage.test.tsx` | 4 | ✅ |
| ForgotPassword| `ForgotPasswordModal.test.tsx` | 1 | | ✅ |

---

## Cobertura dos testes

### AuthError
- Renderização condicional de mensagem de erro

### Header
- Logo e UI principal
- Seletor de idioma
- Controle de logout via props

### LoginPage

- Integração entre componentes
- Exibição condicional de erros de autenticação (Conforme foi solicitado)

## Esqueci a senha

- Renderização do modal (aberto/fechado)
- Campo de e-mail
- Feedback de sucesso e erro
- Ação de cancelar (`onClose`)


## Observação: 

Os testes passaram corretamente ✅

