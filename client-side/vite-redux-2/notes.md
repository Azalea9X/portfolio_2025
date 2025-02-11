Per free code camp
Action
Describes changes that need to be made to the state of the application. Sends data from the app to the Redux store and lets you update the store. 

An action can have a payload property which represents the data 

{
  type: 'ADD_TASK',
  payload: {
    id: 1,
    text: 'Buy groceries',
    completed: false
  }
}

An example of an action creator that inputs a task's text and returns an action object to the Redux store: 

function addTask(taskText) {
  return {
    type: 'ADD_TASK',
    payload: {
      id: 1,
      text: taskText,
      completed: false
    }
  }
}

## Dispatch
A function that lets you send an action to update the state of the application. Runs through all of the reducers and updates the state accordingly. 

## Reducers
A function that takes the current state of an application and an action as arguments and returns a new state based on the action. 

const initialState = {
  count: 0
};

function counterReducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

This reducer function takes in the arguments of state and action. State represents the state of the application while action represents the action dispatched to modify the state. 

If the action type is increment, the new state object count will be incremented by one, the decrement case will be decremented by one. 

