import React from 'react';
import {
  LayoutDashboard, Car, Wrench, Calendar,
  Bell, Search, LogOut
} from 'lucide-react';

const PartnerDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 mt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm p-4 space-y-4" aria-label="Sidebar Navigation">
        <h2 className="text-2xl font-bold mb-1">Partner Panel</h2>
        <p className="text-xs text-gray-500 mb-4">Welcome to your dashboard</p>
        <nav className="space-y-2">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <SidebarItem icon={<Car size={20} />} label="My Vehicles" />
          <SidebarItem icon={<Wrench size={20} />} label="Service History" />
          <SidebarItem icon={<Calendar size={20} />} label="Schedule" />
          <SidebarItem icon={<LogOut size={20} />} label="Logout" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm flex justify-between items-center px-6 py-3">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                aria-label="Search"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>
            <button className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300" aria-label="Notifications">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="px-6 pb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-3">Recent Service Records</h2>
            <table className="w-full text-sm border border-gray-200 border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 border">Vehicle</th>
                  <th className="px-4 py-3 border">Service</th>
                  <th className="px-4 py-3 border">Date</th>
                  <th className="px-4 py-3 border">Status</th>
                </tr>
              </thead>
              <tbody>
                <ServiceRow vehicle="Honda City" service="Oil Change" date="2025-06-20" status="Completed" />
                <ServiceRow vehicle="Suzuki Alto" service="Tire Rotation" date="2025-06-18" status="In Progress" />
                <ServiceRow vehicle="Toyota Prius" service="Engine Check" date="2025-06-15" status="Pending" />
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 -mt-2 mb-4">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-300">
            + Add Sticker
          </button>
        </div>
      </main>
    </div>
  );
};

// Sidebar Button
const SidebarItem = ({ icon, label, active }) => (
  <button
    className={`w-full flex items-center gap-3 p-2 rounded-md transition text-sm
      ${active ? 'bg-indigo-600 text-white font-medium' : 'hover:bg-gray-100 text-gray-700'} 
      focus:outline-none focus:ring-2 focus:ring-indigo-300`}
    aria-current={active ? 'page' : undefined}
    aria-label={label}
  >
    {icon}
    <span className="whitespace-nowrap truncate">{label}</span>
  </button>
);

// Stats Card
const StatCard = ({ title, value, color }) => (
  <div className={`p-4 ${color} rounded-md shadow-sm`}>
    <p className="text-sm text-gray-600">{title}</p>
    <h3 className="text-2xl font-bold">{value}</h3>
  </div>
);

// Table Row
const ServiceRow = ({ vehicle, service, date, status }) => {
  const statusColor =
    status === 'Completed'
      ? 'bg-green-100 text-green-700'
      : status === 'In Progress'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-gray-200 text-gray-700';

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-2 border">{vehicle}</td>
      <td className="px-4 py-2 border">{service}</td>
      <td className="px-4 py-2 border">{date}</td>
      <td className="px-4 py-2 border">
        <span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>
          {status}
        </span>
      </td>
    </tr>
  );
};

export default PartnerDashboard;