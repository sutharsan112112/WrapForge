import React from 'react';
import { LayoutDashboard, Car, Users, Settings, Box, Wrench, Calendar, UserPlus, PlusCircle, DollarSign } from 'lucide-react';
const AdminDashboard = () => {
  return (
    <div className="flex mt-20 min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-2xl font-bold mb-2">Admin Panel</h2>
        <p className="text-xs text-gray-500 mb-4">Vehicle Service Management</p>
        <nav className="space-y-2">
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          <SidebarItem icon={<Car size={18} />} label="Vehicles" />
          <SidebarItem icon={<Users size={18} />} label="Partners" />
          <SidebarItem icon={<Users size={18} />} label="Customers" />
          <SidebarItem icon={<Wrench size={18} />} label="Services" />
          <SidebarItem icon={<Box size={18} />} label="Inventory" />
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back! Here's what's happening with your business today.</p>
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 transition">Schedule Service</button>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Active Vehicles" value="124" growth="12%" icon={<Car size={20} />} color="bg-indigo-100" />
          <StatCard title="Customers" value="89" growth="8%" icon={<Users size={20} />} color="bg-green-100" />
          <StatCard title="Pending Services" value="34" growth="-3%" icon={<Wrench size={20} />} color="bg-yellow-100" />
          <StatCard title="Monthly Revenue" value="$45,230" growth="15%" icon={<DollarSign size={20} />} color="bg-purple-100" />
        </div>
        {/* Recent Services */}
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">Recent Services</h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2">VEHICLE</th>
                <th>LICENSE PLATE</th>
                <th>CUSTOMER</th>
                <th>SERVICE</th>
                <th>STATUS</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              <ServiceRow vehicle="Toyota Camry" plate="ABC-123" customer="John Smith" service="Oil Change" status="Completed" date="2023-12-01" />
              <ServiceRow vehicle="Honda Civic" plate="XYZ-789" customer="Sarah Johnson" service="Brake Repair" status="In Progress" date="2023-12-02" />
              <ServiceRow vehicle="Ford F-150" plate="DEF-456" customer="Mike Wilson" service="Engine Diagnostic" status="Pending" date="2023-12-03" />
            </tbody>
          </table>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          <ActionButton icon={<PlusCircle size={16} />} label="Add Vehicle" color="bg-indigo-700" />
          <ActionButton icon={<UserPlus size={16} />} label="Add Customers" color="bg-green-600" />
          <ActionButton icon={<Users size={16} />} label="Add Partners" color="bg-fuchsia-600" />
          <ActionButton icon={<Calendar size={16} />} label="Schedule Service" color="bg-orange-600" />
        </div>
      </main>
    </div>
  );
};
const SidebarItem = ({ icon, label, active }) => (
  <div className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${active ? 'bg-indigo-100 font-semibold' : 'hover:bg-gray-100'}`}>
    {icon}
    <span>{label}</span>
  </div>
);
const StatCard = ({ title, value, growth, color, icon }) => (
  <div className={`p-4 ${color} rounded-md shadow-md flex items-center justify-between`}>
    <div>
      <p className="text-xs text-gray-600 mb-1">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
      <p className={`text-sm ${parseFloat(growth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>{growth.startsWith('-') ? '↓' : '↑'} {growth.replace('-', '')}</p>
    </div>
    <div className="text-gray-700">{icon}</div>
  </div>
);
const ServiceRow = ({ vehicle, plate, customer, service, status, date }) => {
  const statusColor = status === 'Completed' ? 'bg-green-100 text-green-700' : status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-700';
  return (
    <tr className="border-b">
      <td className="py-2 font-semibold">{vehicle}</td>
      <td>{plate}</td>
      <td>{customer}</td>
      <td>{service}</td>
      <td><span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>{status}</span></td>
      <td>{date}</td>
    </tr>
  );
};
const ActionButton = ({ icon, label, color }) => (
  <button className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${color} shadow-md hover:opacity-90 transition`}>
    {icon}
    {label}
  </button>
);
export default AdminDashboard;
