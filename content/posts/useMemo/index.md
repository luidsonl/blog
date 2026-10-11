+++
date = '2026-10-06T11:26:33-03:00'
draft = false
title = 'Como Usar useMemo'
description = 'Aprenda a usar o useMemo e memoizar funções no react.'
tags = ['react', 'hooks']
+++

## O que é useMemo

Imagine que você está construindo uma tela complexa em React e se depara com a seguinte situação:

> Quero guardar um valor já calculado, em vez de refazer o cálculo toda vez que o componente renderizar.

## O conceito de memoização

O `useMemo` é o hook que implementa a memoização dentro do React. Mas o que é memoização? Memoizar é, basicamente, calcular uma vez e guardar o resultado. É uma espécie de cache que evita que o mesmo cálculo seja refeito de maneira desnecessária.

Imagine que sua profissão seja contar os buracos no calçamento de uma rua e informar a quantidade aos motoristas. Quando o primeiro motorista perguntar, você vai gastar um bom tempo contando. Quando o próximo passar, você não precisa contar de novo, pois, sendo inteligente, anotou quantos buracos havia. Mas, se a prefeitura tapar alguns deles, sua anotação deixa de valer e você precisa recontar.

## Parâmetros

A assinatura do `useMemo` é:

```jsx
const valor = useMemo(() => {
  return calcularAlgo();
}, [dependencias]);
```

O primeiro parâmetro é uma função sem argumentos, cujo retorno será armazenado. O segundo é um array de dependências, que serve para invalidar o cache quando algum de seus valores muda.

## Retorno

O `useMemo` retorna o mesmo valor devolvido pela função passada como primeiro parâmetro. Geralmente, esse valor é atribuído a uma variável.

## Observações importantes

- A função passada ao `useMemo` deve ser **pura**, ou seja, sem efeitos colaterais, pois é executada durante a renderização.
- O React pode descartar o valor em cache e recalculá-lo, então o `useMemo` deve ser tratado como uma **otimização de desempenho**, não como garantia de armazenamento.
- Só vale a pena usá-lo em cálculos realmente custosos ou para manter a mesma referência de objetos e arrays entre renderizações.

## Exemplo pŕatico

{{< code-playground theme="nord" lang="jsx" height=600 >}}
import { useMemo, useState, useRef } from "react";

function fibonacciLento(n) {
  return n < 2 ? n : fibonacciLento(n - 1) + fibonacciLento(n - 2);
}

function FibonacciMemo({ counter }) {
  const [num, setNum] = useState(30);
  const chamadas = useRef(0);

  const resultado = useMemo(() => {
    chamadas.current += 1;
    return fibonacciLento(num);
  }, [num]);

  return (
    <div style={{ border: "1px solid black", borderRadius: 20, padding: 20 }}>
      <h2>Com useMemo</h2>
      <p>{chamadas.current} cálculos</p>
      <p>{counter} renderizações do pai</p>
      <h2>Fibonacci de {num} é <span style={{ color: "green" }}>{resultado}</span></h2>
      <input
        value={num}
        onChange={(e) => setNum(Number(e.target.value))}
        style={{ width: "100%" }}
        type="number"
        min="0"
        max="40"
      />
    </div>
  );
}

function FibonacciNoMemo({ counter }) {
  const [num, setNum] = useState(30);
  const chamadas = useRef(0);

  chamadas.current += 1;
  const resultado = fibonacciLento(num);

  return (
    <div style={{ border: "1px solid black", borderRadius: 20, padding: 20 }}>
      <h2>Sem useMemo</h2>
      <p>{chamadas.current} cálculos</p>
      <p>{counter} renderizações do pai</p>
      <h2>Fibonacci de {num} é <span style={{ color: "red" }}>{resultado}</span></h2>
      <input
        value={num}
        onChange={(e) => setNum(Number(e.target.value))}
        style={{ width: "100%" }}
        type="number"
        min="0"
        max="40"
      />
    </div>
  );
}

export default function Demo() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <div style={{ border: "1px solid black", borderRadius: 20, padding: 20 }}>
        <h2>Contador: {counter}</h2>
        <button onClick={() => setCounter((c) => c + 1)}>Incrementar</button>
      </div>
      <FibonacciMemo counter={counter} />
      <FibonacciNoMemo counter={counter} />
    </div>
  );
}
{{< /code-playground >}}

O exemplo coloca dois componentes lado a lado que calculam o mesmo Fibonacci lento (recursivo, propositalmente pesado), mas um usa `useMemo` e o outro calcula direto no corpo do componente. O `Demo` (pai) tem um contador sem relação com o cálculo, usado apenas para forçar re-renderizações dos filhos. Ao clicar em "Incrementar", o componente sem `useMemo` recalcula o Fibonacci a cada renderização (a tela trava um pouco e seu contador de cálculos sobe), enquanto o componente com `useMemo` reaproveita o valor guardado, porque `num`, sua única dependência, não mudou, e seu contador permanece parado. O `useRef` serve para contar as execuções sem causar novas renderizações. Quando o número do input muda de fato, os dois recalculam, pois aí o cache não se aplica.