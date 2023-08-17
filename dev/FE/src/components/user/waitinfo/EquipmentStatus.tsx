import { SearchingData } from '@/types/user.type';

interface EquipmentStatusProps {
  pickEquipment: string;
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
  const date = new Date().getDay();
  const day: { [index: number]: string } = {
    0: '일요일',
    1: '월요일',
    2: '화요일',
    3: '수요일',
    4: '목요일',
    5: '금요일',
    6: '토요일',
  };
  const today = day[date];
  return (
    <>
      <div className="h-[120px] p-4 bg-zinc-200 rounded-lg">
        <div className="font-bold text-center text-xl">
          실시간 {pickEquipment}
        </div>
        <div className="text-center">
          <span className="font-bold text-[3rem] text-CustomOrange mr-2">
            {!searchingData.now ? 0 : searchingData.now}
          </span>
          명 대기중
        </div>
      </div>
      <div className="flex flex-col items-center text-center bg-zinc-200 rounded-lg mt-5 py-4">
        <div className="font-bold text-xl">{today} 대기 기록</div>
        <div className=" w-[280px] h-[40px] my-2 border-b-[1px] border-CustomNavy/10">
          1주전 {hour + '시'} {minute === '0' ? '' : ` ${minute}분`} :{' '}
          <span className="text-CustomOrange text-2xl">
            {!searchingData.week ? 0 : searchingData.week}
          </span>
          명
        </div>
        <div className=" w-[280px] h-[40px] my-2 border-b-[1px] border-CustomNavy/10">
          2주전 {hour + '시'} {minute === '0' ? '' : ` ${minute}분`} :{' '}
          <span className="text-CustomOrange text-2xl">
            {!searchingData.week2 ? 0 : searchingData.week2}
          </span>
          명
        </div>
        <div className=" w-[280px] h-[40px] my-2 border-b-[1px] border-CustomNavy/10">
          3주전 {hour + '시'} {minute === '0' ? '' : ` ${minute}분`} :{' '}
          <span className="text-CustomOrange text-2xl">
            {!searchingData.week3 ? 0 : searchingData.week3}
          </span>
          명
        </div>
      </div>
    </>
  );
};

export default EquipmentStatus;
