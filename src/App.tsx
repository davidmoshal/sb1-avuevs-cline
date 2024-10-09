import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import { NotificationProvider } from './contexts/NotificationContext';
import Header from './components/Header';
import Footer from './components/Footer';
import MockModeIndicator from './components/MockModeIndicator';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import HostView from './pages/HostView';
import AuctionView from './pages/AuctionView';
import UserProfile from './pages/UserProfile';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import { useAppStore } from './store/store';

function App() {
  const { user } = useAppStore();

  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <div className="min-h-screen bg-gray-100 flex flex-col">
            <MockModeIndicator isMockMode={false} />
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={
                  user ? <Dashboard /> : <Navigate to="/login" />
                } />
                <Route path="/host/:hostId/*" element={
                  <ProtectedRoute>
                    <HostView />
                  </ProtectedRoute>
                } />
                <Route path="/auction/:hostId/:auctionId" element={
                  <ProtectedRoute>
                    <AuctionView />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute allowedRoles={['SYSTEM_ADMIN']}>
                    <AdminPanel />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;