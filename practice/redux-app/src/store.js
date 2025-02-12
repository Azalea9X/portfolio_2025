import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import taskReducer from "./reducers/taskReducer";

const apiEndpoint = "http://localhost:5000/graphql"; // GraphQL endpoint

const fetchPosts = () => async dispatch => {
  try {
    const response = await axios.post(apiEndpoint, {
      query: `
        query {
          getAllPosts {
            id
            title
            content
            author
          }
        }
      `
    });
    dispatch({ type: "FETCH_POSTS_SUCCESS", payload: response.data.data.getPosts });
  } catch (error) {
    dispatch({ type: "FETCH_POSTS_ERROR", error });
  }
};

const createPost = post => async dispatch => {
  try {
    const response = await axios.post(apiEndpoint, {
      query: `
        mutation {
          addPost(input: { title: "${post.title}", content: "${post.content}", author: "${post.author}" }) {
            id
            title
            content
            author
          }
        }
      `
    });
    dispatch({ type: "CREATE_POST_SUCCESS", payload: response.data.data.addPost });
  } catch (error) {
    dispatch({ type: "CREATE_POST_ERROR", error });
  }
};

const store = createStore(
  taskReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
export { fetchPosts, createPost };
