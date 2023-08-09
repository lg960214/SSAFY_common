import UsageChart from '@/components/manager/usage/UsageChart';
import SearchData from '@/components/manager/usage/SearchData';
import './usagePage.css';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getUsageData } from '@/api/usageDataApi';
import { UsageData } from '@/types/usage.type';
import DropDown from '@/components/common/DropDown';
import DateSelect from '@/components/manager/usage/DateSelect';
import DateRender from '@/components/manager/usage/DateRender';
const UsagePage = () => {
  const [dropdownVisibility, setDropdownVisibility] = useState<boolean>(false);

  const [todayDate, setTodayDate] = useState<dayjs.Dayjs>(dayjs(new Date()));
  const [dailyUsageData, setDailyUsageData] = useState<UsageData[]>([]);

  useEffect(() => {
    getUsageData(todayDate.format('YYYY-MM-DD'), setDailyUsageData);
    setDropdownVisibility(false);
  }, [todayDate]);

  return (
    <>
      <div className="flex mx-auto mainpage">
        <div className="w-1/3 pt-10">
          <SearchData dailyUsageData={dailyUsageData} />
        </div>
        <div className="w-2/3 ">
          <div className="flex h-28 place-content-end me-10 ">
            <DateRender
              todayDate={todayDate}
              setTodayDate={setTodayDate}
              dropdownVisibility={dropdownVisibility}
              setDropdownVisibility={setDropdownVisibility}
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
