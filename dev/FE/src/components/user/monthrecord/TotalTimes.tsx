import { Exercise } from '@/pages/user/RecordPage';
import { RankData } from '@/types/user.type';
import { useEffect, useState } from 'react';
interface TotalTimesProps {
  exerciseList1: Exercise[];
  rankMonth: RankData[];
}
const TotalTimes = ({ exerciseList1, rankMonth }: TotalTimesProps) => {
  const [myRank, setMyRank] = useState<number>(0);
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
  const tokendata = localStorage.getItem('userToken');
  useEffect(() => {
    if (tokendata) {
      const myname = JSON.parse(tokendata).subject;
      const findObj = rankMonth.findIndex((obj) => obj.id === myname);
      setMyRank(findObj + 1);
    }
    if (!exerciseList1) {
      setMyRank(0);
    }
  }, [exerciseList1, rankMonth]);
  return (
    <div className="flex justify-between ms-5  me-[120px] my-10">
      <p>총 운동시간</p>
      <p>
        {totalDurationInMinutes} 분 전체 {myRank}등{' '}
      </p>
    </div>
  );
};

export default TotalTimes;
