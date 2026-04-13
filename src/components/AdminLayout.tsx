import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Hammer, 
  Image as ImageIcon, 
  MessageSquare, 
  Settings as SettingsIcon, 
  LogOut, 
  Menu, 
  X,
  User
} from 'lucide-react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const menuItems = [
  { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
  { name: 'Services', icon: <Hammer size={20} />, href: '/admin/services' },
  { name: 'Réalisations', icon: <ImageIcon size={20} />, href: '/admin/realisations' },
  { name: 'Messages', icon: <MessageSquare size={20} />, href: '/admin/messages' },
  { name: 'Paramètres', icon: <SettingsIcon size={20} />, href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-gray-900 text-white fixed h-full">
        <div className="p-6 border-b border-gray-800">
          <Link to="/admin" className="flex flex-col">
            <span className="text-xl font-bold tracking-tight">Admin Panel</span>
            <span className="text-[10px] uppercase tracking-widest font-medium text-orange-500">
              Guèye & Frères
            </span>
          </Link>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                location.pathname === item.href
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 py-3 mb-4">
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
              {user.email?.[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user.email}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Administrateur</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-64 flex flex-col min-h-screen">
        {/* Header Mobile */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center sticky top-0 z-40">
          <button onClick={() => setIsOpen(true)} className="p-2 text-gray-600">
            <Menu size={24} />
          </button>
          <span className="font-bold text-gray-900">Admin Panel</span>
          <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">
            {user.email?.[0].toUpperCase()}
          </div>
        </header>

        <div className="p-4 md:p-8 flex-grow">
          {children}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-72 bg-gray-900 text-white z-50 lg:hidden flex flex-col"
            >
              <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight">Admin Panel</span>
                  <span className="text-[10px] uppercase tracking-widest font-medium text-orange-500">
                    Guèye & Frères
                  </span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-400">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex-grow p-4 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                      location.pathname === item.href
                        ? 'bg-orange-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-gray-800">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400"
                >
                  <LogOut size={20} />
                  Déconnexion
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
