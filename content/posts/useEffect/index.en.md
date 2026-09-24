+++
date = '2026-09-23T18:45:18-03:00'
draft = false
title = 'How to use useEffect'
description = 'Learn how to use useEffect, the React hook for running side effects, with lifecycle comparisons and practical examples.'
tags = ['react', 'hooks']
+++

## What is useEffect?

Imagine you are building a web interface that consumes data from outside your front end. Maybe from an API.

Then you end up thinking:

> I want to store a value and update the interface whenever it changes.

That is exactly what useEffect is for. It is used when a component needs to run a side effect after a render, usually to sync something external to React with the component's state/props.

## Side effects

A function has a side effect when, besides computing a value, say, it causes some change or interaction outside of its own computation. useEffect is a hook that represents the side effect caused by rendering or by changes in the component's dependencies.

## Parameters

The conceptual signature of useEffect is:

```jsx
useEffect(effect, dependencies)
```

It takes 2 parameters:

* `effect`: The function that will run as the effect;
* `dependencies`: An optional array that determines when the effect should run again.

## Return value

Unlike useState, useEffect doesn't have a return value, but the function passed to it may return a cleanup function.

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("hi");
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, []);
```

This code creates a `timer` that runs a console.log("hi") every 1 second while the component is mounted. When the component unmounts, the cleanup function `clearInterval(timer)` is called, stopping the timer.

## The component lifecycle in React

We can simplify the React component lifecycle into 3 phases:

* **Mount:** When the component appears for the first time
* **Update:** Happens when the component goes through some change that causes a new render, such as
  - State changes
  - Props changes
  - Context changes
  - Renders caused by the parent element
* **Unmount:** Happens when the component stops existing in the React tree.

For class components, we can rely on these lifecycle methods.

For function components, we can manage this lifecycle with the `useEffect` hook.

### componentDidMount

In a class component

```jsx
  class App extends React.Component {
    componentDidMount() {
      console.log('mounted');
    }

    render() {
      return <h1>Hello</h1>;
    }
  }
```

With useEffect

```jsx
function App(){
  useEffect(() => {
    console.log('mounted');
  }, []);
}
```
The [] is important to make the function run only on the initial mount.

### componentDidUpdate

In a class component
```jsx
  componentDidUpdate() {
    console.log('updated');
  }
```

With useEffect
```jsx
useEffect(() => {
  console.log('updated');
});
```

Without the dependency array, it will run on every render.
```jsx
useEffect(() => {
  console.log('counter changed');
}, [counter]);
```
In this case, it runs when the counter value changes.

### componentWillUnmount

In a class component
```jsx
componentWillUnmount() {
  console.log('will unmount');
}
```

With useEffect
```jsx
useEffect(() => {
  return () => {
    console.log('will unmount');
  };
}, []);
```
The function's return value is the cleanup.

## Examples

{{< code-playground theme="nord" lang="jsx" height=600 >}}
import { useState, useEffect } from 'react';

function Demo() {
  const [counter, setCounter] = useState(0);
  const [dark, setDark] = useState(false);

  useEffect(()=>{
    setDark(d => !d)
  }, [counter])

  return (
    <div
      style={{
        textAlign: 'center',
        fontFamily: 'sans-serif',
        padding: '20px',
        background: dark ? '#1e1e1e' : '#ffffff',
        color: dark ? '#ffffff' : '#1e1e1e',
        borderRadius: '8px',
        transition: 'all 0.3s'
      }}
    >
      <h2>Counter: {counter}</h2>
      <button onClick={() => setCounter(c => c + 1)}>+</button>
      <button onClick={() => setCounter(c => c - 1)}>-</button>
    </div>
  );
}

export default Demo;

{{< /code-playground >}}

In this example, the dark color is enabled every time the counter updates.

{{< code-playground theme="nord" lang="jsx" height=600 >}}
import { useState, useEffect } from 'react';

function SayHi({setGreetings}) {

  useEffect(() => {
    const greetingsList = [
      'Hello',
      'Hi',
      'Hey',
      'Howdy',
      'Nihao',
      'Bonjour',
      'Hola',
      'Ciao',
      'Hello, Marilene'
    ];

    const timer = setInterval(() => {
      const index = Math.floor(
        Math.random() * greetingsList.length
      );

      setGreetings(greetings => [
        ...greetings,
        greetingsList[index]
      ]);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <h1>Say Hi</h1>
  );
}

function Demo() {
  const [greetingsToggler, setGreetingsToggler] = useState(false);
  const [greetings, setGreetings] = useState([]);

  return (
    <div
      style={{
        textAlign: 'center',
        fontFamily: 'sans-serif',
        padding: '20px',
        borderRadius: '8px'
      }}
    >
      <h2>Greetings</h2>

      <button onClick={() => setGreetingsToggler(c => !c)}>
        {greetingsToggler
          ? 'Stop greetings'
          : 'Start greetings'}
      </button>

      {greetingsToggler && <SayHi setGreetings={setGreetings} />}

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
          {greetings.map((greeting, index) => (
            <div key={index}>{greeting}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Demo;

{{< /code-playground >}}

In this example, `setGreetings` is passed as a prop to the `SayHi` component. The useEffect creates a timer on mount that adds a new greeting every second. When the component unmounts, this timer is cleaned up. Try removing the `clearInterval`. A curious bug will cause new timers to be created without clearing the timer when the component unmounts.