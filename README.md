# use-immer

A hook to use [immer](https://github.com/mweststrate/immer) as a React [hook](https://reactjs.org/docs/hooks-intro.html) to manipulate state.

# Installation

`npm install immer use-immer`

# API

## useImmer

`useImmer(initialState)` is very similar to [`useState`](https://reactjs.org/docs/hooks-state.html).
The function returns a tuple, the first value of the tuple is the current state, the second is the updater function,
which accepts an [immer producer function](https://immerjs.github.io/immer/produce) or a value as argument.  

### Managing state with immer producer function

When passing a function to the updater, the `draft` argument can be mutated freely, until the producer ends and the changes will be made immutable and become the next state.

Example: https://codesandbox.io/s/l97yrzw8ol

```javascript
import React from "react";
import { useImmer } from "use-immer";


function App() {
  const [person, updatePerson] = useImmer({
    name: "Michel",
    age: 33
  });

  function updateName(name) {
    updatePerson(draft => {
      draft.name = name;
    });
  }

  function becomeOlder() {
    updatePerson(draft => {
      draft.age++;
    });
  }

  return (
    <div className="App">
      <h1>
        Hello {person.name} ({person.age})
      </h1>
      <input
        onChange={e => {
          updateName(e.target.value);
        }}
        value={person.name}
      />
      <br />
      <button onClick={becomeOlder}>Older</button>
    </div>
  );
}
```

(obviously, immer is a little overkill for this example)

### Managing state as simple useState hook
When passing a value to the updater instead of a function, `useImmer` hook behaves the same as useState hook and updates the state with that value.

```javascript
import React from 'react';
import { useImmer } from 'use-immer';

function BirthDayCelebrator(){
  const [age, setAge] = useImmer(20);

  function birthDay(event){
    setAge(age + 1);
    alert(`Happy birthday #${age} Anon! hope you good`);
  }

  return(
    <div>
      <button onClick={birthDay}>It is my birthday</button>
    </div>
  );
}
```

Obviously if you have to deal with immutability it is better option passing a function to the updater instead of a direct value.

## useImmerReducer

Immer powered reducer, based on [`useReducer` hook](https://reactjs.org/docs/hooks-reference.html#usereducer)

Example: https://codesandbox.io/s/2zor1monvp

```javascript
import React from "react";
import { useImmerReducer } from "use-immer";

const initialState = { count: 0 };

function reducer(draft, action) {
  switch (action.type) {
    case "reset":
      return initialState;
    case "increment":
      return void draft.count++;
    case "decrement":
      return void draft.count--;
  }
}

function Counter() {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  );
}
```
