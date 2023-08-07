import { UsageData } from '@/types/usage.type';
import './usagechart.css';
import { useState } from 'react';
import ShowData from './ShowData';

interface SearchDataProps {
  dailyUsageData: UsageData[];
}

const SearchData = ({ dailyUsageData }: SearchDataProps) => {
  const itemsPerPage = 3; // 페이지당 표시할 항목의 개수

  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지에 해당하는 데이터를 계산하는 함수
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dailyUsageData.slice(startIndex, endIndex);
  };

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderedData = getCurrentPageData();
  return (
    <>
      <div className="searchbox mx-auto flex flex-col justify-between">
        <p className="fontJeju text-center text-3xl pt-5"> 기구별 검색량</p>
        <ul>
          {renderedData.map((item) => (
            <ShowData renderData={item} key={item.name} />
          ))}
        </ul>
        <div className=" flex justify-center fontBungee text-2xl">
          {Array.from(
            { length: Math.ceil(dailyUsageData.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ),
          )}
        </div>
      </div>
      ;
    </>
  );
};

export default SearchData;
