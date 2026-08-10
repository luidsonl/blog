+++
date = '2026-07-18T11:26:33-03:00'
draft = false
title = 'How to Use useState'
tags = ['react', 'hooks']
+++


## What is useState?
useState is probably the most fundamental hook in React. It solves the following situation:

> I want this component to keep a value and be re-rendered whenever that value changes.


### The concept of state
We can simplify the idea of state in React as how data is stored at a given moment. Data can change constantly from one render to another.

## Parameters
The conceptual signature of useState is

`useState(initialState) -> [state, setState]`

It takes a single parameter, the initial state, which can be practically any value.

## Return value
It is an array of exactly two elements `[value, setValue]`. By convention, the variables follow this pattern `something, setSomething`. The returned elements represent:
1. The current state
2. The function to update the current state

The set function can also be used to manipulate the current value.

`setAge(a => a + 1);` where `a` is the current state value.

## Practice

{{< code-playground theme="nord" lang="jsx" >}}
import { useState } from 'react';

function Demo() {
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(false);

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
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <button onClick={() => setDark(d => !d)}>
        {dark ? 'Light' : 'Dark'}
      </button>
    </div>
  );
}

export default Demo;

{{< /code-playground >}}

## Notes
* It can only be called at the top level of the component. It cannot be invoked inside conditionals, loops, or nested functions.
* In Strict Mode, React will run useState twice.
