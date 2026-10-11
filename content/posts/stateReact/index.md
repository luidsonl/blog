+++
date = '2026-10-10T19:52:35-03:00'
draft = true
title = 'O Estado no React'
+++

## Como funciona o gerenciamento de estado no react

Imagine que você é um fiscal da prefeitura responsável por contar a quantidade de motoqueiros que passam na rua dando grau e fazendo barulho.

Você é muito atento e mantém a contagem corretamente, mas existe um problema: você não pode ficar ali o tempo todo. Eventualmente, você precisa sair e outra pessoa assume seu lugar.

> Como garantir que a próxima pessoa saiba quantos motoqueiros já foram contabilizados?

No React, podemos pensar em um componente como esse fiscal. Variáveis locais são recriadas a cada renderização, enquanto hooks como `useState` e `useRef` permitem manter valores entre renderizações.

Porém, se o componente for desmontado, seu estado local será perdido. Para preservar a contagem após a saída do componente, precisamos armazená-la em um lugar que continue existindo, como um componente pai, uma store externa ou um mecanismo de armazenamento persistente.