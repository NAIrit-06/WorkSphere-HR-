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
import Logo from './pages/Logo';

export default function App() {
  const [currentPage, setCurrentPage] = useState('Splash');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (currentPage === 'Splash') {
      const timer = setTimeout(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
          setCurrentPage(parsed.role === 'Admin' ? 'AdminDashboard' : 'EmployeeDashboard');
        } else {
          setCurrentPage('Login');
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const navigateTo = (page) => setCurrentPage(page);

  // Clear session data on logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigateTo('Login');
  };

  // Structural Navigation Layout wrapper matching high-fidelity sidebar specs
  const Layout = ({ children }) => {
    const navItemClass = (pageName) => {
      const isActive = currentPage === pageName;
      return `w-full text-left px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center space-x-3 border-l-4 ${
        isActive 
          ? 'bg-brand-teal/10 border-brand-teal text-brand-teal shadow-inner' 
          : 'border-transparent text-gray-300 hover:bg-white/5 hover:text-white hover:border-white/20'
      }`;
    };

    return (
      <div className="flex h-screen bg-brand-lightBg font-sans overflow-hidden">
        <aside className="w-64 bg-gradient-to-b from-brand-navyDark to-brand-navy text-white flex flex-col justify-between shadow-2xl z-20 border-r border-white/5">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-white/10">
              <Logo className="w-8 h-8 text-white" showText={true} textClassName="text-lg font-bold tracking-wider text-white" />
            </div>
            
            <nav className="space-y-1.5">
              {user?.role === 'Admin' ? (
                <>
                  <button onClick={() => navigateTo('AdminDashboard')} className={navItemClass('AdminDashboard')}>
                    <span>📊</span> <span>Dashboard</span>
                  </button>
                  <button onClick={() => navigateTo('EmployeeManagement')} className={navItemClass('EmployeeManagement')}>
                    <span>👥</span> <span>Employees</span>
                  </button>
                  <button onClick={() => navigateTo('AttendanceManagement')} className={navItemClass('AttendanceManagement')}>
                    <span>📅</span> <span>Attendance Log</span>
                  </button>
                  <button onClick={() => navigateTo('LeaveApproval')} className={navItemClass('LeaveApproval')}>
                    <span>⚖️</span> <span>Leave Approvals</span>
                  </button>
                  <button onClick={() => navigateTo('PayrollManagement')} className={navItemClass('PayrollManagement')}>
                    <span>💵</span> <span>Payroll Controls</span>
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => navigateTo('EmployeeDashboard')} className={navItemClass('EmployeeDashboard')}>
                    <span>📊</span> <span>Dashboard</span>
                  </button>
                  <button onClick={() => navigateTo('Profile')} className={navItemClass('Profile')}>
                    <span>👤</span> <span>My Profile</span>
                  </button>
                  <button onClick={() => navigateTo('Attendance')} className={navItemClass('Attendance')}>
                    <span>⏱️</span> <span>Attendance</span>
                  </button>
                  <button onClick={() => navigateTo('Leave')} className={navItemClass('Leave')}>
                    <span>📝</span> <span>Apply Leave</span>
                  </button>
                  <button onClick={() => navigateTo('Payroll')} className={navItemClass('Payroll')}>
                    <span>💸</span> <span>My Payroll</span>
                  </button>
                </>
              )}
            </nav>
          </div>
          
          <div className="p-6 border-t border-white/10 bg-black/10 backdrop-blur-sm flex flex-col gap-3">
            <div className="flex items-center space-x-3">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" 
                alt="Avatar" 
                className="w-9 h-9 rounded-xl border border-white/20 object-cover" 
              />
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{user?.role || 'User'}</div>
                <div className="text-sm font-semibold text-white truncate max-w-[150px]">{user?.name || 'Session Account'}</div>
              </div>
            </div>
            
            <button 
              onClick={handleLogout} 
              className="w-full text-center bg-red-500/20 hover:bg-red-500 text-red-200 hover:text-white py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 border border-red-500/30 hover:border-red-500"
            >
              Sign Out Securely
            </button>
          </div>
        </aside>
        
        <main className="flex-1 overflow-y-auto p-8 relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="relative z-10 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    );
  };

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