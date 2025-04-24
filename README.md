
# FURIA Fan Analyzer

FURIA Fan Analyzer é um sistema dividido em frontend e backend que permite mapear e entender melhor os fãs da organização FURIA, coletando dados como jogos preferidos, engajamento com redes sociais e participação na comunidade.

## Estrutura de Branches

Este repositório utiliza separação por branches:

- `frontend`: Interface React com páginas para login, registro, formulário do fã e dashboard visual com gráficos.
- `backend`: Simulação de backend utilizando localStorage (em ambiente local), com lógica de persistência e autenticação.

## Funcionalidades

### Para o Fã

- Registro de informações como nome, e-mail, cidade, redes sociais, jogo preferido e tags de interesse
- Avaliação automática de engajamento com base nas informações fornecidas
- Classificação do fã em três níveis: Super Fã, Curioso e Novato
- Exibição de mensagem personalizada após envio do formulário
- Armazenamento de dados no localStorage do navegador

### Para o Colaborador (Admin)

- Login exclusivo com credenciais fixas
- Dashboard administrativo com:
  - Lista de fãs registrados
  - Gráfico de barras de pontuação de engajamento
  - Gráfico de pizza com jogos preferidos
- Logout e proteção de rotas para acesso restrito

## Tecnologias

### Frontend

- React
- React Router DOM
- Tailwind CSS
- Framer Motion (animações)
- Chart.js (gráficos)
- React Toastify (notificações)
- localStorage para persistência de dados

### Backend (Simulado)

- Node.js (estruturado para futura integração com banco real)
- Dados mantidos via localStorage simulando persistência

## Como Executar o Projeto

### Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
Executar o Frontend
bash
Copy
Edit
git checkout frontend
npm install
npm run dev
Acesse: http://localhost:3000

Executar o Backend (opcional, se configurado)
bash
Copy
Edit
git checkout backend
npm install
npm run dev
Credenciais de Acesso

Tipo de Usuário	E-mail	Senha
Colaborador	colaborador@furiagg.com	furia123
Fã	Informado no momento do registro	—
Melhorias Futuras
Substituir localStorage por banco de dados real

Autenticação com tokens JWT

Integração com APIs de redes sociais

Sistema de ranking de fãs com pontuação acumulada

Deploy com pipelines de CI/CD (Vercel/Render)

Estrutura Recomendada
css
Copy
Edit
├── frontend/
│   └── src/
│       ├── Pages/
│       ├── Components/
│       └── assets/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── routes/
│       └── models/
Observações
Ao registrar um fã, as informações são salvas localmente no navegador.

O dashboard administrativo somente é acessível com credenciais válidas de colaborador.

O projeto não depende de backend em nuvem neste momento.

yaml
Copy
Edit

---

Se quiser, posso personalizar com o link do seu GitHub, inserir instruções específicas de `.env`, ou adaptar o conteúdo ao seu processo de deploy (como Vercel, Netlify, Render etc). Deseja isso também?






You said:
mas vc n ta me dando a documentação em markdown, não deve ser?


ChatGPT said:
Sim, perfeito! A documentação para o projeto deve estar escrita em Markdown dentro do arquivo README.md. E a boa notícia é: tudo que te enviei na última resposta já está em Markdown puro — pronto para ser copiado direto no seu README.md.

📌 O que você precisa fazer:
Crie ou abra o arquivo README.md na raiz do seu projeto.

Copie o conteúdo abaixo e cole dentro desse arquivo:

markdown
Copy
Edit
# FURIA Fan Analyzer

FURIA Fan Analyzer é um sistema dividido em frontend e backend que permite mapear e entender melhor os fãs da organização FURIA, coletando dados como jogos preferidos, engajamento com redes sociais e participação na comunidade.

## Estrutura de Branches

Este repositório utiliza separação por branches:

- `frontend`: Interface React com páginas para login, registro, formulário do fã e dashboard visual com gráficos.
- `backend`: Simulação de backend utilizando localStorage (em ambiente local), com lógica de persistência e autenticação.

## Funcionalidades

### Para o Fã

- Registro de informações como nome, e-mail, cidade, redes sociais, jogo preferido e tags de interesse
- Avaliação automática de engajamento com base nas informações fornecidas
- Classificação do fã em três níveis: Super Fã, Curioso e Novato
- Exibição de mensagem personalizada após envio do formulário
- Armazenamento de dados no localStorage do navegador

### Para o Colaborador (Admin)

- Login exclusivo com credenciais fixas
- Dashboard administrativo com:
  - Lista de fãs registrados
  - Gráfico de barras de pontuação de engajamento
  - Gráfico de pizza com jogos preferidos
- Logout e proteção de rotas para acesso restrito

## Tecnologias

### Frontend

- React
- React Router DOM
- Tailwind CSS
- Framer Motion (animações)
- Chart.js (gráficos)
- React Toastify (notificações)
- localStorage para persistência de dados

### Backend (Simulado)

- Node.js (estruturado para futura integração com banco real)
- Dados mantidos via localStorage simulando persistência

## Como Executar o Projeto

### Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
Executar o Frontend
bash
Copy
Edit
git checkout frontend
npm install
npm run dev
Acesse: http://localhost:3000

Executar o Backend (opcional, se configurado)
bash
Copy
Edit
git checkout backend
npm install
npm run dev
Credenciais de Acesso

Tipo de Usuário	E-mail	Senha
Colaborador	colaborador@furiagg.com	furia123
Fã	Informado no momento do registro	—
Melhorias Futuras
Substituir localStorage por banco de dados real

Autenticação com tokens JWT

Integração com APIs de redes sociais

Sistema de ranking de fãs com pontuação acumulada

Deploy com pipelines de CI/CD (Vercel/Render)

Estrutura Recomendada
css
Copy
Edit
├── frontend/
│   └── src/
│       ├── Pages/
│       ├── Components/
│       └── assets/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── routes/
│       └── models/
Observações
Ao registrar um fã, as informações são salvas localmente no navegador.

O dashboard administrativo somente é acessível com credenciais válidas de colaborador.

O projeto não depende de backend em nuvem neste momento.
