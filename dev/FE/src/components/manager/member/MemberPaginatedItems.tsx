import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { MemberItem } from './MemberItem';
import { MemberInfo } from '@/types/member.type';

interface ItemsProps {
  currentItems: MemberInfo[];
}

const Items: React.FC<ItemsProps> = ({ currentItems }) => {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => {
          return <MemberItem key={item.userId} {...item} />;
        })}
    </>
  );
};

interface PaginatedItemsProps {
  itemsPerPage: number;
  checkText: string;
  memberInfoLists: MemberInfo[];
}

const MemberPaginatedItems: React.FC<PaginatedItemsProps> = ({
  itemsPerPage,
  checkText,
  memberInfoLists,
}) => {
  const [items, setDummyItems] = useState(memberInfoLists);

  useEffect(() => {
    const filterItems = memberInfoLists.filter((item) =>
      item.name.includes(checkText),
    );
    setDummyItems(filterItems);
    setItemOffset(0);
  }, [checkText]);

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const pageIndex = itemOffset / itemsPerPage;

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="flex flex-col h-[620px] justify-between">
      <div>
        <ul className="">
          <Items currentItems={currentItems} />
        </ul>
      </div>
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          nextLinkClassName="text-white hover:text-red-600"
          className="flex justify-center  text-xl"
          pageLinkClassName=" mx-2 text-white hover:text-red-600"
          disabledLinkClassName="text-black"
          activeLinkClassName="font-extrabold border-b-2 border-white"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          previousLinkClassName="text-white hover:text-red-600"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default MemberPaginatedItems;
