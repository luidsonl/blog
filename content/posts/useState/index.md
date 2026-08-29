+++
date = '2026-07-18T11:26:33-03:00'
draft = false
title = 'Como Usar useState'
description = 'Aprenda a usar o useState, o hook mais fundamental do React, para gerenciar estado em componentes com exemplos práticos.'
tags = ['react', 'hooks']
+++


## O que é useState?
useState é provavelmente o hook mais fundamental do React. Ele resolve a seguinte situação:

> Quero que esse componente mantenha um valor e seja renderizado novamente quando esse valor mudar.


### O conceito de estado
Podemos simplificar a ideia de estado no React como os dados estão guardados em um determinado momento. Dados podem mudar constantemente de uma renderização para outra.

## Parâmetros
A assinatura conceitual do useState é

`useState(initialState) -> [state, setState]`

Ele recebe um único parâmetro, o estado inicial, que pode ser praticamente qualquer valor.

## Retorno
É um array de exatamente dois elementos `[value, setValue]`. Por convenção, as variáveis vão seguir esse padrão `algumaCoisa, setAlgumaCoisa`. Os elementos retornados representam:
1. O estado atual
2. A função para atualizar o estado atual

A função set também pode ser usada para manipular o valor atual.

`setAge(a => a + 1);` sendo `a` o valor atual do estado.

## Prática

{{< code-playground theme="nord" lang="jsx" >}}
import { useState } from 'react';

function Demo() {
  const [contador, setContador] = useState(0);
  const [escuro, setEscuro] = useState(false);

  return (
    <div
      style={{
        textAlign: 'center',
        fontFamily: 'sans-serif',
        padding: '20px',
        background: escuro ? '#1e1e1e' : '#ffffff',
        color: escuro ? '#ffffff' : '#1e1e1e',
        borderRadius: '8px',
        transition: 'all 0.3s'
      }}
    >
      <h2>Contador: {contador}</h2>
      <button onClick={() => setContador(c => c + 1)}>+</button>
      <button onClick={() => setContador(c => c - 1)}>-</button>
      <button onClick={() => setEscuro(d => !d)}>
        {escuro ? 'Claro' : 'Escuro'}
      </button>
    </div>
  );
}

export default Demo;

{{< /code-playground >}}

## Observações
* Só pode ser chamado no nível superior do componente. Não pode ser invocado dentro de condicionais, loops ou funções aninhadas.
* Em Strict Mode, o React vai executar o useState duas vezes.
