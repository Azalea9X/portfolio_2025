import taskReducer from "./taskReducer";
import { combineReducers } from "redux";

const RootReducer = combineReducers({
  tasks: taskReducer,
  // Add other reducers here if needed
 
});

export default RootReducer;