import {
  IoAdd,
  IoCalendar,
  IoList,
  IoLogOut,
  IoPeople,
  IoStar,
} from "react-icons/io5";

export default function Sidebar({
  user,
  handleLogout,
  isSidebarOpen,
  closeSidebar,
}) {
  return (
    <div
      className={`fixed md:relative w-[280px] bg-white border-r border-green-200 h-full transition-all duration-300 z-50 
      ${isSidebarOpen ? "left-0" : "-left-full md:left-0"}`}
    >
      {/* Close button for mobile */}
      <button
        className="absolute right-2 top-2 p-2 md:hidden"
        onClick={closeSidebar}
      >
        ✕
      </button>

      {/* User Profile */}
      <div className="bg-green-50 p-4">
        <div className="mb-8">
          <div className="flex flex-col items-center gap-3">
            <img
              src="https://i.pinimg.com/736x/97/31/02/9731022f0be7c965e880505461643850.jpg"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <h2 className="text-[15px] text-gray-700 font-medium">
              <span className="font-bold">{user.email}</span>
            </h2>
            <button onClick={handleLogout} className="hover:text-gray-600">
              <IoLogOut />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 bg-white p-2">
          <NavButton icon={<IoList />} label="All Tasks" />
          <NavButton icon={<IoCalendar />} label="Today" active />
          <NavButton icon={<IoStar />} label="Important" />
          <NavButton icon={<IoCalendar />} label="Planned" />
          <NavButton icon={<IoPeople />} label="Assigned to me" />
        </nav>

        {/* Add List Button */}
        <button
          aria-label="Add new list"
          className="w-full flex items-center gap-3 px-3 py-5 text-gray-700 bg-white rounded-lg mt-3 text-[13px]"
        >
          <IoAdd className="w-[18px] h-[18px]" />
          <span>Add list</span>
        </button>

        {/* Stats Card */}
        <StatsCard />
      </div>
    </div>
  );
}

function NavButton({ icon, label, active }) {
  return (
    <button
      aria-label={label}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] 
        ${
          active
            ? "bg-[#e8f5e9] text-[#2e7d32] font-medium"
            : "text-gray-700 hover:bg-[#e8f5e9]"
        }`}
    >
      <span className="w-[18px] h-[18px]">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function StatsCard() {
  return (
    <div className="mt-8 bg-white p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-[13px] text-gray-600">Today Tasks</h3>
        <span className="text-[13px] text-gray-500">11</span>
      </div>
      <div className="relative w-full aspect-square bg-white rounded-full border-[20px] border-[#4caf50]/20">
        <div className="absolute inset-0 border-[20px] border-[#4caf50] rounded-full border-t-transparent border-r-transparent rotate-45" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-[11px] text-gray-500">Pending</div>
            <div className="text-[11px] text-gray-500">Done</div>
          </div>
        </div>
      </div>
    </div>
  );
}
