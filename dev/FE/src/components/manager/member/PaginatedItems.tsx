import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { TagItem } from './TagItem';
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

const items = dummy.data;

const Items: React.FC<ItemsProps> = ({ currentItems }) => {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => {
          const tagItemProps = {
            name: item.name,
            memberNumber: item.userid,
            tagNumber: item.tag,
          };
          return <TagItem key={item.userid} {...tagItemProps} />;
        })}
    </>
  );
};

interface PaginatedItemsProps {
  itemsPerPage: number;
  items: Item[];
}

const PaginatedItems: React.FC<PaginatedItemsProps> = ({ itemsPerPage }) => {
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
      <ul className="h-72">
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

export default PaginatedItems;
