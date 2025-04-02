import React from "react";

const Userdash = () => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-lg font-semibold border-b border-gray-700">
          Dashboard
        </div>
        <nav>
          <ul>
            <li className="p-4 hover:bg-gray-700 transition-colors">
              <a href="#overview">Overview</a>
            </li>
            <li className="p-4 hover:bg-gray-700 transition-colors">
              <a href="#reports">Reports</a>
            </li>
            <li className="p-4 hover:bg-gray-700 transition-colors">
              <a href="#settings">Settings</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-700">Card 1 Content</p>
          </div>
          {/* Card 2 */}
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-700">Card 2 Content</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-700">Card 3 Content</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Userdash;
