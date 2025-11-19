import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ConfigurationStep } from './components/steps/ConfigurationStep';
import { ContentStep } from './components/steps/ContentStep';
import { StylingStep } from './components/steps/StylingStep';
import { ExportStep } from './components/steps/ExportStep';
import { useStore } from './store/useStore';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Landing } from './pages/Landing';

const Builder: React.FC = () => {
  const { activeStep } = useStore();

  const renderStep = () => {
    switch (activeStep) {
      case 0: return <ConfigurationStep />;
      case 1: return <ContentStep />;
      case 2: return <StylingStep />;
      case 3: return <ExportStep />;
      default: return <ConfigurationStep />;
    }
  };

  return (
    <Layout>
      {renderStep()}
    </Layout>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-jungle-50">
        <div className="w-8 h-8 border-4 border-jungle-200 border-t-jungle-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/builder"
            element={
              <ProtectedRoute>
                <Builder />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
