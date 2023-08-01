import { useParams } from 'react-router-dom';
import exerciseList, { Exercise } from '@/components/user/record/RecordData';

const countDate: number = new Set(exerciseList.map((item) => item.tagDate))
  .size;

const totalDurationInMinutes: number = exerciseList.reduce(
  (total: number, record: Exercise) => {
    const startTime: any = new Date(record.startTime);
    const endTime: any = new Date(record.endTime);
    const durationInMinutes = (endTime - startTime) / (1000 * 60); // 밀리초를 분으로 변환
    return Math.round(total + durationInMinutes);
  },
  0,
);

const readerCountMap: { [key: string]: number } = {};
exerciseList.forEach((record: Exercise) => {
  const reader = record.reader;

  if (reader in readerCountMap) {
    readerCountMap[reader]++;
  } else {
    readerCountMap[reader] = 1;
  }
});

const readerCountTimeMap: { [key: string]: number } = {};
exerciseList.forEach((record: Exercise) => {
  const reader = record.reader;
  const startTime: any = new Date(record.startTime);
  const endTime: any = new Date(record.endTime);
  const durationInMinutes = (endTime - startTime) / (1000 * 60); // 밀리초를 분으로 변환

  if (reader in readerCountTimeMap) {
    readerCountTimeMap[reader] += durationInMinutes;
  } else {
    readerCountTimeMap[reader] = durationInMinutes;
  }
});

// 가장 많이 이용한 reader 순으로 정렬
const sortedCountReaders = Object.keys(readerCountMap).sort(
  (a: string, b: string) => readerCountMap[b] - readerCountMap[a],
);
const sortedTimeReaders = Object.keys(readerCountTimeMap).sort(
  (a: string, b: string) => readerCountTimeMap[b] - readerCountTimeMap[a],
);
const MonthRecordPage = () => {
  const { month } = useParams();
  return (
    <>
      <div className="w-[350px] h-[620px] bg-white rounded-[15px] ">
        <p className="pt-[10px] text-center fontJeju text-[32px]">
          {month} 월의 통계
        </p>
        <div className="flex justify-between ms-5 me-[120px]">
          <p>총 운동일</p>
          <p>{countDate} 일</p>
        </div>
        <div className="flex justify-between ms-5  me-[120px]">
          <p>총 운동시간</p>
          <p>{totalDurationInMinutes} 분</p>
        </div>
        <div>
          <p>많이 사용한 기구(횟수)</p>
          <div className="flex justify-evenly">
            {sortedCountReaders.map((item) => (
              <div>
                <img
                  className="w-[76px] h-[76px]"
                  src={`/img/equipments/${item}.png`}
                  alt={`${item}.png`}
                />
                <p className="text-center"> {readerCountMap[`${item}`]} 회</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p>많이 사용한 기구(시간)</p>
          <div className="flex justify-evenly">
            {sortedTimeReaders.map((item) => (
              <div>
                <img
                  className="w-[76px] h-[76px]"
                  src={`/img/equipments/${item}.png`}
                  alt={`${item}.png`}
                />
                <p className="text-center">
                  {' '}
                  {Math.round(readerCountTimeMap[`${item}`])} 분
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MonthRecordPage;
