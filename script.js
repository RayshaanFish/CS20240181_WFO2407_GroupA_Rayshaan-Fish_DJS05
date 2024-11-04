const initialStateVerification = {
  count: 0,
};
const subtract = "SUBTRACT";
const add = "ADD";
const reset = "RESET";

function calculator(state = initialStateVerification, action) {
  switch (action.type) {
    case subtract:
      return { count: state.count - 1 };
    case add:
      return { count: state.count + 1 };
    case reset:
      return { count: 0 };
    default:
      return state;
  }
}

// Instantiate the store

function newStore(reducer) {
  let state = reducer(undefined, {});
  let listeners = [];

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  return { getState, subscribe, dispatch };
}
``;

// Instantiate the store
const store = newStore(calculator);

// Subscribe to log state updates to the console
store.subscribe(() => console.log("State updated:", store.getState()));

// Scenario Test Functions
function InitialStateVerification() {
  console.log("SCENARIO 1: Initial State Verification");
  console.log("Initial State:", store.getState()); // Expected: { count: 0 }
}

function IncrementCounter() {
  console.log("SCENARIO 2: Incrementing the Counter");
  store.dispatch({ type: add });
  store.dispatch({ type: add });
  console.log("After Incrementing Twice:", store.getState()); // Expected: { count: 2 }
}

function DecrementCounter() {
  console.log("SCENARIO 3: Decrementing the Counter");
  store.dispatch({ type: subtract });
  console.log("After Decrementing Once:", store.getState()); // Expected: { count: 1 }
}

function ResetCounter() {
  console.log("SCENARIO 4: Resetting the Counter");
  store.dispatch({ type: reset });
  console.log("After Resetting:", store.getState()); // Expected: { count: 0 }
}

// Run all scenarios in sequence
InitialStateVerification();
IncrementCounter();
DecrementCounter();
ResetCounter();
