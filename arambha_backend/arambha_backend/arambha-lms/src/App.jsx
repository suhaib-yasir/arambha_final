import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminUpload from './pages/admin/AdminUpload';
import ChunkedUpload from './pages/admin/ChunkedUpload';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminUpload />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/chunked"
            element={
              <AdminRoute>
                <ChunkedUpload />
              </AdminRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

