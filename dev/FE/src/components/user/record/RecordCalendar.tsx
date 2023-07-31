import { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import './recordcalendar.css';
import 'react-calendar/dist/Calendar.css'; // css import

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const RecordCalendar = () => {
  const [today, onChange] = useState<Value>(new Date());
  interface Day {
    day: string;
  }
  const data: Day[] = [
    { day: '2023-07-29' },
    { day: '2023-07-22' },
    { day: '2023-07-10' },
  ];

  return (
    <div className="pt-[10px]">
      <Calendar
        className=" mx-auto border-white  bg-white rounded-[15px]"
        onChange={onChange}
        formatDay={(locale, date) => moment(date).format('DD')} // 날'일' 제외하고 숫자만 보이도록 설정
        minDetail="month"
        maxDetail="month"
        value={today}
        showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
        tileContent={({ date }) => {
          let html = [];
          if (data.find((x) => x.day === moment(date).format('YYYY-MM-DD'))) {
            html.push(<div key={date.toString()} className="dot mx-auto" />);
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
