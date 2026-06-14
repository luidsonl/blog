# Resumo da Estilização e Temas do Site

Este documento apresenta uma análise detalhada da arquitetura de estilização do portfólio, detalhando as tecnologias utilizadas, a paleta de cores e o funcionamento do tema claro/escuro (light/dark mode).

---


*   **Tailwind CSS v4:** A estilização é construída primariamente com classes utilitárias do Tailwind CSS. O projeto usa a versão 4, importada no arquivo global através de `@import "tailwindcss";` com pós-processamento configurado no PostCSS (`postcss.config.mjs`).
*   **Fontes do Google (Geist):** As fontes `Geist` (sans-serif) e `Geist_Mono` (monospace) são carregadas de forma otimizada pelo Next.js no arquivo `app/layout.tsx`. As variáveis de fonte CSS correspondentes (`--font-geist-sans` e `--font-geist-mono`) são injetadas no corpo do documento e mapeadas no tema do Tailwind.
*   **CSS Variables (Variáveis Nativas):** O controle de cores principais (fundo e texto principal) é feito de forma nativa por meio de variáveis declaradas em `:root`.

---

## 2. Funcionamento do Tema Claro / Escuro (Light & Dark Mode)

O sistema de temas do site é híbrido e funciona de forma **semi-automática**, priorizando as configurações do sistema operacional ou do navegador do usuário.

### Estrutura no CSS (`app/globals.css`)
As variáveis de cor são declaradas no `:root` e redefinidas dentro de uma media query para o tema escuro:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
```

### Comportamento do Tema na Aplicação
1.  **Preferência do Sistema (Padrão):** O site muda de cor automaticamente baseando-se no `prefers-color-scheme: dark` do sistema/navegador. Quando o sistema está no modo escuro, o fundo muda de branco (`#ffffff`) para quase preto (`#0a0a0a`) e o texto de preto (`#171717`) para cinza claro (`#ededed`).
2.  **Configuração de Classe (`darkMode: "class"`):** 
    *   No arquivo `tailwind.config.ts`, a propriedade `darkMode: "class"` está definida. Isso indica que o Tailwind está preparado para ativar classes escuras (`dark:`) quando a classe `.dark` for inserida em um elemento pai (como `<html>` ou `<body>`).
    *   **Importante:** Atualmente, **não há um botão ou script de alternância manual** (como injeção de classe `.dark` via Javascript/React State ou persistência em `localStorage`) implementado na interface. A interface atual do cabeçalho contém apenas um botão de alternância de idioma (Português para Inglês). Portanto, as classes que usam o prefixo `dark:` dependem do comportamento do motor do Tailwind em relação à configuração do sistema ou de uma futura implementação de alteração manual.

---

## 3. Paleta de Cores e Padrão Visual

Abaixo estão descritas as cores aplicadas nos estados claro e escuro:

| Elemento | Tema Claro (Light Mode) | Tema Escuro (Dark Mode) | Classes de Exemplo |
| :--- | :--- | :--- | :--- |
| **Fundo da Página** | Branco (`#ffffff`) | Preto/Cinza Escuro (`#0a0a0a`) | `bg-[var(--background)]` |
| **Texto Principal** | Preto suave (`#171717`) | Cinza claro (`#ededed`) | `text-[var(--foreground)]` |
| **Destaque (Accent)** | Azul Céu (`#0284c7`) | Azul Céu (`#0284c7`) | `text-sky-600` |
| **Fundo de Cards** | Branco Puro (`#ffffff`) | Cinza escuro semi-transparente | `bg-white dark:bg-slate-900/40` |
| **Bordas** | Cinza claro (`#e2e8f0`) | Cinza escuro (`#334155`) | `border-slate-200 dark:border-slate-700` |
| **Texto Secundário**| Cinza médio (`#334155` / `#475569`) | Cinza suave (`#cbd5e1` / `#94a3b8`) | `text-slate-700 dark:text-slate-300` <br> `text-slate-600 dark:text-slate-400` |
| **Badges de Tech** | Fundo cinza bem claro com texto escuro | Fundo cinza escuro com texto claro | `bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200` |

---

## 4. Estrutura de Componentes de Estilo

*   **`Avatar.tsx`:** Exibe a imagem de perfil com cantos arredondados (`rounded-full`) e borda sutil.
*   **`Badge.tsx`:** Utilizado para indicar as tecnologias nos cartões de projeto. Possui estilização condicional para modo claro (`bg-slate-100 text-slate-800`) e escuro (`dark:bg-slate-800 dark:text-slate-200`).
*   **`Button.tsx`:** Botão genérico ou elemento de link (`<a>`) com transições suaves (`transition`) e foco em usabilidade.
*   **`ProjectCard.tsx` / `Experience.tsx` / `Education.tsx`:** Usam bordas finas e fundos que se adaptam perfeitamente ao tema (`bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-700`) para dar profundidade de design moderno e clean.
