+++
date = '2026-10-10T19:08:37-03:00'
draft = false
title = 'Como Usar useRef'
description = 'Aprenda a usar o useRef para armazenar valores sem causar re-renderizações e acessar elementos do DOM no React.'
tags = ['react', 'hooks']
+++

## O que é useRef

Agora imagine que você é um fiscal de obra e deve anotar com um giz em uma parede tudo que for feito na obra. Mas anotar na parede também é um ato em si. Você é uma pessoa muito lógica e conclui que também deve anotar que anotou isso na parede, e anota novamente que fez a anotação e isso gera um loop no estado.

> Como evitar que uma atualização de valor cause nova renderização no componente?

O `useRef` resolve esse problema!

## Referência

A referência é um objeto do `useRef` que mantém uma propriedade chamada `current`, onde você pode armazenar um valor.
A referência também pode apontar para um elemento do `DOM`, permitindo chamar métodos específicos e acessar e manipular propriedades dos elementos no `HTML`, sendo provavelmente o maior uso para esse hook.

A atualização dessa referência não causa reatividade e não renderiza o componente novamente. Dado que ele não causa nova renderização no componente, não devemos utilizar `useRef` para reatividade visual. Para isso existe o `useState`.

## Parâmetros

O `useRef` recebe um único parâmetro, o valor inicial da referência.

```jsx
const minhaRef = useRef(valorInicial);
```

## Retorno

Retorna um objeto com a propriedade `current`, onde podemos acessar e modificar esse valor.

## Exemplos

### useRef não causa uma nova renderização, diferente do useState

{{< code-playground theme="nord" lang="jsx" height=400 >}}
import {useRef, useState} from 'react'

function Contador(){
    const contadorRef = useRef(0)
    const [contadorState, setContadorState] = useState(0)

    function incrementRef(){
        contadorRef.current = contadorRef.current + 1
    }
    function incrementState(){
        setContadorState(p=>p + 1)
    }
    
    return(
      <div>
        <div>
          <h1>Contador useRef: {contadorRef.current}</h1>
          <button onClick={incrementRef}>Incrementar</button>
        </div>
        <div>
          <h1>Contador useState: {contadorState}</h1>
          <button onClick={incrementState}>Incrementar</button>
        </div>
      </div>

        
    )
}

export default Contador;
{{< /code-playground >}}


### Contar quantas vezes um componente renderiza

{{< code-playground theme="nord" lang="jsx" height=400 >}}
import {useRef, useState} from 'react'

function Contador(){
    const render = useRef(0)
    const [contador, setContador] = useState(0)

    render.current++

    function incrementar(){
        setContador(p=>p + 1)
    }
    
    return(
      <div>
      <h1>Renderizações: {render.current}</h1>
          <h1>Contador useState: {contador}</h1>
          <button onClick={incrementar}>Incrementar</button>
      </div>

        
    )
}

export default Contador;
{{< /code-playground >}}

### Consultando e manipulando dados do DOM para arrastar um elemento

{{< code-playground theme="nord" lang="jsx" height=400 >}}

import { useRef } from 'react';

function Arrastavel() {
    const caixa = useRef(null);

    function arrastar(e) {
        caixa.current.style.left = `${e.clientX}px`;
        caixa.current.style.top = `${e.clientY}px`;
    }

    return (
        <div
            onMouseMove={arrastar}
            style={{ width: '100vw', height: '100vh' }}
        >
            <div
                ref={caixa}
                style={{
                    position: 'absolute',
                    left: 100,
                    top: 100,
                    width: 100,
                    height: 100,
                    background: 'blue'
                }}
            />
        </div>
    );
}

export default Arrastavel;

{{< /code-playground >}}