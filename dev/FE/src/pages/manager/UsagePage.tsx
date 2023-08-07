import UsageChart from '@/components/manager/usage/UsageChart';
import SearchData from '@/components/manager/usage/SearchData';
import './usagePage.css';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getUsageData } from '@/api/usageDataApi';
import { UsageData } from '@/types/usage.type';
import DropDown from '@/components/common/DropDown';
import DateSelect from '@/components/manager/usage/DateSelect';
const UsagePage = () => {
  const [dropdownVisibility, setDropdownVisibility] = useState<boolean>(false);

  const [todayDate, setTodayDate] = useState(dayjs(new Date()));
  const [dailyUsageData, setDailyUsageData] = useState<UsageData[]>([]);

  useEffect(() => {
    getUsageData(todayDate.format('YYYY-MM-DD'), setDailyUsageData);
    setDropdownVisibility(false);
  }, [todayDate]);

  const handleDate = (index: number) => {
    if (index == 0) {
      setTodayDate(() => {
        return todayDate.add(-1, 'day');
      });
    } else {
      setTodayDate(() => {
        return todayDate.add(1, 'day');
      });
    }
    return todayDate;
  };

  return (
    <>
      <div className="flex mx-auto mainpage">
        <div className="w-1/3 pt-10">
          <SearchData dailyUsageData={dailyUsageData} />
        </div>
        <div className="w-2/3 ">
          <div className="flex h-28 place-content-end me-10 ">
            <img
              className="mt-20 w-10 h-10"
              src="img/usage/left_circle.png"
              alt="left_circle"
              onClick={() => handleDate(0)}
            />
            <p
              className="mx-2 pt-20 fontBungee text-3xl"
              onClick={() => setDropdownVisibility(!dropdownVisibility)}
            >
              {todayDate.format('MM - DD')}
            </p>
            <img
              className="mt-20 w-10 h-10"
              src="img/usage/right_circle.png"
              alt="right_circle"
              onClick={() => handleDate(1)}
            />
            <div className="absolute bg-white z-10  top-[230px] ">
              <DropDown visibility={dropdownVisibility}>
                <DateSelect setTodayDate={setTodayDate} />
              </DropDown>
            </div>
          </div>

          <div className="mx-auto mt-5">
            <UsageChart dailyUsageData={dailyUsageData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UsagePage;
