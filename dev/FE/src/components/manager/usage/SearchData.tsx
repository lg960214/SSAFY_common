import './usagechart.css';
import { useState } from 'react';

type Data = {
  name: string;
  usage: number;
};
const SearchData = () => {
  const itemsPerPage = 3; // 페이지당 표시할 항목의 개수
  const data: Data[] = [
    { name: '벤치프레스', usage: 5 },
    { name: '풀업바', usage: 6 },
    { name: '데드리프트', usage: 15 },
    { name: '랫풀다운', usage: 25 },
    { name: '런닝머신', usage: 35 },
    { name: '레그익스텐션', usage: 65 },
    { name: '레그프레스', usage: 95 },
    { name: '사이클', usage: 50 },
    { name: '스쿼트랙', usage: 25 },
    { name: '천국의계단', usage: 135 },
    { name: '케이블', usage: 25 },
  ];
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지에 해당하는 데이터를 계산하는 함수
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
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
            <li
              className="flex justify-between equipmentbox mx-auto my-6"
              key={item.name}
            >
              <img
                className="w-24 h-24 mt-4 ms-4"
                src={`/img/equipments/${item.name}.png`}
                alt={`${item.name}.png`}
              />
              <p className="fontBungee text-4xl me-12 pt-12">{item.usage}</p>
            </li>
          ))}
        </ul>
        <div className=" flex justify-center fontBungee text-2xl">
          {Array.from(
            { length: Math.ceil(data.length / itemsPerPage) },
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
