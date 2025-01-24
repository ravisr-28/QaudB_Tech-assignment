import { AxiosError } from "axios";
import {
  fetchTodosAPI,
  deleteTodoAPI,
  updateTodoAPI,
  addTodoAPI,
} from "../apis/API";
import { toast } from "react-toastify";

export const fetchTodos = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_TODOS_REQUEST" });
    try {
      const data = await fetchTodosAPI();
      dispatch({ type: "FETCH_TODOS_SUCCESS", payload: data });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response.data.message);
      }
      dispatch({ type: "FETCH_TODOS_FAILURE", payload: error.message });
    }
  };
};

export const addTodo = (text) => {
  return async (dispatch) => {
    dispatch({ type: "ADD_TODO_REQUEST" });
    try {
      const data = await addTodoAPI(text, false, "5");
      dispatch({ type: "ADD_TODO_SUCCESS", payload: data });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response.data.message);
      }
      dispatch({
        type: "ADD_TODO_FAILURE",
        payload: error.message,
      });
    }
  };
};

export const deleteTodo = (id) => {
  return async (dispatch) => {
    dispatch({ type: "DELETE_TODO_REQUEST", payload: id, error: null });
    try {
      await deleteTodoAPI(id);
      dispatch({
        type: "DELETE_TODO_SUCCESS",
        message: "deleted successfully",
        payload: id,
        error: null,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response.data.message);
      }
      dispatch({ type: "DELETE_TODO_FAILURE", payload: id, error: null });
    }
  };
};

export const updateTodo = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: "UPDATE_TODO_REQUEST", payload: id, error: null });
    try {
      const updatedData = await updateTodoAPI(id, data.completed);
      dispatch({
        type: "UPDATE_TODO_SUCCESS",
        payload: { id, data: updatedData },
        error: null,
        data: updatedData,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response.data.message);
      }
      dispatch({
        type: "UPDATE_TODO_FAILURE",
        payload: error.message,
      });
    }
  };
};
