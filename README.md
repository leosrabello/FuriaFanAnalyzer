# FURIA Fan Analyzer

Sistema para analisar e engajar fãs da organização FURIA, com coleta de dados sobre preferências de jogos, redes sociais e participação na comunidade.

---

##  Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Credenciais de Acesso](#credenciais-de-acesso)
- [Melhorias Futuras](#melhorias-futuras)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Observações](#observações)

---

## Sobre o Projeto

Este sistema permite o registro e análise de fãs da FURIA, com base em dados de jogos preferidos e interações sociais. Os administradores têm acesso a um dashboard com visualizações gráficas e estatísticas.

---

##  Tecnologias Utilizadas

### Frontend

- React
- React Router DOM
- Tailwind CSS
- Framer Motion
- Chart.js
- React Toastify

### Backend (Simulado)

- Node.js (estrutura preparada para backend real)
- localStorage (para simulação de banco)

---

##  Como Executar o Projeto

### Clonar o Repositório

```bash
git clone https://github.com/leosrabello/FuriaFanAnalyzer.git
```

### Rodar o Frontend

```bash
git checkout frontend
npm install
npm run dev
```

Acesse em: http://localhost:3000

### Rodar o Backend (Simulado)

```bash
git checkout backend
npm install
npm run dev
```

---

##  Credenciais de Acesso

| Tipo de Usuário | E-mail                      | Senha     |
|-----------------|-----------------------------|-----------|
| Colaborador     | colaborador@furiagg.com     | furia123  |
| Fã              | Informado no registro       | —         |

---

##  Melhorias Futuras

- Substituir localStorage por banco real (MongoDB, PostgreSQL)
- Autenticação JWT
- Exportação de dados (CSV, PDF)
- Filtros por cidade, pontuação ou jogo
- Deploy em Vercel (frontend) + Railway (backend)

---

##  Estrutura do Projeto

```plaintext
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
```

---

##  Observações

- Projeto criado para prototipação funcional.
- Admin possui login fixo e acesso ao dashboard.
- Usuários comuns visualizam apenas sua pontuação.
