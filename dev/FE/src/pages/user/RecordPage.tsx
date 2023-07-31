import RecordCalendar from '@/components/user/record/RecordCalendar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import RecordDetail from '@/components/user/record/Recorddetail';
import { useState } from 'react';
const RecordPage = () => {
  const month: string = moment(new Date()).format('MM');
  const [pickDate, setPickDate] = useState<string>(
    moment(new Date()).format('YYYY-MM-DD'),
  );
  console.log(pickDate);
  return (
    <div>
      <RecordCalendar setPickDate={setPickDate} />
      <div className="text-right mt-2 fontJeju">
        <Link to={`/user/record/${month}`}> 이 달의 통계 보러 가기 </Link>
      </div>
      <RecordDetail selectedDate={pickDate} />
    </div>
  );
};

export default RecordPage;
