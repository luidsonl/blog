+++
date = '2026-10-06T11:26:33-03:00'
draft = false
title = 'How to Use useMemo'
description = 'Learn how to use useMemo and memoize functions in React.'
tags = ['react', 'hooks']
+++

## What is useMemo

Imagine you are building a complex screen in React and run into the following situation:

> I want to store an already computed value instead of redoing the calculation every time the component renders.

## The concept of memoization

`useMemo` is the hook that implements memoization inside React. But what is memoization? Memoizing is basically calculating once and storing the result. It is a kind of cache that prevents the same calculation from being redone unnecessarily.

Imagine your job is to count the potholes in the pavement of a street and report the number to drivers. When the first driver asks, you will spend a good amount of time counting. When the next one passes, you don't need to count again, because, being smart, you wrote down how many potholes there were. But if the city hall fills some of them in, your note becomes invalid and you need to count again.

## Parameters

The signature of `useMemo` is:

```jsx
const value = useMemo(() => {
  return computeSomething();
}, [dependencies]);
```

The first parameter is a function with no arguments, whose return value will be stored. The second is an array of dependencies, which serves to invalidate the cache when one of its values changes.

## Return value

`useMemo` returns the same value returned by the function passed as the first parameter. Usually, that value is assigned to a variable.

## Important notes

- The function passed to `useMemo` must be **pure**, meaning it has no side effects, because it runs during rendering.
- React may discard the cached value and recompute it, so `useMemo` should be treated as a **performance optimization**, not as a storage guarantee.
- It is only worth using it for genuinely expensive calculations or to keep the same reference for objects and arrays between renders.

## Practical example

{{< code-playground theme="nord" lang="jsx" height=600 >}}
import { useMemo, useState, useRef } from "react";

function slowFibonacci(n) {
  return n < 2 ? n : slowFibonacci(n - 1) + slowFibonacci(n - 2);
}

function FibonacciWithMemo({ counter }) {
  const [num, setNum] = useState(30);
  const calls = useRef(0);

  const result = useMemo(() => {
    calls.current += 1;
    return slowFibonacci(num);
  }, [num]);

  return (
    <div style={{ border: "1px solid black", borderRadius: 20, padding: 20 }}>
      <h2>With useMemo</h2>
      <p>{calls.current} calculations</p>
      <p>{counter} parent renders</p>
      <h2>Fibonacci of {num} is <span style={{ color: "green" }}>{result}</span></h2>
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

function FibonacciWithoutMemo({ counter }) {
  const [num, setNum] = useState(30);
  const calls = useRef(0);

  calls.current += 1;
  const result = slowFibonacci(num);

  return (
    <div style={{ border: "1px solid black", borderRadius: 20, padding: 20 }}>
      <h2>Without useMemo</h2>
      <p>{calls.current} calculations</p>
      <p>{counter} parent renders</p>
      <h2>Fibonacci of {num} is <span style={{ color: "red" }}>{result}</span></h2>
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
        <h2>Counter: {counter}</h2>
        <button onClick={() => setCounter((c) => c + 1)}>Increment</button>
      </div>
      <FibonacciWithMemo counter={counter} />
      <FibonacciWithoutMemo counter={counter} />
    </div>
  );
}
{{< /code-playground >}}

The example puts two side-by-side components that compute the same slow Fibonacci (recursive, intentionally heavy), but one uses `useMemo` and the other computes directly in the component body. The `Demo` (parent) has a counter unrelated to the calculation, used only to force re-renders of the children. When you click "Increment", the component without `useMemo` recalculates the Fibonacci on every render (the screen freezes a bit and its calculation counter goes up), while the component with `useMemo` reuses the stored value, because `num`, its only dependency, didn't change, and its counter stays still. `useRef` is used to count the executions without causing new renders. When the input number actually changes, both recalculate, since that is when the cache doesn't apply.
