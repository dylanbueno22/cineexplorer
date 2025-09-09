# 🎬 CineExplorer

> **Um aplicativo de descoberta de filmes estilo Netflix, construído com React, TypeScript e Vite**

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF.svg)](https://vitejs.dev/)
[![TMDB API](https://img.shields.io/badge/TMDB-API-red.svg)](https://www.themoviedb.org/)

## ✨ Funcionalidades

### 🎯 **Implementadas**
- ✅ **Layout Netflix** com carrosséis horizontais responsivos
- ✅ **Hero Banner** com filme em destaque selecionado inteligentemente
- ✅ **Carrosséis por gênero** (Ação, Comédia, Drama, Animação, Suspense, Terror)
- ✅ **Cards de filme** interativos com hover effects avançados
- ✅ **Header responsivo** com logo, navegação e busca expansível
- ✅ **Sistema de busca** com animações suaves
- ✅ **Seleção inteligente** de filmes baseada em popularidade e gênero
- ✅ **Design responsivo** para mobile, tablet e desktop
- ✅ **Ícones Lucide** para interface moderna e consistente
- ✅ **Tipografia melhorada** com fontes elegantes

### 🔧 **Tecnologias Utilizadas**
- **React 18** com TypeScript para desenvolvimento type-safe
- **Vite** para build rápido e desenvolvimento eficiente
- **TMDB API** para dados completos de filmes
- **Lucide React** para ícones modernos e consistentes
- **CSS Modules** para estilização organizada
- **Hooks customizados** para gerenciamento de estado

## 🚀 Como Executar

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn

### **Instalação**
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/cineexplorer.git

# Entre na pasta
cd cineexplorer

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

### **Acesse**
Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

## 📁 Estrutura do Projeto

```
src/
├── components/              # Componentes React organizados
│   ├── Header/             # Cabeçalho com navegação
│   │   ├── Header.tsx      # Componente principal
│   │   └── Header.css      # Estilos do header
│   ├── HeroBanner.*        # Banner principal com filme em destaque
│   ├── MovieCarousel/      # Carrossel horizontal de filmes
│   │   ├── MovieCarousel.tsx
│   │   └── MovieCarousel.css
│   ├── MovieCard/          # Card individual do filme
│   │   ├── MovieCard.tsx
│   │   └── MovieCard.css
│   ├── Search/             # Sistema de busca expansível
│   │   ├── SearchButton.tsx
│   │   └── SearchButton.css
│   ├── Navigation/         # Links de navegação
│   ├── Logo/               # Logo do CineExplorer
│   └── Auth/               # Botões de autenticação
├── pages/                  # Páginas da aplicação
│   ├── MoviesPage.tsx      # Página principal de filmes
│   └── MoviesPage.css      # Estilos da página
├── hooks/                  # Hooks customizados
│   ├── useMovies.ts        # Hook para filmes populares
│   └── useMoviesByGenre.ts # Hook para filmes por gênero
├── services/               # Serviços de API
│   └── tmdbApi.ts          # Integração completa com TMDB
├── types/                  # Definições TypeScript
│   └── movie.ts            # Interfaces de filmes
├── App.tsx                 # Componente raiz
├── App.css                 # Estilos globais
├── index.css               # Estilos base
└── main.tsx                # Entry point da aplicação
```

## 🎨 Características do Design

### **Layout Netflix Autêntico**
- **Carrosséis horizontais** com navegação por setas elegantes
- **Cards interativos** com hover effects sofisticados
- **Hero banner** com filme em destaque selecionado automaticamente
- **Header fixo** com busca expansível e animações suaves

### **Responsividade Completa**
- **Desktop**: 6-8 filmes por carrossel, layout otimizado
- **Tablet**: 4-5 filmes por carrossel, navegação adaptada
- **Mobile**: 2-3 filmes por carrossel, interface touch-friendly

### **Categorias de Filmes**
- 🔥 **Em Alta** - Filmes populares do momento
- 💥 **Ação** - Filmes de ação e aventura
- 😂 **Comédia** - Filmes de comédia
- 🎭 **Drama** - Filmes dramáticos
- 🎨 **Animação** - Filmes animados
- 😱 **Suspense** - Filmes de suspense e thriller
- 👻 **Terror** - Filmes de terror

## 🔑 Configuração da API

O projeto utiliza a API do TMDB (The Movie Database). As credenciais estão configuradas no arquivo `src/services/tmdbApi.ts`:

```typescript
const ACCESS_TOKEN = 'seu_token_tmdb_aqui';
```

### **Endpoints Utilizados**
- `/movie/popular` - Filmes populares
- `/discover/movie` - Filmes por gênero
- `/trending/movie/week` - Filmes em tendência
- `/search/movie` - Busca de filmes

## 📱 Funcionalidades dos Cards

### **Interações Avançadas**
- **Hover**: Expande com detalhes completos do filme
- **Play**: Botão para reproduzir (pronto para implementação)
- **Adicionar**: Botão para lista de favoritos
- **Favoritar**: Sistema de favoritos com estado local

### **Informações Exibidas**
- **Poster** em alta qualidade
- **Título** e ano de lançamento
- **Avaliação** com sistema de estrelas
- **Sinopse** resumida e legível
- **Classificação** etária
- **Idioma** original
- **Badge de destaque** para filmes selecionados

## 🎯 Algoritmo de Seleção Inteligente

O sistema seleciona automaticamente o filme mais chamativo para o banner principal baseado em:

### **Critérios de Pontuação**
- **Popularidade**: Número de votos recebidos
- **Avaliação**: Nota média dos usuários
- **Palavras-chave**: Bonus para filmes de heróis/ação
- **Recência**: Prioridade para filmes dos últimos 5 anos

### **Palavras-chave de Heróis**
- Super-heróis: Avengers, Spider-Man, Batman, Superman
- Franquias: Fast & Furious, Mission Impossible, James Bond
- Sci-fi: Transformers, Terminator, Matrix

## 🚧 Próximos Passos

### **Funcionalidades Planejadas**
- [ ] **Sistema de favoritos** persistente com localStorage
- [ ] **Página de detalhes** completa do filme
- [ ] **Trailers integrados** via YouTube API
- [ ] **Busca avançada** com filtros por gênero, ano, rating
- [ ] **Página de séries** TV com carrosséis similares
- [ ] **Sistema de autenticação** completo
- [ ] **Listas personalizadas** do usuário
- [ ] **Recomendações** baseadas em histórico de visualização

### **Melhorias Técnicas**
- [ ] **Testes unitários** com Jest e React Testing Library
- [ ] **Testes E2E** com Cypress
- [ ] **PWA** (Progressive Web App) para instalação
- [ ] **Otimização** de performance com lazy loading
- [ ] **SEO** e meta tags para melhor indexação
- [ ] **Internacionalização** (i18n) para múltiplos idiomas
- [ ] **Dark/Light mode** toggle
- [ ] **Infinite scroll** para carregamento contínuo

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Cria build de produção
npm run preview      # Preview do build de produção

# Linting
npm run lint         # Executa ESLint
npm run lint:fix     # Corrige problemas do ESLint
```

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### **Padrões de Código**
- Use TypeScript para type safety
- Siga as convenções do ESLint configurado
- Mantenha componentes pequenos e reutilizáveis
- Adicione comentários para lógica complexa

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Dylan** - [GitHub](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- [TMDB](https://www.themoviedb.org/) pela API gratuita e completa
- [Lucide](https://lucide.dev/) pelos ícones modernos e consistentes
- [Vite](https://vitejs.dev/) pela ferramenta de build ultra-rápida
- [React](https://reactjs.org/) pelo framework robusto e flexível
- [TypeScript](https://www.typescriptlang.org/) pela type safety

## 📊 Estatísticas do Projeto

- **Componentes**: 8 componentes principais
- **Hooks**: 2 hooks customizados
- **Páginas**: 1 página principal
- **Serviços**: 1 serviço de API
- **Tipos**: Interfaces TypeScript completas
- **Responsividade**: 3 breakpoints (desktop, tablet, mobile)

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!** ⭐

**Desenvolvido com ❤️ para a comunidade de desenvolvedores**