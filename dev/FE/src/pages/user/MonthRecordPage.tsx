import { Exercise } from '@/pages/user/RecordPage';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import recordApi from '@/api/recordApi';
import { RankData } from '@/types/user.type';
import { getRank } from '@/api/rankApi';
import MonthSelect from '@/components/user/monthrecord/MonthSelect';
import TimeStandard from '@/components/user/monthrecord/TimeStandard';
import CountStandard from '@/components/user/monthrecord/CountStandard';
import TotalDays from '@/components/user/monthrecord/TotalDays';
import TotalTimes from '@/components/user/monthrecord/TotalTimes';
import WholeMonthRank from '@/components/user/monthrecord/WholeMonthRank';
import MyRank from '@/components/user/monthrecord/MyRank';

const MonthRecordPage = () => {
  const [searchMonth, setSearchMonth] = useState<dayjs.Dayjs>(
    dayjs(new Date()),
  );
  const [exerciseList1, setExerciseList11] = useState<Exercise[]>([]);
  const [rankMonth, setRankMonth] = useState<RankData[]>([]);

  const resetListData = async () => {
    const response = await recordApi({ date: searchMonth.format('YYYY-MM') });
    setExerciseList11(response);
  };
  const resetRankData = async () => {
    const responserank = await getRank(searchMonth.format('YYYY-MM'));
    setRankMonth(responserank);
  };

  useEffect(() => {
    resetListData();
    resetRankData();
  }, [searchMonth]);

  return (
    <div className="mb-[70px]">
      <div className="flex justify-center mx-auto items-center bg-CustomNavy h-14 text-white rounded-lg">
        <MonthSelect
          searchMonth={searchMonth}
          setSearchMonth={setSearchMonth}
        />
      </div>
      <div className="mx-auto">
        <WholeMonthRank rankMonth={rankMonth} />
        <div className="my-2 border"></div>
        <div className="flex justify-around mt-2 mb-6">
          <div>
            <MyRank rankMonth={rankMonth} />
          </div>
          <div>
            <TotalDays exerciseList1={exerciseList1} />
            <TotalTimes rankMonth={rankMonth} />
          </div>
        </div>
        <CountStandard exerciseList1={exerciseList1} />
        <TimeStandard exerciseList1={exerciseList1} />
      </div>
    </div>
  );
};

export default MonthRecordPage;
