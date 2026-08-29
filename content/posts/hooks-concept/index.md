+++
date = '2026-07-11T15:52:41-03:00'
draft = false
title = 'O Conceito de Hooks'
description = 'Entenda o conceito de hooks no desenvolvimento de software, comparando Action e Filter Hooks do WordPress com os hooks do React.'
tags = ['react', 'wordpress', 'hooks']
+++

O conceito de Hook é muito importante no desenvolvimento de software e lidamos 
com ele o tempo todo.
Hooks (ganchos) são mecanismos que permitem se conectar a determinados 
momentos ou eventos do funcionamento do sistema para executar um código próprio.
Hooks aparecem de diversas maneiras em bibliotecas, frameworks e sistemas. As
principais tecnologias do mercado implementam hooks de alguma forma. 


Bibliotecas como o `React` têm os hooks como um dos principais recursos de
desenvolvimento, possuindo hooks built-in, além de permitir a criação de hooks
personalizados. O WordPress também faz uso pesado de hooks em sua arquitetura,
o que permite ampla modularidade e possibilita que os desenvolvedores de plugins
e temas expandam bastante o ecossistema. Embora a ideia central dos hooks seja
se conectar a algo, o conceito de hook no React é diferente dos hooks do
WordPress e de outros sistemas.

## WordPress

No WordPress, os hooks são implementados seguindo o padrão `observer`: ele
executa sua lógica core e permite extensibilidade com a execução de códigos a
partir de determinados eventos. Os hooks são registrados para execução posterior
quando os eventos ocorrerem. Simplificando, existem dois tipos de Hooks no WordPress:

1. Action Hooks
2. Filter Hooks

### Action Hooks
Servem para executar um código em determinado ponto do fluxo sem necessariamente
modificar um valor. Em outras palavras, estamos adicionando callbacks a este
hook.

```php
add_action('init', function () {
    // executa durante o init do WordPress
});
```
Internamente o WordPress executa algo semelhante a

```php
do_action('init');
```

### Filter Hooks

Servem para interceptar e modificar um valor, como um título de um post:

```php
add_filter('the_title', function ($title) {
    return strtoupper($title);
});
```
O WordPress executa:

```php
$title = apply_filters('the_title', $title);
```

## React

No React, os hooks não são eventos globais: eles funcionam como funções especiais
que conectam funções JavaScript ao motor interno reativo do React. Eles são 
importantes para

1. Gerenciamento de estado
2. Ciclo de vida e efeitos colaterais
3. Outros recursos nativos como performance, referências e contexto

A documentação oficial do React agrupa os hooks em:

* State Hooks (useState, useReducer)

* Context Hooks (useContext)

* Ref Hooks (useRef, useImperativeHandle)

* Effect Hooks (useEffect, useLayoutEffect, useInsertionEffect)

* Performance Hooks (useMemo, useCallback, useTransition, useDeferredValue)

* Resource & Form Hooks (use, useFormStatus, useOptimistic, useActionState)

* Other Hooks (useId, useDebugValue, useSyncExternalStore)

Além destes hooks built-in, existem os custom hooks, um dos recursos mais poderosos
do React. Eles são usados para isolar, reutilizar e compartilhar lógica com 
estado entre múltiplos componentes.

## Conclusão

Embora o objetivo final dos hooks seja possibilitar um ponto de engate para
customização e controle, a implementação varia de acordo com a ferramenta.
Em muitos sistemas, os hooks são gatilhos orientados a eventos que permitem estender
fluxos e interceptar dados sem modificar o código-fonte original. Em outros casos,
como em bibliotecas de interface e reatividade, os hooks são usados como abstrações
para conectar a lógica de exibição aos motores internos da ferramenta.
