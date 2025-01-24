import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./Component/Login.jsx";
import TodoList from "./Component/TodoList.jsx";
import todoReducer from "./reducers/todoReducers.js";
import { combineReducers } from "redux";
import { Provider } from "react-redux";
import store from "./store/Store.js";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/todo",
    element: <TodoList />,
  },
]);

export default combineReducers({
  todos: todoReducer,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>

    <ToastContainer />
  </React.StrictMode>
);
