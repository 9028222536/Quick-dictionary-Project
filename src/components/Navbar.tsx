import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Book, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold">Quick Dictionary</span>
          </Link>

          <div className="flex items-center space-x-4">
            <NavLink to="/dictionary">Dictionary</NavLink>
            <NavLink to="/translator">Translator</NavLink>
            <NavLink to="/grammar">Grammar</NavLink>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, {user.name}</span>
                <button
                  onClick={logout}
                  className="flex items-center text-red-600 hover:text-red-800"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
    >
      {children}
    </Link>
  );
}