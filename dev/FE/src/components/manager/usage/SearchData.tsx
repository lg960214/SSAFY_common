import { UsageData } from '@/types/usage';
import './usagechart.css';
import { useState } from 'react';

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
  console.log(renderedData);
  return (
    <>
      <div className="searchbox mx-auto flex flex-col justify-between">
        <p className="fontBungee text-center text-3xl pt-5"> Search data</p>
        <ul>
          {renderedData.map((item) => (
            <li className="flex equipmentbox mx-auto my-6" key={item.name}>
              <img
                className="w-24 h-24 mt-4 ms-4"
                src={`/img/equipments/${item.name.replace(/[0-9]/g, '')}.png`}
                alt={`${item.name.replace(/[0-9]/g, '')}.png`}
              />
              <li className="ms-[15px] w-[110px]">
                <p className="fontJeju text-[20px] text-center pt-[20px]">
                  {item.name}
                </p>
                <p className="fontBungee text-4xl pt-[20px] text-center">
                  {item.searchCount}
                </p>
              </li>
            </li>
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
