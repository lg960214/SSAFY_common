import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './userNavbar.css';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Modal from './Modal';

const UserNavBar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('userToken');
    navigate('/user/login');
  };
  const currentPath = useLocation().pathname;

  const currentMonth: string = moment(new Date()).format('YYYY-MM');
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    navigate('#modal');
    setIsModal(true);
  };
  const handleCloseModal = () => {
    navigate('#');
    setIsModal(false);
  };
  const location = useLocation();
  useEffect(() => {
    if (location.hash !== '#modal' && isModal) {
      setIsModal(false);
    }
  }, [location]);

  return (
    <div className="fixed bottom-0 w-full">
      {isModal && (
        <Modal isOpen={isModal} onClose={handleCloseModal}>
          <div className="w-[280px] h-[180px] bg-CustomNavy rounded-lg flex flex-wrap justify-evenly">
            <span className="w-[240px] h-[60px] py-10 text-lg font-bold align-middle text-center text-white">
              로그아웃 하시겠습니까?
            </span>
            <div
              className="w-[100px] h-[40px] bg-CustomOrange rounded-2xl flex justify-center items-center text-white font-bold"
              onClick={handleCloseModal}
            >
              아니오
            </div>
            <button
              className="w-[100px] h-[40px] rounded-2xl flex justify-center items-center bg-white text-CustomNavy font-bold"
              onClick={logOut}
            >
              예
            </button>
          </div>
        </Modal>
      )}
      <nav className="h-[60px] bg-CustomNavy text-white userNavbar flex justify-evenly items-center text-center">
        <NavLink
          className={`w-[60px] h-[60px] flex flex-col justify-evenly ${
            currentPath.includes('information') ? 'active' : ''
          }`}
          to="information/"
        >
          {currentPath.includes('information') ? (
            <img
              className="w-[36px] mx-auto"
              src="/img/navbar/on-time_orange.png"
            />
          ) : (
            <img
              className="w-[36px] mx-auto"
              src="/img/navbar/on-time_white.png"
            />
          )}
          <span>실시간현황</span>
        </NavLink>
        <NavLink
          className={`w-[60px] h-[60px] flex flex-col justify-evenly ${
            currentPath.includes('record') &&
            !currentPath.includes('record/' + currentMonth)
              ? 'active'
              : ''
          }`}
          to="record/"
        >
          {currentPath.includes('record/') &&
          !currentPath.includes('record/' + currentMonth) ? (
            <img
              className="w-[36px] mx-auto"
              src="/img/navbar/calendar_orange.png"
            />
          ) : (
            <img
              className="w-[36px] mx-auto"
              src="/img/navbar/calendar_white.png"
            />
          )}
          <span>운동기록</span>
        </NavLink>
        <NavLink
          className={`w-[60px] h-[60px] flex flex-col justify-evenly ${
            currentPath.includes('record/' + currentMonth) ? 'active' : ''
          }`}
          to={`/user/record/${currentMonth}`}
        >
          {currentPath.includes('record/' + currentMonth) ? (
            <img
              className="w-[36px] mx-auto"
              src="/img/navbar/statistical_orange.png"
            />
          ) : (
            <img
              className="w-[36px] mx-auto"
              src="/img/navbar/statistical_white.png"
            />
          )}
          <span>월별통계</span>
        </NavLink>
        <div
          onClick={handleOpenModal}
          className="w-[60px] h-[60px] flex flex-col justify-evenly fontBungee"
        >
          <img
            className="w-[36px] mx-auto"
            src="/img/navbar/sign-out.png"
            alt=""
          />
          <span className="text-xs">로그아웃</span>
        </div>
      </nav>
    </div>
  );
};

export default UserNavBar;
