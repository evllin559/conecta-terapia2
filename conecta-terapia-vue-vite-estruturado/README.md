# Conecta Terapia — Vue 3 + Vite

Protótipo demonstrativo responsivo, organizado por páginas, componentes e estado compartilhado.

## Requisitos
Node.js 20.19+ ou 22.12+ e npm.

## Executar
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Estrutura
- `src/views/` — início, perfil público e painel
- `src/components/` — cabeçalho e rodapé
- `src/composables/useDemoStore.js` — estado reativo e lógica da demonstração
- `src/styles/main.css` — estilos responsivos
- `src/App.vue` — seleção de telas

## Publicação
Suba os arquivos (não a pasta `node_modules`) para um repositório GitHub. Na Vercel escolha Vite, comando `npm run build`, saída `dist`.

## Atenção
Este é um protótipo, **não** um SaaS pronto para produção. Não possui login, backend, cobrança, separação entre profissionais nem proteção de dados de pacientes. Dados fictícios ficam em `localStorage` neste navegador. **Não insira dados reais de pacientes.**
