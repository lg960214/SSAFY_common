const NotFoundPage = () => {
  return (
    <div className="mx-auto flex flex-col justify-center items-center">
      <p className="md:text-[5rem] text-[2rem] font-bold">404 NOT FOUND</p>
      <div className="my-6">
        <span className="md:text-[3rem]">
          잘못된 접근입니다. 이전페이지로 되돌아 가주세요
        </span>
      </div>
      <div className="my-6 bg-CustomNavy text-white text-center p-4">
        <span className="md:text-[5rem] text-[2rem] fontBungee">WAIT</span>
        <br />
        <span className="fontBungee md:text-[5rem] text-[2rem]">WEIGHT</span>
      </div>
    </div>
  );
};

export default NotFoundPage;
