
# Aparatus - Sistema de Agendamento para Barbearias com IA

Este projeto é um sistema de agendamento online para barbearias, com integração de chatbot de Inteligência Artificial para atendimento automatizado.

## Tecnologias Utilizadas

- [Next.js 13](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [Stripe](https://stripe.com/) (pagamentos)
- [TailwindCSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest)
- [NextAuth.js](https://next-auth.js.org/) (autenticação)
- [Zod](https://zod.dev/) (validação)
- [React Hook Form](https://react-hook-form.com/)
- [date-fns](https://date-fns.org/)
- Integração com Chatbot de IA

## Padrões de Projeto

- Componentização com React
- Separação de responsabilidades por pastas (`_actions`, `_components`, `_providers`)
- Validação e tipagem forte com TypeScript e Zod
- API Routes para autenticação e webhooks

## Setup e Configuração

1. Clone o repositório
2. Instale as dependências:
	```bash
	npm install
	```
3. Configure o arquivo `.env` com as variáveis necessárias (veja `.env.example`)
4. Execute as migrations do Prisma:
	```bash
	npx prisma migrate dev
	```
5. (Opcional) Popule o banco de dados com dados iniciais:
	```bash
	npx tsx prisma/seed.ts
	```
6. Inicie o servidor de desenvolvimento:
	```bash
	npm run dev
	```

## Funcionalidades

- Cadastro e autenticação de usuários
- Listagem de barbearias, serviços e horários disponíveis
- Agendamento e cancelamento de horários
- Pagamento online via Stripe
- Chatbot de IA para atendimento automatizado

---
