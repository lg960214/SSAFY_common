import { EquipList, ReaderStateType } from '@/types/wait.type';
import { useEffect, useState } from 'react';

interface WaitCardProps {
  data: EquipList;
  state: ReaderStateType;
}

const WaitCard = ({ data, state }: WaitCardProps) => {
  const [minutes, setMinutes] = useState<number>(20);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    // 초마다 시간 업데이트
    const intervalId = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        // 타이머 종료
        clearInterval(intervalId);
      } else {
        if (seconds === 0) {
          // 분이 감소할 때
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          // 초가 감소할 때
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }
    }, 1000); // 1000ms = 1초

    // 컴포넌트가 언마운트될 때 interval 정리
    return () => clearInterval(intervalId);
  }, [minutes, seconds]);

  return (
    <div className="flex w-[685px] h-[186px] bg-white mx-[70px] mb-[35px] rounded-[15px]">
      <div className="w-[465px] h-[186px] bg-CustomLightNavy text-white rounded-[15px]  flex flex-col justify-between items-center">
        <div className="flex justify-between mt-5 w-[350px] text-xl">
          <span>기구명</span>
          <span>잔여시간</span>
        </div>
        <div className="flex justify-between w-[350px] text-3xl">
          <span className="font-inter">{data.name}</span>
          <span className="font-extrabold">
            {minutes} : {seconds}
          </span>
        </div>
        <div className="pt-10 pb-5">
          <span className="text-xl">현재</span>
          <span className="text-4xl mx-5">{data.userId}</span>
          <span className="text-xl">회원님이 이용중입니다.</span>
        </div>
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
