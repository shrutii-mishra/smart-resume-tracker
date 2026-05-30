import React from "react";
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UploadView from './views/UploadView';
import CompareView from './views/CompareView';
import VersionsView from './views/VersionsView';
import ProfileView from './views/ProfileView';
import HomeView from './views/HomeView';

const viewPanel = (active, viewKey, children) => (
  <div
    className={active === viewKey ? 'block flex-1' : 'hidden'}
    aria-hidden={active !== viewKey}
  >
    {children}
  </div>
);

const AppContent = () => {
  const [currentView, setCurrentView] = React.useState('home');
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-white transition ease-in-out duration-150">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex flex-col">
      <Navbar onNavigate={setCurrentView} currentView={currentView} />

      {/* Keep all tabs mounted so your work is not lost when switching */}
      {viewPanel(currentView, 'home', (
        <HomeView onNavigate={setCurrentView} />
      ))}

      {viewPanel(currentView, 'upload', <UploadView />)}
      {viewPanel(currentView, 'compare', <CompareView />)}
      {viewPanel(currentView, 'versions', <VersionsView />)}

      {viewPanel(currentView, 'profile', (
        isAuthenticated ? (
          <ProfileView />
        ) : (
          <main className="flex-1 pt-16 pb-24 flex items-center justify-center">
            <p className="text-gray-600">Profile is only available when signed in.</p>
          </main>
        )
      ))}

      {currentView !== 'home' && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
