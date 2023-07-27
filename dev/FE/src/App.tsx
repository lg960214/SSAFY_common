import './App.css';
import React from 'react';
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

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <>
            <Route path="/" element={<Layout />}>
              <Route path="" element={<MainPage />} />
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
