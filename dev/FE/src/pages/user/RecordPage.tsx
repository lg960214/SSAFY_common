import RecordCalendar from '@/components/user/record/RecordCalendar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Recorddetail from '@/components/user/record/Recorddetail';
const RecordPage = () => {
  const month: string = moment(new Date()).format('MM');
  return (
    <div>
      <RecordCalendar />
      <div className="text-right mt-2 fontJeju">
        <Link to={`/user/record/${month}`}> 이 달의 통계 보러 가기 </Link>
      </div>
      <Recorddetail />
    </div>
  );
};

export default RecordPage;
