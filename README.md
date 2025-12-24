# My Money Mastery 💰

Um aplicativo moderno e intuitivo para gestão financeira pessoal. Controle suas receitas, despesas e visualize para onde seu dinheiro está indo através de um dashboard interativo.

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido com as tecnologias mais recentes do ecossistema React:

- **[Vite](https://vitejs.dev/)** - Build tool ultrarrápida
- **[React](https://reactjs.org/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para JavaScript
- **[Supabase](https://supabase.com/)** - Backend as a Service (Auth & Database)
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS utilitário
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes de interface reutilizáveis
- **[TanStack Query](https://tanstack.com/query/latest)** - Gerenciamento de estado assíncrono

## ✨ Funcionalidades

- **Dashboard Financeiro**: Visão geral de saldo, receitas e despesas.
- **Autenticação Segura**: Login e registro via Supabase Auth.
- **Gestão de Transações**: Adicione, edite e remova gastos e ganhos.
- **Segurança de Dados**: Regras de segurança (RLS) garantem que cada usuário veja apenas seus dados.
- **Design Responsivo**: Funciona perfeitamente em computadores e celulares.
- **Dark/Light Mode**: Interface adaptável.

## 🛠️ Como rodar o projeto localmente

Siga os passos abaixo para executar o projeto na sua máquina:

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado (versão 18 ou superior).

### Instalação

1. Clone o repositório:

    git clone [https://github.com/n0k3zin/my-money-mastery.git](https://github.com/n0k3zin/my-money-mastery.git)

2. Entre na pasta do projeto:

    cd my-money-mastery

3. Instale as dependências:

    npm install

### Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione suas chaves do Supabase:

    VITE_SUPABASE_URL=sua_url_do_supabase
    VITE_SUPABASE_ANON_KEY=sua_chave_anonima_publica

### Rodando o Servidor

Inicie o servidor de desenvolvimento:

    npm run dev

O projeto estará disponível em `http://localhost:8080` (ou a porta indicada no terminal).

## 📦 Deploy

Este projeto está configurado para deploy automático no **GitHub Pages** utilizando GitHub Actions.

Para realizar um novo deploy:
1. Faça suas alterações.
2. Realize o Commit e Push para a branch `main`.
3. O GitHub Actions iniciará automaticamente o processo de build e deploy.

## 📄 Licença

Este projeto é de uso pessoal e educacional.
