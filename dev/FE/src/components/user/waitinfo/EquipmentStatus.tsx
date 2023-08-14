import { GymEquipments, SearchingData } from '@/types/user.type';

interface EquipmentStatusProps {
  pickEquipment: GymEquipments | null;
  searchingData: SearchingData;
  hour: string;
  minute: string;
}

const EquipmentStatus = ({
  pickEquipment,
  searchingData,
  hour,
  minute,
}: EquipmentStatusProps) => {
  return (
    <>
      <div className="w-[120px] text-black border-r-[1px] border-black/50">
        <div className="font-bold text-center">
          현재 시각
          <br /> {pickEquipment?.name}
        </div>
        <p className="text-center mt-4">
          {!searchingData.now ? 0 : searchingData.now}명 대기중
        </p>
      </div>
      <div className="flex flex-col">
        <div className="font-bold mb-2">
          지난 {hour + '시'}
          {minute === '0' ? '' : ` ${minute}분`} 대기인원
        </div>
        <div className="w-[176px] h-[30px] my-2 border-b-[1px] border-CustomNavy/10">
          {`1주전 : ${!searchingData.week ? 0 : searchingData.week}명`}
        </div>
        <div className="w-[176px] h-[30px] my-2 border-b-[1px] border-CustomNavy/10">
          {`2주전 : ${!searchingData.week2 ? 0 : searchingData.week2}명`}
        </div>
        <div className="w-[176px] h-[30px] my-2 border-b-[1px] border-CustomNavy/10">
          {`3주전 : ${!searchingData.week3 ? 0 : searchingData.week3}명`}
        </div>
      </div>
    </>
  );
};

export default EquipmentStatus;
