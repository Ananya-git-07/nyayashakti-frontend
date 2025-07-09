import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          Nyaya <span className="text-secondary">Saathi</span>
        </Link>
        <nav>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center text-gray-700 hover:text-primary">
                <FaTachometerAlt className="mr-2" /> Dashboard
              </Link>
              <button
                onClick={logout}
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors">
              Login / साइन इन करें
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;