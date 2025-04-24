# FURIA Fan Analyzer

FURIA Fan Analyzer é um sistema dividido em frontend e backend que permite mapear e entender melhor os fãs da organização FURIA, coletando dados como jogos preferidos, engajamento com redes sociais e participação na comunidade.

## Estrutura de Branches

Este repositório utiliza separação por branches:

- "frontend": Interface React com páginas para login, registro, formulário do fã e dashboard visual com gráficos.
- "backend": Simulação de backend utilizando localStorage (em ambiente local), com lógica de persistência e autenticação.

## Documentação do Projeto

### Visão Geral

O projeto permite que fãs da FURIA se registrem e preencham dados sobre suas preferências de jogos e redes sociais. Um sistema de pontuação calcula o nível de engajamento de cada fã. Os colaboradores da FURIA (usuários do tipo "admin") têm acesso a um dashboard onde visualizam os fãs e gráficos analíticos.

### Fluxo do Fã

1. Registro via formulário
2. Preenchimento de informações adicionais
3. Cálculo do engajamento com base nos dados fornecidos
4. Classificação automática como:
   - Super Fã
   - Curioso
   - Novato
5. Exibição personalizada com toast e mascote da FURIA

### Fluxo do Colaborador (Admin)

1. Login com credenciais fixas
2. Visualização do dashboard administrativo
3. Acesso à lista de fãs e gráficos:
   - Gráfico de barras de pontuação de engajamento
   - Gráfico de pizza de jogos preferidos

### Armazenamento

- Os dados dos fãs são armazenados no "localStorage" do navegador.
- A branch "backend" simula persistência local para fins de desenvolvimento.

---

## Tecnologias Utilizadas

### Frontend

- React
- React Router DOM
- Tailwind CSS
- Framer Motion
- Chart.js
- React Toastify

### Backend (simulado)

- Node.js (estrutura preparada para backend real)
- Armazenamento local com localStorage

---

## Como Executar o Projeto

### Clonar o Repositório

'''bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
Rodar o Frontend
bash
Copy
Edit
git checkout frontend
npm install
npm run dev
Acesse em: http://localhost:3000

Rodar o Backend (simulado)
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
Substituir localStorage por banco de dados real (Ex: MongoDB, PostgreSQL)

Adicionar autenticação com JWT

Exportação de dados em CSV ou PDF

Filtros por cidade, pontuação ou jogo

Deploy em ambientes separados (ex: Vercel + Railway)

Estrutura Sugerida do Projeto
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
O sistema foi desenvolvido com foco em prototipação funcional.

A autenticação de administrador é baseada em um email fixo.

O dashboard administrativo exige login e redireciona usuários não autorizados.

Não é necessário banco de dados para uso local em desenvolvimento.

