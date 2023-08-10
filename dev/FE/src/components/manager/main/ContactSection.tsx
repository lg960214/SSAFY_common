import './main.css';

const ContactSection = () => {
  return (
    <>
      <div className="mx-auto h-[400px] w-[1520px] mt-5">
        <div className="absolute w-[1440px] h-96 ms-[40px] bg-CustomOrange z-[-1]"></div>
        <p className="text-5xl font-Jeju pt-24 text-center">
          지금 바로 <span className="font-Bungee">wait weight</span>을 도입하여
          체육관 운영을 혁신하세요!
        </p>
        <p className="font-Jeju text-2xl pt-28 text-center">
          체육관 운영의 효율성을 높이고 회원들에게 최고의 운동 경험을
          선사하세요.
        </p>
      </div>
      <div className="mx-auto mt-20 w-[1520ox] h-[600px] ">
        <div className="mx-auto flex justify-evenly w-[1325px] h-[353px] rounded-[20px] border-solid border-[1px] border-black pt-20 text-center">
          <div>
            <p className="font-Bungee text-3xl">E-mail</p>
            <p className="font-Jeju mt-24 text-xl">ssafy@ssafy.com</p>
          </div>
          <div>
            <p className="font-Bungee text-3xl">TEL</p>
            <p className="font-Jeju mt-24 text-xl">02-1234-5678</p>
          </div>
          <div>
            <p className="font-Bungee text-3xl">ADDRESS</p>
            <p className="font-Jeju mt-20 text-xl">
              대한민국 서울특별시 <br /> 강남구 역삼동 테헤란로 212,
              <br /> 801호
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactSection;
