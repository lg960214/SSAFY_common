import './waitlistdetail.css';

type EquipList = {
  region: string;
  reader: string;
  name: string;
  gym_code: string;
  inUse: string;
  waitingList: string[];
  waitingCount: number;
};

const equipList: EquipList[] = [
  {
    region: 'A',
    reader: 'WW809',
    name: '벤치프레스1',
    gym_code: 'YS1',
    inUse: '1555',
    waitingList: ['15', '17', '18', '123', '23423', '1111'],
    waitingCount: 7,
  },
  {
    region: 'A',
    reader: 'WW333',
    name: '벤치프레스2',
    gym_code: 'YS1',
    inUse: '152',
    waitingList: ['125', '116', '517', '718', '5030'],
    waitingCount: 5,
  },
  {
    region: 'A',
    reader: 'WW555',
    name: '랫풀다운',
    gym_code: 'YS1',
    inUse: '15115',
    waitingList: ['515', '116', '217'],
    waitingCount: 3,
  },
  {
    region: 'A',
    reader: 'WW129',
    name: '레그프레스',
    gym_code: 'YS1',
    inUse: '2555',
    waitingList: ['1135', '1623', '1745', '1118', '1234'],
    waitingCount: 5,
  },
  {
    region: 'A',
    reader: 'WW166',
    name: '스쿼트랙',
    gym_code: 'YS1',
    inUse: '6755',
    waitingList: ['1135', '126', '127', '128', '12312'],
    waitingCount: 5,
  },
  {
    region: 'B',
    reader: 'WW999',
    name: '덤벨',
    gym_code: 'YS1',
    inUse: '1785',
    waitingList: ['1512', '1316', '6717', '1843', '123', '123123'],
    waitingCount: 8,
  },
  {
    region: 'B',
    reader: 'WW113',
    name: '풀업바',
    gym_code: 'YS1',
    inUse: '7555',
    waitingList: ['1315', '1632'],
    waitingCount: 2,
  },
  {
    region: 'B',
    reader: 'WW134',
    name: '런닝머신',
    gym_code: 'YS1',
    inUse: '905',
    waitingList: ['1235'],
    waitingCount: 1,
  },
];

const WaitListDetail = () => {
  return (
    <>
      <div>
        <div className="listlinebox flex flex-col flex-wrap mt-[25px] fontJeju">
          {equipList.map((item) => (
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
                      <p className="ps-[3px] pt-[6px] text-[32px]">24m 32s</p>
                    </p>
                  </li>
                  <li className="mx-12 text-center text-[20px] flex justify-between items-baseline">
                    현재 <br />
                    <p className="text-[32px]">{item.inUse}</p> 회원님이
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
