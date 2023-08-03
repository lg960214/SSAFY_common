import { NavLink } from 'react-router-dom';
import './userNavbar.css';

const UserNavBar = () => {
  return (
    <div className="fixed bottom-0 w-full">
      <nav className="h-[60px] bg-CustomNavy text-white userNavbar flex justify-evenly items-center text-center">
        <NavLink className="w-[100px]" to="record/">
          내 운동기록
        </NavLink>
        <div className="fontBungee text-xl w-[100px]">
          <p className="tracking-widest">Wait</p>
          <p>Weight</p>
        </div>
        <NavLink className="w-[100px]" to="information/">
          실시간 현황
        </NavLink>
      </nav>
    </div>
  );
};

export default UserNavBar;
