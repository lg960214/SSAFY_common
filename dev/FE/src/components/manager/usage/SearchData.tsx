import { UsageData } from '@/types/usage.type';
import { useState } from 'react';
import ShowData from './ShowData';
import ReactPaginate from 'react-paginate';

interface SearchDataProps {
  dailyUsageData: UsageData[];
}

const SearchData = ({ dailyUsageData }: SearchDataProps) => {
  const itemsPerPage = 3; // 페이지당 표시할 항목의 개수

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = dailyUsageData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(dailyUsageData.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % dailyUsageData.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="float-left -mt-11 py-5 w-[420px] h-[600px] rounded-[20px] bg-slate-200 mx-auto flex flex-col justify-between shadow-right-bottom shadow-gray-300">
        <ul>
          {currentItems.map((item) => (
            <ShowData renderData={item} key={item.name} />
          ))}
        </ul>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          nextLinkClassName="text-[#323554] hover:text-CustomOrange"
          className="flex justify-center text-2xl font-Bungee"
          pageLinkClassName="mx-2 hover:text-CustomOrange"
          activeLinkClassName="font-extrabold text-CustomOrange"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          previousLinkClassName="text-[#323554] hover:text-CustomOrange"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default SearchData;
