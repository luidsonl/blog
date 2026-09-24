+++
date = '2026-09-23T18:45:18-03:00'
draft = false
title = 'Como usar useEffect'
tags = ['react', 'hooks']
+++

## O que é UseEffect?

Imagine que você está programando uma interface web que consome dados fora do seu front end. Talvez de uma API.

Aí você chega ao seguinte pensamento:

> Quero guardar um valor e atualizar a interface quando ele mudar.

É justamente para isso que serve o useEffect. Ele é usado quando algum componente precisa executar um efeito colateral depois de uma renderização, geralmente sincronizando algo externo ao React com o estado/props do componente.

## Efeitos colaterais

Uma função tem um efeito colateral quando, além de, por exemplo, calcular um valor, ela causa alguma mudança ou interação fora do próprio cálculo. O useEffect é um hook que representa o efeito colateral causado pela renderização ou por mudanças nas dependências do componente.

## Parâmetros

A assinatura conceitual do useEffect é:

```jsx
useEffect(effect, dependencies)
```

Ele recebe 2 parâmetros:

* `effect`: A função que será executada como efeito;
* `dependencies`: Um array opcional que determina quando o efeito deve ser executado novamente.

## Retorno

Diferente do useState, o useEffect não tem um retorno, mas a função passada como parâmetro pode retornar
uma função de limpeza.

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("oi");
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, []);
```

Este código cria um `timer` que executa um console.log("oi") a cada 1 segundo enquanto o componente estiver montado. Quando o componente desmonta, a função de limpeza `clearInterval(timer)` é chamada, encerrando o timer.

## O ciclo de vida dos componentes do React

Podemos simplificar o ciclo de vida do componente React em 3 fases:

* **Mount:** É quando o componente aparece pela primeira vez
* **Update:** Ocorre quando o componente sofre alguma mudança que causa uma nova renderização como
  - Mudanças de state
  - Mudanças de props
  - Mudanças de contexto
  - Renderizações causadas pelo elemento pai
* **Unmount:** Ocorre quando o componente deixa de existir na árvore do React.

Para componentes de classe, podemos acessar esses métodos dentro do ciclo de vida.

Para componentes funcionais, conseguimos gerenciar esse ciclo de vida a partir do hook `useEffect`.

### componentDidMount

Em componente de classe

```jsx
  class App extends React.Component {
    componentDidMount() {
      console.log('montou');
    }

    render() {
      return <h1>Olá</h1>;
    }
  }
```

Com useEffect

```jsx
function App(){
  useEffect(() => {
    console.log('montou');
  }, []);
}
```
O [] é importante para fazer a função executar apenas na montagem inicial.

### componentDidUpdate

Em componente de classe
```jsx
  componentDidUpdate() {
    console.log('atualizou');
  }
```

Com useEffect
```jsx
useEffect(() => {
  console.log('atualizou');
});
```

Sem o array de dependências, ele vai executar em toda renderização.
```jsx
useEffect(() => {
  console.log('contador mudou');
}, [contador]);
```
Neste caso, ele executa quando o valor do contador muda.



### componentWillUnmount

Em componente de classe
```jsx
componentWillUnmount() {
  console.log('vai desmontar');
}
```

Com useEffect
```jsx
useEffect(() => {
  return () => {
    console.log('vai desmontar');
  };
}, []);
```
O retorno da função é o cleanup.

## Exemplos


{{< code-playground theme="nord" lang="jsx" height=600 >}}
import { useState, useEffect } from 'react';

function Demo() {
  const [contador, setContador] = useState(0);
  const [escuro, setEscuro] = useState(false);

  useEffect(()=>{
    setEscuro(d => !d)
  }, [contador])

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
    </div>
  );
}

export default Demo;

{{< /code-playground >}}

Neste exemplo, a cor escura é ativada sempre que ocorre atualização no contador.

{{< code-playground theme="nord" lang="jsx" height=600 >}}
import { useState, useEffect } from 'react';

function DigaOi({setSaudacoes}) {

  useEffect(() => {
    const saudacoesLista = [
      'Olá',
      'Oi',
      'Hello',
      'Nihao',
      'Bonjour',
      'Hola',
      'Ciao',
      'Salve',
      'Olá, Marilene'
    ];

    const timer = setInterval(() => {
      const indice = Math.floor(
        Math.random() * saudacoesLista.length
      );

      setSaudacoes(saudacoes => [
        ...saudacoes,
        saudacoesLista[indice]
      ]);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <h1>Diga Oi</h1>
  );
}

function Demo() {
  const [saudacoesToggler, setSaudacoesToggler] = useState(false);
  const [saudacoes, setSaudacoes] = useState([]);

  return (
    <div
      style={{
        textAlign: 'center',
        fontFamily: 'sans-serif',
        padding: '20px',
        borderRadius: '8px'
      }}
    >
      <h2>Saudações</h2>

      <button onClick={() => setSaudacoesToggler(c => !c)}>
        {saudacoesToggler
          ? 'Parar saudações'
          : 'Iniciar saudações'}
      </button>

      {saudacoesToggler && <DigaOi setSaudacoes={setSaudacoes} />}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            margin: '10px',
            border: '1px solid black'
          }}
        >
          {saudacoes.map((saudacao, index) => (
            <div key={index}>{saudacao}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Demo;

{{< /code-playground >}}

Neste exemplo, o `setSaudacoes` é passado como prop para o componente `DigaOi`. O useEffect cria um timer ao ser montado que cria uma nova saudação a cada segundo. Ao ser desmontado, esse timer é limpo. Experimente remover o `clearInterval`. Um bug curioso causará a criação de novos timers sem limpar o timer ao desmontar o componente.


