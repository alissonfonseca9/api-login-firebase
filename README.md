# Login e autenticação com Firebase

Interface de autenticação desenvolvida com React e TypeScript. O projeto reúne cadastro, login por e-mail e Google, recuperação de senha e uma área acessível após a autenticação.

## Funcionalidades

- Cadastro com e-mail e senha e registro de informações no Firestore.
- Login com e-mail e senha ou com uma conta Google.
- Envio de e-mail para recuperação de senha.
- Proteção da rota do painel para usuários autenticados.
- Consulta a uma API com o token do usuário autenticado.

## Tecnologias

React, TypeScript, Vite, React Router, Firebase Authentication e Cloud Firestore.

## Executar localmente

1. Instale o Node.js e clone este repositório.
2. Na pasta do projeto, instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env.local` com a configuração do seu projeto Firebase:

   ```env
   VITE_FIREBASE_API_KEY=valor_do_firebase
   VITE_FIREBASE_AUTH_DOMAIN=valor_do_firebase
   VITE_FIREBASE_PROJECT_ID=valor_do_firebase
   VITE_FIREBASE_STORAGE_BUCKET=valor_do_firebase
   VITE_FIREBASE_MESSAGING_SENDER_ID=valor_do_firebase
   VITE_FIREBASE_APP_ID=valor_do_firebase
   VITE_API_URL=http://localhost:3000
   ```

4. No Firebase, habilite os métodos de autenticação que deseja utilizar e configure o Firestore. Para testar o login com Google, confira também os domínios autorizados do projeto.
5. Inicie a aplicação:

   ```bash
   npm run dev
   ```

Abra o endereço informado pelo Vite no navegador. Para gerar a versão de produção, use `npm run build`.

## API

Este repositório contém o **front-end**. O backend em NestJS está no repositório [api-login-backend](https://github.com/alissonfonseca9/api-login-backend). A consulta dos dados do usuário usa o endpoint `GET /users/me` e envia um token do Firebase no cabeçalho de autorização. A API precisa estar em execução para essa consulta; por padrão, o front-end procura `http://localhost:3000`. Configure `VITE_API_URL` se a API estiver em outro endereço.

Não publique credenciais administrativas do Firebase nem arquivos de conta de serviço no repositório. As variáveis `VITE_` são incorporadas ao código entregue ao navegador; portanto, não devem conter segredos de servidor.

## Estrutura

- `src/pages`: telas de login, cadastro e painel.
- `src/components`: componentes, incluindo a proteção de rotas.
- `src/services`: configuração do Firebase e comunicação com a API.
- `src/styles`: estilos da aplicação.
