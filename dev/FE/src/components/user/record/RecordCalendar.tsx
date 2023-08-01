import { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css'; // css import
import exerciseList from './RecordData';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
interface RecordCalendarProps {
  setPickDate: React.Dispatch<React.SetStateAction<string>>;
}

const RecordCalendar = ({ setPickDate }: RecordCalendarProps) => {
  const [today, onChange] = useState<Value>(new Date());

  const handleDateClick = (date: Date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setPickDate(formattedDate);
  };
  return (
    <div className="pt-[10px]">
      <Calendar
        className=" mx-auto border-white  bg-white rounded-[15px]"
        onChange={onChange}
        onClickDay={handleDateClick} // 날짜 클릭시 handleDateClick 함수를 실행
        formatDay={(locale, date) => moment(date).format('DD')} // 날'일' 제외하고 숫자만 보이도록 설정
        minDetail="month"
        maxDetail="month"
        value={today}
        showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
        tileContent={({ date }) => {
          let html = [];
          if (
            exerciseList.find(
              (x) => x.tagDate === moment(date).format('YYYY-MM-DD'),
            )
          ) {
            html.push(
              <div
                key={date.toString()}
                className="dot w-2 h-2 bg-green-500 rounded-full mx-auto"
              />,
            );
          } else {
            html.push(<div key={date.toString()} className="w-2 h-2" />);
          }
          return (
            <>
              <div>{html}</div>
            </>
          );
        }}
      />
    </div>
  );
};

export default RecordCalendar;
