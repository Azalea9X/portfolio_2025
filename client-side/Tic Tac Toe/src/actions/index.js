import axios from 'axios';
import { useEffect, useState } from "react";

const apiEndpoint = "http://127.0.0.1:5000/graphql";

export const getPosts = () => async dispatch => {
  try {
    const response = await axios.post(apiEndpoint, {
      query: `
      mutation getAllPosts($title: String!, $content: String!, $author: String!) {
        getAllPosts(title: $title, content: $content, author: $author) {
          id
          title
          content
          author
        }
      }
    `,
    variables: {
      title: task.title,
      content: task.content,
      author: task.author
    }
    });
    dispatch({ type: "GET_POSTS_SUCCESS", payload: response.data.data.getPosts });
  } catch (error) {
    dispatch({ type: "GET_POSTS_ERROR", error });
  }
};

export const UpdateToDo = (taskId, updatedTask) => async dispatch => {
  try {
    const response = await axios.post(apiEndpoint, {
      query: `
        mutation updatePost($id: ID!, $title: String!, $content: String!, $author: String!) {
          updatePost(id: $id, title: $title, content: $content, author: $author) {
            id
            title
            content
            author
          }
        }
      `,
      variables: {
        id: taskId,
        title: updatedTask.title,
        content: updatedTask.content,
        author: updatedTask.author
      }
    });
    
    document.querySelector("table").style.display = "table"; 
    dispatch({ type: "UPDATE_TASK_SUCCESS", payload: response.data.data.updatePost });
  } catch (error) {
    dispatch({ type: "UPDATE_TASK_ERROR", error });
  }
};

export const addTodo = task => async dispatch => {
  try {
    let form = document.querySelector("form"); 
    

    const response = await axios.post(apiEndpoint, {
      query: `
        mutation addPost($title: String!, $content: String!, $author: String!) {
          addPost(title: $title, content: $content, author: $author) {
            id
            title
            content
            author
          }
        }
      `,
      variables: {
        title: task.title,
        content: task.content,
        author: task.author
      }
    });
    dispatch({ type: "ADD_TASK_SUCCESS", payload: response.data.data.addPost });
  } catch (error) {
    dispatch({ type: "ADD_TASK_ERROR", error });
  }
};

export const deleteToDo = (taskId) => async (dispatch) => {
  try {
    const query = `
      mutation deletePost($id: ID!) {
        deletePost(id: $id) {
          id
        }
      }
    `;

    const variables = { id: taskId };

    const response = await axios.post(apiEndpoint, { query, variables });

    dispatch({ type: "DELETE_TASK_SUCCESS", payload: response.data.data.deletePost });
  } catch (error) {
    dispatch({ type: "DELETE_TASK_ERROR", error: error.message });
  }
};