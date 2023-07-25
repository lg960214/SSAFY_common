import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { MemberItem } from './MemberItem';

// 더미데이터 import
import dummy from '@/components/manager/member/dummy.json';

interface Item {
  name: string;
  userid: string;
  number: string;
  sex: string;
  date: number;
  tag: string | null;
}

interface ItemsProps {
  currentItems: Item[];
}

// 더미데이터
const dummyData = dummy.data;

const Items: React.FC<ItemsProps> = ({ currentItems }) => {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => {
          return (
            <div>
              <MemberItem key={item.userid} {...item} />
            </div>
          );
        })}
    </>
  );
};

interface PaginatedItemsProps {
  itemsPerPage: number;
  checkText: string;
}

const MemberPaginatedItems: React.FC<PaginatedItemsProps> = ({
  itemsPerPage,
  checkText,
}) => {
  const [items, setDummyItems] = useState(dummy.data);

  useEffect(() => {
    const filterItems = dummyData.filter((item) =>
      item.name.includes(checkText),
    );
    setDummyItems(filterItems);
  }, [checkText]);

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <ul className="">
        <Items currentItems={currentItems} />
      </ul>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        nextLinkClassName="text-white hover:text-red-600"
        className="flex justify-evenly"
        pageLinkClassName="text-white hover:text-red-600"
        activeLinkClassName="text-red-600 underline decoration-red-600"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        previousLinkClassName="text-white hover:text-red-600"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default MemberPaginatedItems;
