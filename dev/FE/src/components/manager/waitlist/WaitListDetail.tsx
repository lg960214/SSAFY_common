import './waitlistdetail.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import waitListApi from '@/api/waitListApi';
export interface EquipList {
  region: string;
  reader: string;
  name: string;
  gymCode: string;
  userId: string;
  waitingList: string[];
  waitingCount: number;
}

const WaitListDetail = () => {
  const [waitEquipList, setWaitEquipList] = useState<EquipList[]>([]);
  const { sectionName } = useParams();
  const handleWait = () => {
    waitListApi(sectionName, setWaitEquipList);
  };
  return (
    <>
      <div>
        <button className="h-2 w-2" onClick={() => handleWait()}>
          눌러
        </button>
        <div className="listlinebox flex flex-col flex-wrap mt-[25px] fontJeju">
          {waitEquipList.map((item) => (
            <div
              className="w-[685px] h-[186px] bg-white mx-[70px] my-[35px] rounded-[15px]"
              key={item.reader}
            >
              <div className="flex">
                <ul className="w-[465px] h-[186px] bg-CustomLightNavy text-white rounded-[15px]  flex flex-col justify-between">
                  <li className="flex flex-row pt-[30px]">
                    <p className="w-[296px]">
                      <p className=" ps-[52px] text-[20px]">기구명</p>
                      <p className="pt-[6px] ps-[55px] text-[32px]">
                        {item.name}
                      </p>
                    </p>
                    <p>
                      <p className="text-[20px]">잔여시간</p>
                      <p className="ps-[3px] pt-[6px] text-[32px]"></p>
                    </p>
                  </li>
                  <li className="mx-12 text-center text-[20px] flex justify-between items-baseline">
                    현재 <br />
                    <p className="text-[32px]">{item.userId}</p> 회원님이
                    이용중입니다.
                  </li>
                </ul>
                <ul className="w-[220px] flex flex-col justify-between text-CustomOrange">
                  <li className="flex flex-wrap justify-between px-5 pt-3 text-center   text-[28px]">
                    {item.waitingList.map((person) => (
                      <p className="w-[80px]">{person} </p>
                    ))}
                  </li>
                  <li className="text-center text-[24px] flex justify-center">
                    <p>{item.waitingCount}</p>명 대기중
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WaitListDetail;
