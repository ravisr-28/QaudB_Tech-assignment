import axios from "axios";
import { ADD_TODO, DELETE_TODOS, FETCH_TODOS, UPDATE_TODOS } from "./endpoints";

const ERROR_MESSAGE = "There was some error in API";

export const fetchTodosAPI = async () => {
  const { data, status } = await axios.get(FETCH_TODOS);
  if (status != 200) throw Error(ERROR_MESSAGE);
  return data.todos;
};

export const deleteTodoAPI = async (id) => {
  const { status } = await axios.get(`${DELETE_TODOS}${id}`);
  if (status != 200) throw Error(ERROR_MESSAGE);
  return true;
};

export const addTodoAPI = async (todo, completed, userId) => {
  const body = { todo, completed, userId };
  const { data, status } = await axios.post(ADD_TODO, body);
  if (status !== 201) throw Error(ERROR_MESSAGE);
  return data;
};

export const updateTodoAPI = async (id, isComplete) => {
  const { data, status } = await axios.put(`${UPDATE_TODOS}${id}`, {
    completed: isComplete,
  });
  if (status !== 200) throw Error(ERROR_MESSAGE);
  return data;
};
