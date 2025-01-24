import { MdDelete } from "react-icons/md";

export default function TasksList({
  loading,
  error,
  pendingTodos,
  completedTodos,
  handleUpdateTodo,
  handleDeleteTodo,
  selectedId,
  isUpdating,
  isDeleting,
  callFetchTodoAPI,
}) {
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-sm p-6 bg-white rounded-lg border border-gray-300 transform transition-all duration-300 scale-95 hover:scale-100">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full animate-bounce">
          <svg
            className="w-8 h-8 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-4.293-3.707a1 1 0 00-1.414 1.414L12.586 10l-1.293 1.293a1 1 0 101.414 1.414L14 11.414l1.293 1.293a1 1 0 001.414-1.414L15.414 10l1.293-1.293a1 1 0 00-1.414-1.414L14 8.586l-1.293-1.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-bold text-center text-gray-800">
          Oops! Something went wrong.
        </h2>
        <p className="mt-2 text-center text-gray-600">{error.message}</p>
        <div className="flex justify-center mt-4">
          <button
            onClick={callFetchTodoAPI}
            className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring focus:ring-green-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pending Tasks */}
      <div className="space-y-1">
        {pendingTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isUpdating={isUpdating}
            isDeleting={isDeleting}
            selectedId={selectedId}
            handleUpdateTodo={handleUpdateTodo}
            handleDeleteTodo={handleDeleteTodo}
          />
        ))}
      </div>

      {/* Completed Section */}
      <div className="mt-6">
        <h2 className="text-gray-600 text-[13px] mb-2">Completed</h2>
        <div className="space-y-1">
          {completedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isUpdating={isUpdating}
              isDeleting={isDeleting}
              selectedId={selectedId}
              handleUpdateTodo={handleUpdateTodo}
              handleDeleteTodo={handleDeleteTodo}
              isCompleted
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TodoItem({
  todo,
  isUpdating,
  isDeleting,
  selectedId,
  handleUpdateTodo,
  handleDeleteTodo,
  isCompleted = false,
}) {
  return (
    <div className="flex items-center justify-between py-2.5 px-4 bg-white hover:bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        {selectedId === todo.id && isUpdating ? (
          <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        ) : (
          <input
            type="checkbox"
            className="w-4 h-4 rounded-full border-2 border-gray-300 text-[#4caf50] focus:ring-[#4caf50]"
            checked={todo.completed}
            onChange={() =>
              handleUpdateTodo(todo.id, {
                completed: !todo.completed,
              })
            }
          />
        )}
        <span
          className={`text-[13px] ${
            isCompleted ? "text-gray-400 line-through" : "text-gray-700"
          }`}
        >
          {todo.todo}
        </span>
      </div>
      <button
        aria-label="Delete todo"
        className="p-1 hover:bg-gray-100 rounded-full"
      >
        {selectedId === todo.id && isDeleting ? (
          <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        ) : (
          <MdDelete
            onClick={() => handleDeleteTodo(todo.id)}
            className="w-4 h-4 text-gray-400"
          />
        )}
      </button>
    </div>
  );
}
