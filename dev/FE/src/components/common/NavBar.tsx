import '@/components/common/navbar.css';
import { NavLink } from 'react-router-dom';
import { useState, useContext } from 'react';
import AuthContext from './AuthContext';
import AuthProvider from './AuthProvider';

export default function Root() {
  const { isLoggedIn } = useContext(AuthContext);
  const [clickedLinks, setClickedLinks] = useState<number>(0);

  const handleAnchorClick = (index: number) => {
    setClickedLinks((): number => {
      return index;
    });
  };
  return (
    <AuthProvider>
      <nav className="flex justify-between navbar mx-auto">
        <p className="text-white fontBungee whitespace-pre-line ms-4 mt-1">
          <span className="text-5xl tracking-widest">WAIT</span> <br />{' '}
          <span className="text-4xl">WEIGHT</span>
        </p>
        {isLoggedIn ? (
          <div className="my-auto">
            <ul className="flex items-center">
              <p className="text-white fontBungee text-2xl mx-3 ">ID</p>
              <input className="inputbox me-4 " type="text" />
              <p className="text-white fontBungee text-2xl mx-3 ">pw</p>
              <input className="inputbox me-4 " type="text" />
              <button className="h-30 w-30 border-none bg-CustomNavy text-white text-2xl fontBungee">
                Login
              </button>
            </ul>
          </div>
        ) : (
          <ul className="flex text-right me-5">
            <li className="navmenu my-auto mx-4">
              <NavLink
                to="/member"
                className={0 == clickedLinks ? 'activeLink' : 'noactive'}
                onClick={() => handleAnchorClick(0)}
              >
                회원 관리
              </NavLink>
            </li>
            <li className="navmenu my-auto mx-4">
              <NavLink
                to="/equipment"
                className={1 == clickedLinks ? 'activeLink' : 'noactive'}
                onClick={() => handleAnchorClick(1)}
              >
                기구 관리
              </NavLink>
            </li>
            <li className="navmenu my-auto mx-4">
              <NavLink
                to="/usage"
                className={2 == clickedLinks ? 'activeLink' : 'noactive'}
                onClick={() => handleAnchorClick(2)}
              >
                이용 현황
              </NavLink>
            </li>
            <li className="navmenu my-auto mx-4">
              <NavLink
                to="/waitlist"
                className={3 == clickedLinks ? 'activeLink' : 'noactive'}
                onClick={() => handleAnchorClick(3)}
              >
                대기 현황
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </AuthProvider>
  );
}
