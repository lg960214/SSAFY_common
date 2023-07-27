import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { TagItem } from './TagItem';
import { MemberInfo } from '@/types/member.type';

interface ItemsProps {
  currentItems: MemberInfo[];
}

const Items: React.FC<ItemsProps> = ({ currentItems }) => {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => {
          return <TagItem key={item.userid} {...item} />;
        })}
    </>
  );
};

interface PaginatedItemsProps {
  itemsPerPage: number;
  usingTagMember: MemberInfo[];
}

const TagPaginatedItems: React.FC<PaginatedItemsProps> = ({
  usingTagMember,
  itemsPerPage,
}) => {
  const items = usingTagMember;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="flex flex-col h-[620px] justify-between">
      <ul className="">
        <Items currentItems={currentItems} />
      </ul>
      <div>
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
      </div>
    </div>
  );
};

export default TagPaginatedItems;
