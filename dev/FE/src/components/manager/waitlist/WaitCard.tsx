import { EquipList, ReaderStateType } from '@/types/wait.type';
import Timer from './Timer';

interface WaitCardProps {
  data: EquipList;
  state?: ReaderStateType;
}

const WaitCard = ({ data, state }: WaitCardProps) => {
  let infoStatement;
  if (state === 'empty') {
    infoStatement = (
      <div className="pt-10 pb-5">
        <span className="text-xl">현재 사용자가 없습니다.</span>
      </div>
    );
  } else if (state === 'using') {
    infoStatement = (
      <div className="pt-7 pb-5">
        <span className="text-xl">현재</span>
        <span className="text-4xl mx-5">{data.userId}</span>
        <span className="text-xl">회원님이 이용중입니다.</span>
      </div>
    );
  } else if (state === 'waitnext') {
    infoStatement = (
      <div className="pt-7 pb-5">
        <span className="text-xl">현재</span>
        <span className="text-4xl mx-5">{data.waitingList[0]}</span>
        <span className="text-xl">님을 기다리고 있습니다.</span>
      </div>
    );
  }
  return (
    <div className="flex w-[685px] h-[186px] bg-white mx-[70px] mb-[35px] rounded-[15px]">
      <div className="w-[465px] h-[186px] bg-CustomLightNavy text-white rounded-[15px]  flex flex-col justify-between items-center">
        <div className="flex justify-between mt-5 w-[350px] text-xl">
          <span>기구명</span>
          <span>잔여시간</span>
        </div>
        <div className="flex justify-between w-[350px] text-3xl">
          <span className="font-inter">{data.name}</span>
          {state === 'waitnext' ? (
            <span className="text-2xl text-red-400">2분 초과 시 Pass</span>
          ) : (
            <Timer data={data} />
          )}
        </div>
        {infoStatement}
      </div>
      <div className="w-[220px] flex flex-col justify-between text-CustomOrange">
        <div className="flex flex-wrap justify-between px-5 pt-3 text-center text-[28px]">
          {data.waitingList.map((person) => (
            <span key={person} className="w-[80px]">
              {person}
            </span>
          ))}
        </div>
        <div className="text-center text-[24px] flex justify-center">
          <span>{data.waitingCount}</span>명 대기중
        </div>
      </div>
    </div>
  );
};

export default WaitCard;
