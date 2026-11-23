+++
date = '2026-11-18T11:26:33-03:00'
draft = false
title = 'Context API no React'
description = 'Aprenda a usar o useContext e pare de exagerar no Prop Drilling.'
tags = ['react', 'hooks']
+++

## O que é Context API?

A Context API é uma solução nativa do React para compartilhamento de dados entre componentes, sem a necessidade de passar props manualmente por todos os componentes intermediários.

Imagine que você está desenvolvendo um projeto complexo e chega à seguinte situação:

> São muitas props sendo passadas entre os componentes da árvore! Isso está uma bagunça!

É para resolver esse tipo de situação que existe a Context API.

### O conceito de contexto

Contexto é um conjunto de informações, situações e circunstâncias que estão relacionadas a determinado ambiente.

No React, podemos pensar em contexto como um mecanismo que permite disponibilizar determinados valores para componentes dentro de uma região da árvore de componentes.

Imagine que você é um técnico responsável por montar a rede interna de internet de uma casa. Inicialmente, você começa a passar cabos por todos os lados, conectando cada dispositivo individualmente.

Se entrar um dispositivo novo, você precisará instalar outro cabo e conectá-lo à rede.

Mas então você se lembra de que existe algo chamado Wi-Fi!

Em vez de passar cabos por toda a casa, você instala um roteador Wi-Fi. Agora, os dispositivos que estiverem dentro do alcance da rede e tiverem permissão para acessá-la poderão se conectar sem precisar de uma conexão física individual com os outros dispositivos.

No React, a ideia é semelhante:

- Props são como cabos: você passa informações diretamente de um componente para outro.
- Context API é como uma rede Wi-Fi: você disponibiliza informações em um determinado contexto, e os componentes descendentes podem acessá-las sem precisar que os componentes intermediários as repassem.

## Como funciona a Context API?

Os principais elementos da Context API são:

- **createContext():** função que cria um objeto de contexto.
- **Context.Provider:** componente que disponibiliza os valores do contexto aos componentes descendentes.
- **useContext():** Hook que permite consumir os valores do contexto.
- **Context.Consumer:** componente que permite consumir o contexto utilizando a técnica de render props. É uma alternativa ao useContext, mais antiga e geralmente menos conveniente.

Veja o seguinte exemplo:

### Demonstração

{{< code-playground theme="nord" lang="jsx" height=600 >}}

import { createContext, useContext, useState } from 'react';

const TodoContext = createContext(null);

function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  function addTask(title) {
    setTasks(prev => [
      ...prev,
      { id: Date.now(), title, completed: false }
    ]);
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function removeTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  return (
    <TodoContext.Provider value={{ tasks, addTask, toggleTask, removeTask }}>
      {children}
    </TodoContext.Provider>
  );
}

function TodoColumn() {
  const { tasks, toggleTask, removeTask } = useContext(TodoContext);

  return (
    <section>
      <h2>A fazer</h2>

      {tasks.filter(task => !task.completed).map(task => (
        <p key={task.id}>
          {task.title}{' '}
          <button onClick={() => toggleTask(task.id)}>Concluir</button>
          <button onClick={() => removeTask(task.id)}>Excluir</button>
        </p>
      ))}
    </section>
  );
}

function CompletedColumn() {
  const { tasks, toggleTask, removeTask } = useContext(TodoContext);

  return (
    <section>
      <h2>Concluídas</h2>

      {tasks.filter(task => task.completed).map(task => (
        <p key={task.id}>
          {task.title}{' '}
          <button onClick={() => toggleTask(task.id)}>Reabrir</button>
          <button onClick={() => removeTask(task.id)}>Excluir</button>
        </p>
      ))}
    </section>
  );
}

function TaskBoard() {
  const { addTask } = useContext(TodoContext);
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    addTask(title.trim());
    setTitle('');
  }

  return (
    <main>
      <h1>Minha Todo List</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Nome da tarefa..."
        />
        <button type="submit">Adicionar tarefa</button>
      </form>

      <TodoColumn />
      <hr />
      <CompletedColumn />
    </main>
  );
}

export default function App() {
  return (
    <TodoProvider>
      <TaskBoard />
    </TodoProvider>
  );
}

{{< /code-playground >}}

### Vamos analisar isto parte por parte:

#### Importação

```jsx
import { createContext, useContext, useState } from 'react';
```

Importamos as funções **createContext**, **useContext** e **useState** do React.

#### Criação do contexto

```jsx
const TodoContext = createContext(null);
```

Aqui criamos o contexto e o armazenamos na variável **TodoContext**.

A função **createContext()** retorna um objeto Context, que será utilizado para compartilhar informações entre os componentes.

Ela recebe como argumento o valor padrão do contexto. Nesse exemplo, utilizamos **null**.

Esse valor padrão será utilizado quando um componente tentar acessar o contexto sem encontrar um Provider correspondente acima dele na árvore de componentes.

O objeto retornado por **createContext()** possui principalmente estas propriedades:

- **Provider:** componente responsável por disponibilizar o valor do contexto aos componentes descendentes.
- **Consumer:** componente que permite consumir o contexto utilizando render props.
- **displayName:** propriedade que permite definir um nome para facilitar a identificação do contexto nas ferramentas de desenvolvimento do React.

É a partir do **TodoContext** que iremos disponibilizar e acessar os valores compartilhados entre os componentes.

#### Criação do Provider

```jsx
function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([]);
```

Aqui criamos um componente chamado **TodoProvider**, que será responsável por disponibilizar o contexto aos seus componentes descendentes.

Observe que utilizamos a propriedade **children**. Ela representa os elementos React que forem passados como filhos do componente **TodoProvider**.

Também utilizamos o Hook **useState()** para criar o estado **tasks**, que armazenará as tarefas da nossa aplicação.

#### Disponibilização dos valores

```jsx
return (
  <TodoContext.Provider value={{ tasks, addTask, toggleTask, removeTask }}>
    {children}
  </TodoContext.Provider>
);
```

O componente **TodoProvider** retorna o **TodoContext.Provider**, responsável por disponibilizar os valores do contexto aos componentes descendentes.

Utilizamos a propriedade **value** para definir quais informações estarão disponíveis.

Nesse exemplo, estamos compartilhando:

- **tasks:** estado que armazena as tarefas.
- **addTask:** função responsável por adicionar tarefas.
- **toggleTask:** função responsável por alternar o estado de conclusão de uma tarefa.
- **removeTask:** função responsável por excluir tarefas.

Como o **children** está dentro do **TodoContext.Provider**, todos os seus componentes descendentes poderão acessar esses valores por meio do contexto.

#### Consumo do contexto

Nos componentes que precisam acessar esses valores, utilizamos o Hook **useContext()**.

```jsx
const { tasks, addTask, toggleTask, removeTask } = useContext(TodoContext);
```

O **useContext()** recebe o objeto de contexto como argumento e retorna o valor disponibilizado pela propriedade **value** do Provider correspondente mais próximo na árvore de componentes.

Nesse caso, como disponibilizamos um objeto dentro de **value**, podemos utilizar a desestruturação para atribuir suas propriedades a variáveis.

Assim, conseguimos acessar diretamente os estados e as funções compartilhadas.

#### Envolvendo os componentes

Por fim, precisamos envolver os componentes que deverão ter acesso ao contexto com o nosso **TodoProvider**.

```jsx
export default function App() {
  return (
    <TodoProvider>
      <TaskBoard />
    </TodoProvider>
  );
}
```

Observe que o **TaskBoard** está dentro do **TodoProvider**.

Isso significa que ele e seus componentes descendentes poderão acessar os valores disponibilizados pelo contexto.

Não precisamos passar manualmente as informações para cada componente por meio de props. Basta utilizar o **useContext()** onde for necessário.

E pronto! Agora temos um contexto compartilhado entre os componentes da nossa aplicação.