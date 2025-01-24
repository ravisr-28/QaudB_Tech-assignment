const initialState = {
  todos: [],
  completedTodos: [],
  pendingTodos: [],
  loading: false,
  error: null,
  selectedId: null,
  isDeleting: false,
  isUpdating: false,
  deleteError: null,
  updateError: null,
  isAddingTodo: false,
  addError: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    

    case "FETCH_TODOS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_TODOS_SUCCESS": {
      const data = filterTodo(action.payload);
      return {
        ...state,
        loading: false,
        ...data,
      };
    }
    case "FETCH_TODOS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "ADD_TODO_REQUEST":
      return { ...state, isAddingTodo: true, error: null, addError: null };

    case "ADD_TODO_SUCCESS":
      const tData = [action.payload, ...state.todos];
      const todos = filterTodo(tData);
      return {
        ...state,
        isAddingTodo: false,
        error: null,
        addError: null,
        ...todos,
      };

    case "ADD_TODO_FAILURE":
      return {
        ...state,
        addError: action.payload,
        isAddingTodo: false,
        error: null,
      };

    case "DELETE_TODO_REQUEST":
      return { ...state, isDeleting: true, selectedId: action.payload };
    case "DELETE_TODO_SUCCESS": {
      const tData = state.todos.filter((todo) => todo.id !== action.payload);
      const todos = filterTodo(tData);
      return {
        ...state,
        isDeleting: false,
        selectedId: null,
        error: null,
        deleteError: null,
        ...todos,
      };
    }
    case "DELETE_TODO_FAILURE":
      return {
        ...state,
        isDeleting: false,
        deleteError: action.payload,
        error: null,
        selectedId: null,
      };

    case "UPDATE_TODO_REQUEST":
      return {
        ...state,
        isUpdating: true,
        selectedId: action.payload,
        error: null,
        updateError: null,
      };

    case "UPDATE_TODO_SUCCESS": {
      const tData = state.todos.map((todo) =>
        todo.id == action.payload.id ? action.payload.data : todo
      );
      const todos = filterTodo(tData);
      return {
        ...state,
        isUpdating: false,
        selectedId: null,
        error: null,
        updateError: null,
        ...todos,
      };
    }
    case "UPDATE_TODO_FAILURE":
      return {
        ...state,
        isUpdating: false,
        error: null,
        updateError: action.payload,
        selectedId: null,
      };

    default:
      return state;
  }
};

export default todoReducer;

const filterTodo = (todos) => {
  const completedTodos = todos.filter((e) => e.completed == true);
  const pendingTodos = todos.filter((e) => e.completed == false);
  return { completedTodos, pendingTodos, todos };
};
