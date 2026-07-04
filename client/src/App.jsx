import React, { useState, useEffect } from 'react';
import Splash from './pages/Splash';
import Login from './pages/Login';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Profile from './pages/Profile';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import Payroll from './pages/Payroll';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeManagement from './pages/EmployeeManagement';
import AttendanceManagement from './pages/AttendanceManagement';
import LeaveApproval from './pages/LeaveApproval';
import PayrollManagement from './pages/PayrollManagement';

export default function App() {
  const [currentPage, setCurrentPage] = useState('Splash');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (currentPage === 'Splash') {
      const timer = setTimeout(() => {
        setCurrentPage('Login');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const navigateTo = (page) => setCurrentPage(page);

  // Structural Navigation Layout wrapper matching high-fidelity sidebar specs
  const Layout = ({ children }) => (
    <div className="flex h-screen bg-brand-lightBg">
      <aside className="w-64 bg-brand-navy text-white flex flex-col justify-between shadow-xl">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-brand-teal border border-white flex items-center justify-center font-bold text-brand-navy">W</div>
            <span className="text-xl font-bold tracking-wider text-brand-lightBg">WorkSphere</span>
          </div>
          <nav className="space-y-2">
            {user?.role === 'Admin' ? (
              <>
                <button onClick={() => navigateTo('AdminDashboard')} className="w-full text-left px-4 py-2.5 rounded hover:bg-opacity-20 hover:bg-white transition">Dashboard</button>
                <button onClick={() => navigateTo('EmployeeManagement')} className="w-full text-left px-4 py-2.5 rounded hover:bg-opacity-20 hover:bg-white transition">Employees</button>
                <button onClick={() => navigateTo('AttendanceManagement')} className="w-full text-left px-4 py-2.5 rounded hover:bg-opacity-20 hover:bg-white transition">Attendance Log</button>
                <button onClick={() => navigateTo('LeaveApproval')} className="w-full text-left px-4 py-2.5 rounded hover:bg-opacity-20 hover:bg-white transition">Leave Approvals</button>
                <button onClick={() => navigateTo('PayrollManagement')} className="w-full text-left px-4 py-2.5 rounded hover:bg-opacity-20 hover:bg-white transition">Payroll Controls</button>
              </>
            ) : (
              <>
                <button onClick={() => navigateTo('EmployeeDashboard')} className="w-full text-left px-4 py-2.5 rounded hover:bg-opacity-20 hover:bg-white transition">Dashboard</button>
                <button onClick={() => navigateTo('Profile')} className="w-full text-left px-4 py-2.5 rounded hover:bg-opacity-20 hover:bg-white transition">My Profile</button>
                <button onClick={() => navigateTo('Attendance')} className="w-full text-left px-4 py-2.5 rounded hover:bg-opacity-20 hover:bg-white transition">Attendance</button>
                <button onClick={() => navigateTo('Leave')} className="w-full text-left px-4 py-2.5 rounded hover:bg-opacity-20 hover:bg-white transition">Apply Leave</button>
                <button onClick={() => navigateTo('Payroll')} className="w-full text-left px-4 py-2.5 rounded hover:bg-opacity-20 hover:bg-white transition">My Payroll</button>
              </>
            )}
          </nav>
        </div>
        <div className="p-6 border-t border-gray-700 bg-black bg-opacity-20">
          <div className="text-sm font-medium mb-2">{user?.name || 'Session Account'}</div>
          <button onClick={() => { setUser(null); navigateTo('Login'); }} className="w-full text-center bg-red-500 bg-opacity-80 hover:bg-opacity-100 py-1.5 rounded text-xs font-semibold tracking-wide transition">Log Out</button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );

  switch (currentPage) {
    case 'Splash': return <Splash />;
    case 'Login': return <Login setUser={setUser} navigateTo={navigateTo} />;
    case 'EmployeeDashboard': return <Layout><EmployeeDashboard user={user} navigateTo={navigateTo} /></Layout>;
    case 'Profile': return <Layout><Profile user={user} /></Layout>;
    case 'Attendance': return <Layout><Attendance user={user} /></Layout>;
    case 'Leave': return <Layout><Leave user={user} /></Layout>;
    case 'Payroll': return <Layout><Payroll user={user} /></Layout>;
    case 'AdminDashboard': return <Layout><AdminDashboard user={user} navigateTo={navigateTo} /></Layout>;
    case 'EmployeeManagement': return <Layout><EmployeeManagement /></Layout>;
    case 'AttendanceManagement': return <Layout><AttendanceManagement /></Layout>;
    case 'LeaveApproval': return <Layout><LeaveApproval /></Layout>;
    case 'PayrollManagement': return <Layout><PayrollManagement /></Layout>;
    default: return <Splash />;
  }
}