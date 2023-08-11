import './main.css';

const TitleSection = () => {
  return (
    <>
      <div className="hidden sm:block">
        <div className="flex justify-between  bg-none mx-auto w-[1520px] h-[600px]">
          <div className="m-auto  text-black opacity-100">
            <p className="text-5xl text-center mb-8 font-Jeju">
              최고의 운동 경험을
            </p>
            <p className="text-6xl font-Bungee"> WAIT WEIGHT</p>
          </div>
          <div className="block my-auto w-[696px] h-[464px] ">
            <img
              className="rounded-2xl w-full h-full"
              src="/img/main/gym1.png"
              alt="gym1.png"
            />
          </div>
        </div>
      </div>
      <div className="block sm:hidden">
        <div className="h-screen absolute w-full top-0 -z-10 moving-background flex justify-center items-center">
          <div className="font-Bungee text-white flex flex-col items-center justify-center text-center mx-auto bg-black/70 w-full h-[160px]">
            <span className="text-3xl font-bold">최고의 운동 경험을</span>
            <div className="h-3"></div>
            <span className="text-4xl">WAIT WEIGHT</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TitleSection;
