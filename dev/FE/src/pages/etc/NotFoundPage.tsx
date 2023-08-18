import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <div className="mx-auto flex flex-col justify-center items-center">
      <p className="md:text-[5rem] text-[2rem] font-bold">404 NOT FOUND</p>
      <div className="my-6">
        <span className="md:text-[2rem]">
          잘못된 접근입니다. 이전페이지로 되돌아 가주세요
        </span>
      </div>
      <div className="my-6 bg-CustomNavy text-white font-Bungee text-center p-4">
        <span className="md:text-[5rem] text-[2rem] tracking-widest">WAIT</span>
        <br />
        <span className="md:text-[5rem] text-[2rem]">WEIGHT</span>
      </div>
      <div>
        <span onClick={handleClick} className="underline cursor-pointer">
          이전 페이지로 가기
        </span>
      </div>
    </div>
  );
};

export default NotFoundPage;
