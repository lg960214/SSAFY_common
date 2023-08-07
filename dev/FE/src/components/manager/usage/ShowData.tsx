import { UsageData } from '@/types/usage.type';

interface ShowDataProps {
  renderData: UsageData;
}

const ShowData = ({ renderData }: ShowDataProps) => {
  return (
    <>
      <div className="flex equipmentbox mx-auto my-6" key={renderData.name}>
        <img
          className="w-24 h-24 mt-4 ms-4"
          src={`/img/equipments/${renderData.name.replace(/[0-9]/g, '')}.png`}
          alt={`${renderData.name.replace(/[0-9]/g, '')}.png`}
        />
        <div className="ms-[15px] w-[110px]">
          <p className="fontJeju text-[20px] text-center pt-[20px]">
            {renderData.name}
          </p>
          <p className="fontBungee text-4xl pt-[20px] text-center">
            {renderData.searchCount}
          </p>
        </div>
      </div>
    </>
  );
};

export default ShowData;
