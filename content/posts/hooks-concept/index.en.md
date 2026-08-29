+++
date = '2026-07-11T15:52:41-03:00'
draft = false
title = 'The Concept of Hooks'
description = 'Understand the concept of hooks in software development, comparing WordPress Action and Filter Hooks with React hooks.'
tags = ['react', 'wordpress', 'hooks']
+++

The concept of Hook is very important in software development and we deal with it all the time.
Hooks are mechanisms that let you connect to specific moments or events in the system's execution to run your own code.
Hooks show up in many different ways across libraries, frameworks and systems. Most mainstream technologies implement hooks in some form.

Libraries like `React` treat hooks as one of their main development features, with built-in hooks and support for creating custom ones. WordPress also relies heavily on hooks in its architecture, which allows for great modularity and lets plugin and theme developers expand the ecosystem quite a bit. Although the core idea of hooks is to connect to something, the hook concept in React is different from WordPress hooks and from other systems.

## WordPress

In WordPress, hooks are implemented following the `observer` pattern: it runs its core logic and allows extensibility by executing code at specific events. Hooks are registered for later execution when the events occur. Simplifying, there are two types of Hooks in WordPress:

1. Action Hooks
2. Filter Hooks

### Action Hooks
They run code at a given point in the flow without necessarily modifying a value. In other words, we are adding callbacks to this hook.

```php
add_action('init', function () {
    // runs during the WordPress init
});
```
Internally WordPress runs something similar to

```php
do_action('init');
```

### Filter Hooks

They intercept and modify a value, such as a post title:

```php
add_filter('the_title', function ($title) {
    return strtoupper($title);
});
```
WordPress runs:

```php
$title = apply_filters('the_title', $title);
```

## React

In React, hooks are not global events: they work as special functions that connect JavaScript functions to React's internal reactive engine. They are important for

1. State management
2. Lifecycle and side effects
3. Other built-in features like performance, refs and context

The official React documentation groups hooks into:

* State Hooks (useState, useReducer)

* Context Hooks (useContext)

* Ref Hooks (useRef, useImperativeHandle)

* Effect Hooks (useEffect, useLayoutEffect, useInsertionEffect)

* Performance Hooks (useMemo, useCallback, useTransition, useDeferredValue)

* Resource & Form Hooks (use, useFormStatus, useOptimistic, useActionState)

* Other Hooks (useId, useDebugValue, useSyncExternalStore)

Besides these built-in hooks, there are custom hooks, one of the most powerful features of React. They are used to isolate, reuse and share stateful logic across multiple components.

## Conclusion

Although the ultimate goal of hooks is to provide an attachment point for customization and control, the implementation varies depending on the tool.
In many systems, hooks are event-driven triggers that let you extend flows and intercept data without modifying the original source code. In other cases, such as UI and reactivity libraries, hooks are used as abstractions to connect display logic to the tool's internal engines.
