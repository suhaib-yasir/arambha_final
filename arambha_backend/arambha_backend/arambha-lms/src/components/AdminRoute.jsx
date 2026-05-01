import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isUserAdmin } from '../services/adminService';

/**
 * AdminRoute - Protects admin routes by checking if user is an admin
 */
export function AdminRoute({ children }) {
  const { currentUser, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setAdminLoading(false);
      return;
    }

    const checkAdmin = async () => {
      try {
        const adminStatus = await isUserAdmin(currentUser.uid);
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setAdminLoading(false);
      }
    };

    checkAdmin();
  }, [currentUser]);

  if (loading || adminLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
