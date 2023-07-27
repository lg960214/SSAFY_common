import { useState } from 'react';

const TagLists = () => {
  const dummyTagList: string[] = [];
  for (let i = 1; i < 40; i++) {
    if (i < 10) {
      dummyTagList.push('TG00' + i.toString());
    } else {
      dummyTagList.push('TG0' + i.toString());
    }
  }
  const itemsPerPage = 28; // 페이지당 표시할 항목의 개수
  const [currentPage, setCurrentPage] = useState(1);
  // 현재 페이지에 해당하는 데이터를 계산하는 함수
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dummyTagList.slice(startIndex, endIndex);
  };

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderedData = getCurrentPageData();
  return (
    <div className="text-black bg-white w-[440px] h-[640px] p-4 rounded-2xl">
      <div className="h-12 flex justify-center items-center text-xl font-bold border-b-2 border-black">
        <p>태그 목록</p>
      </div>
      <div className="flex flex-wrap justify-around">
        {renderedData.map((item, idx) => {
          return <TagButton key={idx} device_code={item} />;
        })}
      </div>
      <div className="flex justify-center text-xl">
        {Array.from(
          { length: Math.ceil(dummyTagList.length / itemsPerPage) },
          (_, index) => (
            <button
              className="mx-2"
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

interface TagButtonProps {
  device_code: string;
}

const TagButton = ({ device_code }: TagButtonProps) => {
  return (
    <div className="w-[88px] h-[56px] my-2 flex justify-center items-center bg-[#DFDCDE] text-lg rounded-2xl">
      <span>{device_code}</span>
    </div>
  );
};

export default TagLists;
