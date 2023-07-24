import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Tmp from './pages/Tmp';
import Contact from './pages/Contact';
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
              <Route path="/member" element={<Main />} />
              <Route path="/equipment" element={<Tmp />} />
              <Route path="/usage" element={<UsagePage />} />
              <Route path="/waitlist" element={<Contact />} />
            </>
          ) : (
            <Route path="/" element={<Main />} />
          )}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
