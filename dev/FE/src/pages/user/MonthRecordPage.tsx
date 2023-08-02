import { useParams } from 'react-router-dom';
import { Exercise } from '@/pages/user/RecordPage';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import recordApi from '@/api/recordApi';
const MonthRecordPage = () => {
  const { month } = useParams();
  const [searchMonth, setSearchMonth] = useState<string | undefined>(month);
  const handleMonth = (index: number) => {
    if (index === 0 && searchMonth != undefined) {
      setSearchMonth(
        moment(
          searchMonth.slice(0, 5) +
            (parseInt(searchMonth.slice(5, 7)) - 1).toString(),
        ).format('YYYY-MM'),
      );
    }
    if (index === 1 && searchMonth != undefined) {
      setSearchMonth(
        moment(
          searchMonth.slice(0, 5) +
            (parseInt(searchMonth.slice(5, 7)) + 1).toString(),
        ).format('YYYY-MM'),
      );
    }
  };

  const [exerciseList1, setExerciseList11] = useState<Exercise[]>([]);
  const { data } = useQuery<Exercise[]>(['records', searchMonth], async () => {
    // month가 null인 경우에 대한 예외 처리

    const response = await recordApi({ date: searchMonth });
    setExerciseList11(response);
    return response;
  });
  const countDate: number = new Set(exerciseList1.map((item) => item.tagData))
    .size;

  const totalDurationInMinutes: number = exerciseList1.reduce(
    (total: number, record: Exercise) => {
      const startTime: any = new Date(record.startTime);
      const endTime: any = new Date(record.endTime);
      let durationInMinutes = (endTime - startTime) / (1000 * 60); // 밀리초를 분으로 변환
      if (record.endTime === null) {
        durationInMinutes = 0;
      }
      return Math.round(total + durationInMinutes);
    },
    0,
  );

  const readerCountMap: { [key: string]: number } = {};
  exerciseList1.forEach((record: Exercise) => {
    const tmpReader = record.name;
    const reader = tmpReader.replace(/\d+/g, '');

    if (reader in readerCountMap) {
      readerCountMap[reader]++;
    } else {
      readerCountMap[reader] = 1;
    }
  });

  const readerCountTimeMap: { [key: string]: number } = {};
  exerciseList1.forEach((record: Exercise) => {
    if (record.endTime != null) {
      const tmpReader = record.name;
      const reader = tmpReader.replace(/\d+/g, '');
      const startTime: any = new Date(record.startTime);
      const endTime: any = new Date(record.endTime);
      const durationInMinutes = (endTime - startTime) / (1000 * 60); // 밀리초를 분으로 변환

      if (reader in readerCountTimeMap) {
        readerCountTimeMap[reader] += durationInMinutes;
      } else {
        readerCountTimeMap[reader] = durationInMinutes;
      }
    }
  });

  // 가장 많이 이용한 reader 순으로 정렬
  const sortedCountReaders = Object.keys(readerCountMap).sort(
    (a: string, b: string) => readerCountMap[b] - readerCountMap[a],
  );
  const sortedTimeReaders = Object.keys(readerCountTimeMap).sort(
    (a: string, b: string) => readerCountTimeMap[b] - readerCountTimeMap[a],
  );
  return (
    <>
      <div className="w-[350px] h-[620px] bg-white rounded-[15px] ">
        <div className="flex justify-center">
          <button onClick={() => handleMonth(0)}> {`<`} </button>
          <p className="pt-[10px] text-center fontJeju text-[32px]">
            {searchMonth?.slice(5, 7)} 월의 통계
          </p>
          <button onClick={() => handleMonth(1)}> {`>`} </button>
        </div>
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
