+++
title = 'Teste Playground'
date = 2026-08-09T12:00:00-03:00
draft = false
tags = ['react', 'demo']
+++

Exemplo do web component `<code-playground-react>` integrado via shortcode.

{{< code-playground theme="nord" lang="tsx" >}}
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>Contador: {count}</h2>
      <button onClick={() => setCount(c => c + 1)}>Incrementar</button>
    </div>
  );
}
export default Counter;
{{< /code-playground >}}
