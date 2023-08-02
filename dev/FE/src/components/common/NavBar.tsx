import '@/components/common/navbar.css';
import { NavLink } from 'react-router-dom';
import AuthContext from './AuthContext';
import AuthProvider from './AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext, FormEvent, ChangeEvent } from 'react';
import FormInput from './FormInput';
import { useMutation } from '@tanstack/react-query';
import managerLoginApi from '@/api/ManagerLoginAPI';
export default function Root() {
  // 로그인 여부 확인용
  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);

  // 라우터 이동시 해당 라우터에 css 활성화하는 로직 (현재 location 확인하여 비교)
  const [clickedLinks, setClickedLinks] = useState<number>(0);
  const pathList: string[] = ['/member', '/equipment', '/usage', '/waitlist'];
  const currentPath = useLocation().pathname;
  let currentPage: number = pathList.indexOf(currentPath);
  if (currentPage === -1) {
    currentPage = 3;
  }
  const handleAnchorClick = (index: number) => {
    setClickedLinks((): number => {
      return index;
    });
  };

  // 로그인 정보 및 로그인 로직
  const navigate = useNavigate();
  const [managerId, setManagerId] = useState<string>('');
  const [placeName, setPlaceName] = useState<string | null>('');

  const [managerPassword, setManagerPassword] = useState<string>('');

  useEffect(() => {
    const localJSON = localStorage.getItem('managerToken');
    if (localJSON) {
      setPlaceName(JSON.parse(localJSON).name);
    }
    setClickedLinks(currentPage);
  }, []);

  const LoginMutation = useMutation(managerLoginApi, {
    onSuccess: (data) => {
      // 로그인 성공 시 처리할 로직
      const managerToken = {
        token: data.data.token,
        subject: data.data.subject,
        name: data.data.name,
      };
      localStorage.setItem('managerToken', JSON.stringify(managerToken));
      setLoggedIn(true);
      setPlaceName(data.data.name);
      navigate('/member');
      setClickedLinks(0);
    },
    onError: () => {
      // 로그인 실패 시 처리할 로직
      alert('아이디 또는 비밀번호를 확인하세요!');
    },
  });
  const handleManagerLogIn = (event: FormEvent) => {
    event.preventDefault();
    LoginMutation.mutate({ id: managerId, password: managerPassword });
  };

  const handleManagerIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setManagerId(event.target.value);
  };

  const handleManagerPasswordChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setManagerPassword(event.target.value);
  };

  // 로그아웃 로직
  const handleManagerLogout = () => {
    localStorage.removeItem('managerToken');
    setLoggedIn(false);
    navigate('/');
    setManagerId(' ');
    setManagerPassword(' ');
  };

  return (
    <AuthProvider>
      <nav className="flex navbar mx-auto">
        <p className="text-white fontBungee whitespace-pre-line ms-4 mt-1 me-8">
          <span className="text-5xl tracking-widest">WAIT</span> <br />{' '}
          <span className="text-4xl">WEIGHT</span>
        </p>
        {isLoggedIn ? (
          <div className="w-full flex justify-between">
            <ul className="flex text-right">
              <li className="navmenu my-auto mx-4">
                <NavLink
                  to="/member"
                  className={0 === clickedLinks ? 'activeLink' : 'noactive'}
                  onClick={() => handleAnchorClick(0)}
                >
                  회원 관리
                </NavLink>
              </li>
              <li className="navmenu my-auto mx-4">
                <NavLink
                  to="/equipment"
                  className={1 === clickedLinks ? 'activeLink' : 'noactive'}
                  onClick={() => handleAnchorClick(1)}
                >
                  기구 관리
                </NavLink>
              </li>
              <li className="navmenu my-auto mx-4">
                <NavLink
                  to="/usage"
                  className={2 === clickedLinks ? 'activeLink' : 'noactive'}
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
            <ul className="my-auto text-right flex fontJeju text-[20px] text-white">
              <li className="my-auto">{placeName} 님 환영합니다!</li>
              <button
                className="mx-3 text-[24px] bg-CustomNavy"
                onClick={handleManagerLogout}
              >
                <p>로그 아웃</p>
              </button>
            </ul>
          </div>
        ) : (
          <div className="ms-[500px] my-auto">
            <ul className="flex items-center">
              <p className="text-white fontBungee text-2xl mx-3 ">ID</p>
              <FormInput
                type="text"
                value={managerId}
                onChange={handleManagerIdChange}
                placeholder=""
              />
              <p className="text-white fontBungee text-2xl mx-3 ">pw</p>
              <FormInput
                type="password"
                value={managerPassword}
                onChange={handleManagerPasswordChange}
                placeholder=""
              />
              <button
                className="h-30 w-30 border-none bg-CustomNavy text-white text-2xl fontBungee"
                onClick={handleManagerLogIn}
              >
                Login
              </button>
            </ul>{' '}
          </div>
        )}
      </nav>
    </AuthProvider>
  );
}
