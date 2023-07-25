import './App.css';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MemberPage from './pages/manager/MemberPage';
import EquipmentPage from './pages/manager/EquipmentPage';
import UsagePage from './pages/manager/UsagePage';
import WaitListPage from './pages/manager/WaitListPage';
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
        <NavBar />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/member" element={<MemberPage />} />
              <Route path="/equipment" element={<EquipmentPage />} />
              <Route path="/usage" element={<UsagePage />} />
              <Route path="/waitlist" element={<WaitListPage />} />
            </>
          ) : (
            <Route path="/" element={<MainPage />} />
          )}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
