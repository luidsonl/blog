+++
date = '2026-10-10T19:08:37-03:00'
draft = false
title = 'How to Use useRef'
description = 'Learn how to use useRef to store values without causing re-renders and to access DOM elements in React.'
tags = ['react', 'hooks']
+++

## What is useRef

Now imagine you are a construction inspector and you have to write down on a wall, with chalk, everything that gets done on the site. But writing on the wall is itself an act too. You are a very logical person and conclude that you must also write down that you wrote that on the wall, and you write down again that you made the note, and this creates a loop in the state.

> How do you prevent a value update from causing a new render of the component?

`useRef` solves this problem!

## Reference

A ref is an object from `useRef` that keeps a property called `current`, where you can store a value.
A ref can also point to a `DOM` element, allowing you to call specific methods and access and manipulate element properties in the `HTML`, which is probably the biggest use for this hook.

Updating this ref does not cause reactivity and does not re-render the component. Since it does not cause a new render of the component, we should not use `useRef` for visual reactivity. For that, there is `useState`.

## Parameters

`useRef` takes a single parameter, the initial value of the ref.

```jsx
const myRef = useRef(initialValue);
```

## Return value

It returns an object with the `current` property, where we can access and modify that value.

## Examples

### useRef does not cause a new render, unlike useState

{{< code-playground theme="nord" lang="jsx" height=400 >}}
import {useRef, useState} from 'react'

function Counter(){
    const counterRef = useRef(0)
    const [counterState, setCounterState] = useState(0)

    function incrementRef(){
        counterRef.current = counterRef.current + 1
    }
    function incrementState(){
        setCounterState(p=>p + 1)
    }
    
    return(
      <div>
        <div>
          <h1>useRef counter: {counterRef.current}</h1>
          <button onClick={incrementRef}>Increment</button>
        </div>
        <div>
          <h1>useState counter: {counterState}</h1>
          <button onClick={incrementState}>Increment</button>
        </div>
      </div>

        
    )
}

export default Counter;
{{< /code-playground >}}


### Counting how many times a component renders

{{< code-playground theme="nord" lang="jsx" height=400 >}}
import {useRef, useState} from 'react'

function Counter(){
    const render = useRef(0)
    const [count, setCount] = useState(0)

    render.current++

    function increment(){
        setCount(p=>p + 1)
    }
    
    return(
      <div>
      <h1>Renders: {render.current}</h1>
          <h1>useState counter: {count}</h1>
          <button onClick={increment}>Increment</button>
      </div>

        
    )
}

export default Counter;
{{< /code-playground >}}

### Reading and manipulating DOM data to drag an element

{{< code-playground theme="nord" lang="jsx" height=400 >}}

import { useRef } from 'react';

function Draggable() {
    const box = useRef(null);

    function drag(e) {
        box.current.style.left = `${e.clientX}px`;
        box.current.style.top = `${e.clientY}px`;
    }

    return (
        <div
            onMouseMove={drag}
            style={{ width: '100vw', height: '100vh' }}
        >
            <div
                ref={box}
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

export default Draggable;

{{< /code-playground >}}
