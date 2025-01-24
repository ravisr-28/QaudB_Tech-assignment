import { useEffect, useState } from "react";
import {
  IoNotifications,
  IoRepeat,
  IoCalendar,
  IoAdd,
  IoStar,
  IoList,
  IoPeople,
  IoLogOut,
  IoMenu,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "../store/todoActions";
import { MdDelete } from "react-icons/md";
import { Navigate, useNavigate } from "react-router";
import { logoutUser } from "../store/userAction";
import Sidebar from "./Sidebar";
import TasksList from "./TasksList";

export default function Dashboard() {
  const [text, setText] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    completedTodos,
    pendingTodos,
    loading,
    error,
    isDeleting,
    selectedId,
    isUpdating,
    isAddingTodo,
  } = useSelector((state) => state.todos);

  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    callFetchTodoAPI();
  }, [dispatch]);

  const handleAddTodo = () => {
    const isValid = text.trim().length > 0;
    if (isValid) {
      // console.log(text);
      dispatch(addTodo(text));
      setText("");
    }
  };

  const callFetchTodoAPI = () => dispatch(fetchTodos());

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdateTodo = (id, data) => {
    // TODO: We can also pass other key value like todo and priority
    // for now i am only passing completed key with true/false value for change status of todo
    dispatch(updateTodo(id, data));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-[#fafafa] relative">
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md md:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <IoMenu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <Sidebar
        user={user}
        handleLogout={handleLogout}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-4 md:px-8 pt-16 md:pt-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-[22px] text-gray-800 font-medium">To Do</h1>
        </div>

        {/* Add Task Input */}
        <div className="mb-4 w-full h-fit bg-gradient-to-br from-green-50 to-green-200 rounded-lg p-4">
          <input
            type="text"
            placeholder="Add A Task"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-16 md:h-24 px-4 bg-transparent rounded-lg outline-none text-[13px]"
            disabled={isAddingTodo}
          />

          {/* Priority Selector and Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <select className="text-sm px-3 py-1 text-gray-700 bg-green-100 border border-green-200 rounded-md focus:outline-none w-full md:w-28">
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>

            <div className="flex justify-between w-full">
              <div className="flex gap-1">
                <ActionButton
                  icon={<IoNotifications />}
                  label="Notifications"
                />
                <ActionButton icon={<IoRepeat />} label="Refresh" />
                <ActionButton icon={<IoCalendar />} label="Calendar" />
              </div>

              <button
                onClick={handleAddTodo}
                className="border px-4 bg-green-100 rounded-lg"
                disabled={isAddingTodo}
              >
                {isAddingTodo ? (
                  <div className="w-5 h-5 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Add Tasks"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tasks Lists */}
        <TasksList
          loading={loading}
          error={error}
          pendingTodos={pendingTodos}
          completedTodos={completedTodos}
          handleUpdateTodo={handleUpdateTodo}
          handleDeleteTodo={handleDeleteTodo}
          selectedId={selectedId}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
          callFetchTodoAPI={callFetchTodoAPI}
        />
      </div>
    </div>
  );
}

function ActionButton({ icon, label }) {
  return (
    <button aria-label={label} className="p-2 hover:bg-gray-100 rounded-full">
      <span className="w-5 h-5 text-gray-600">{icon}</span>
    </button>
  );
}

const tasks = [
  "Buy groceries",
  "Finish project report",
  "Call the bank",
  "Schedule dentist appointment",
  "Plan weekend trip",
];

const completedTasks = [
  "Read a book",
  "Clean the house",
  "Prepare presentation",
  "Update blog",
];
