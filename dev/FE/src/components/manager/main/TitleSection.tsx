import './main.css';

const TitleSection = () => {
  return (
    <div className="flex justify-between mx-auto sectionBackground">
      <div className="m-auto">
        <p className="text-5xl text-center mb-8 fontJeju">최고의 운동 경험을</p>
        <p className="text-6xl fontBungee"> WAIT WEIGHT</p>
      </div>
      <div className="mainImage my-auto">
        <img
          className="rounded-2xl w-full h-full"
          src="/public/img/gym1.png"
          alt="gym1.png"
        />
      </div>
      <div className="sectionfloatbackground"></div>
    </div>
  );
};

export default TitleSection;
