import './waitlistdetail.css';

type EquipList = {
  region: string;
  reader: string;
  name: string;
  gym_code: string;
};

const equipList: EquipList[] = [
  {
    region: 'A',
    reader: 'WW809',
    name: '벤치프레스1',
    gym_code: 'YS1',
  },
  {
    region: 'A',
    reader: 'WW333',
    name: '벤치프레스2',
    gym_code: 'YS1',
  },
  {
    region: 'A',
    reader: 'WW555',
    name: '랫풀다운',
    gym_code: 'YS1',
  },
  {
    region: 'A',
    reader: 'WW129',
    name: '레그프레스',
    gym_code: 'YS1',
  },
  {
    region: 'A',
    reader: 'WW166',
    name: '스쿼트랙',
    gym_code: 'YS1',
  },
  {
    region: 'B',
    reader: 'WW999',
    name: '덤벨',
    gym_code: 'YS1',
  },
  {
    region: 'B',
    reader: 'WW113',
    name: '풀업바',
    gym_code: 'YS1',
  },
  {
    region: 'B',
    reader: 'WW134',
    name: '런닝머신',
    gym_code: 'YS1',
  },
];

const WaitListDetail = () => {
  return (
    <>
      <div>
        <div className="listlinebox flex flex-col flex-wrap mt-[25px] ">
          {equipList.map((item) => (
            <div
              className="w-[685px] h-[186px] bg-CustomGray mx-[70px] my-[35px] rounded-[15px]"
              key={item.reader}
            >
              <ul className="w-[465px] h-[186px] bg-CustomNavy text-white rounded-[15px]">
                {item.name}
                <li className="flex flex-row">
                  <p className="w-[248px]">기구명</p>
                  <p>잔여시간</p>
                </li>
                <li>현재 1555 회원님이 이용중입니다.</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WaitListDetail;
