import RecordCalendar from '@/components/user/record/RecordCalendar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import RecordDetail from '@/components/user/record/Recorddetail';
import { useState } from 'react';
import WaitTitle from '@/components/user/waitinfo/WaitTitle';

export interface Exercise {
  reader: string;
  name: string;
  userId: string;
  startTime: string;
  endTime: string;
  tagData: string;
}
const RecordPage = () => {
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
  const [pickDate, setPickDate] = useState<string>(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const month: string = moment(new Date()).format('YYYY-MM');
  return (
    <div>
      <WaitTitle text="내 운동기록" />
      <RecordCalendar
        setPickDate={setPickDate}
        setExerciseList={setExerciseList}
        exerciseList={exerciseList}
      />
      <div className="text-right mt-2 fontJeju">
        <Link to={`/user/record/${month}`}> 이 달의 통계 보러 가기 </Link>
      </div>
      <RecordDetail selectedDate={pickDate} exerciseList={exerciseList} />
    </div>
  );
};

export { RecordPage };
