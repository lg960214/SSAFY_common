import './App.css';
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import MemberPage from './pages/manager/MemberPage';
import EquipmentPage from './pages/manager/EquipmentPage';
import WaitListPage from './pages/manager/WaitListPage';
import WaitListDetailPage from './pages/manager/WaitListDetailPage';
import MainPage from './pages/manager/MainPage';
import NavBar from './components/common/NavBar';
import UsagePage from './pages/manager/UsagePage';
import AuthProvider from './components/common/AuthProvider';
import AuthContext from './components/common/AuthContext';

const App: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Layout />}>
                <Route path="member" element={<MemberPage />} />
                <Route path="equipment" element={<EquipmentPage />} />
                <Route path="usage" element={<UsagePage />} />
                <Route path="waitlist" element={<WaitListPage />} />
              </Route>
              <Route path="/" element={<NoNavbarLayout />}>
                <Route
                  path="waitlist/:sectionName"
                  element={<WaitListDetailPage />}
                />{' '}
                {/* other routes that do not require Navbar */}
              </Route>
            </>
          ) : (
            <Route path="/" element={<MainPage />} />
          )}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

function NoNavbarLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
