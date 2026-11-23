+++
date = '2026-11-18T11:26:33-03:00'
draft = false
title = 'Context API in React'
description = 'Learn how to use useContext and stop overdoing prop drilling.'
tags = ['react', 'hooks']
+++

## What is the Context API?

The Context API is a built-in React solution for sharing data between components without having to pass props manually through every intermediate component in the tree.

Imagine you are building a more complex project and run into a situation like this:

> There are way too many props being passed between components in the tree! This is getting messy.

This is exactly the kind of problem the Context API was designed to solve.

### The concept of context

Context is the set of information, situations, and circumstances related to a particular environment.

In React, you can think of context as a way to make certain values available to components within a specific part of the component tree.

Imagine you are a technician setting up the internal internet network for a house. At first, you start running cables everywhere, connecting each device individually.

If a new device shows up, you need to install another cable and connect it to the network.

Then you remember something called Wi-Fi!

Instead of running cables all over the house, you set up a Wi-Fi router. Now, any device within range that has permission to join the network can connect without needing its own physical cable connection to the others.

In React, the idea is similar:

- **Props** are like cables: you pass information directly from one component to another.
- **The Context API** is like a Wi-Fi network: you make information available in a given context, and descendant components can access it without intermediate components having to forward it along.

## How does the Context API work?

The main parts of the Context API are:

- **createContext():** a function that creates a context object.
- **Context.Provider:** a component that provides context values to descendant components.
- **useContext():** a Hook that lets you consume context values.
- **Context.Consumer:** a component that consumes context using the render-props pattern. It is an older alternative to `useContext` and is usually less convenient.

Here is an example:

### Demo

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
      <h2>To do</h2>

      {tasks.filter(task => !task.completed).map(task => (
        <p key={task.id}>
          {task.title}{' '}
          <button onClick={() => toggleTask(task.id)}>Complete</button>
          <button onClick={() => removeTask(task.id)}>Delete</button>
        </p>
      ))}
    </section>
  );
}

function CompletedColumn() {
  const { tasks, toggleTask, removeTask } = useContext(TodoContext);

  return (
    <section>
      <h2>Completed</h2>

      {tasks.filter(task => task.completed).map(task => (
        <p key={task.id}>
          {task.title}{' '}
          <button onClick={() => toggleTask(task.id)}>Reopen</button>
          <button onClick={() => removeTask(task.id)}>Delete</button>
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
      <h1>My Todo List</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Task name..."
        />
        <button type="submit">Add task</button>
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

### Let’s break this down step by step:

#### Imports

```jsx
import { createContext, useContext, useState } from 'react';
```

We import **createContext**, **useContext**, and **useState** from React.

#### Creating the context

```jsx
const TodoContext = createContext(null);
```

Here we create the context and store it in the **TodoContext** variable.

The **createContext()** function returns a Context object that will be used to share data between components.

It takes the context’s default value as an argument. In this example, we use **null**.

This default value is used when a component tries to consume the context but there is no matching Provider above it in the component tree.

The object returned by **createContext()** mainly has these properties:

- **Provider:** the component responsible for providing the context value to descendant components.
- **Consumer:** a component that consumes the context using render props.
- **displayName:** a property that lets you set a name to make the context easier to identify in React DevTools.

It is through **TodoContext** that we will provide and access the values shared between components.

#### Creating the Provider

```jsx
function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([]);
```

Here we create a component called **TodoProvider**, which will be responsible for providing the context to its descendant components.

Note that we use the **children** prop. It represents the React elements passed as children of **TodoProvider**.

We also use the **useState()** Hook to create the **tasks** state, which will hold the tasks in our app.

#### Providing the values

```jsx
return (
  <TodoContext.Provider value={{ tasks, addTask, toggleTask, removeTask }}>
    {children}
  </TodoContext.Provider>
);
```

The **TodoProvider** component returns **TodoContext.Provider**, which is responsible for providing context values to descendant components.

We use the **value** prop to define what information will be available.

In this example, we are sharing:

- **tasks:** the state that stores the tasks.
- **addTask:** a function responsible for adding tasks.
- **toggleTask:** a function responsible for toggling a task’s completion state.
- **removeTask:** a function responsible for removing tasks.

Because **children** is inside **TodoContext.Provider**, all of its descendant components can access these values through the context.

#### Consuming the context

In components that need to access these values, we use the **useContext()** Hook.

```jsx
const { tasks, addTask, toggleTask, removeTask } = useContext(TodoContext);
```

**useContext()** takes the context object as an argument and returns the value provided by the **value** prop of the nearest matching Provider in the component tree.

In this case, since we provided an object in **value**, we can use destructuring to assign its properties to variables.

That way, we can access the shared state and functions directly.

#### Wrapping the components

Finally, we need to wrap the components that should have access to the context with our **TodoProvider**.

```jsx
export default function App() {
  return (
    <TodoProvider>
      <TaskBoard />
    </TodoProvider>
  );
}
```

Notice that **TaskBoard** is inside **TodoProvider**.

This means it and its descendant components can access the values provided by the context.

We don’t need to manually pass information down through props for every component. We just call **useContext()** wherever it’s needed.

And that’s it! Now we have a context shared across the components of our application.
