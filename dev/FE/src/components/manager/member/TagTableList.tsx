import TagPaginatedItems from '@/components/manager/member/TagPaginatedItems';

export const TagTableList = () => {
  return (
    <div className="bg-black w-96 mt-12 text-white p-2 rounded-2xl">
      <div className="flex justify-evenly items-center h-12 basis-32 text-center">
        <span className="basis-1/3">이름</span>
        <span className="basis-1/3">회원 번호</span>
        <span className="basis-1/3">태그 번호</span>
      </div>
      <div className="border-white border-b-2 h-0"></div>
      <div>
        <TagPaginatedItems itemsPerPage={7} />
      </div>
    </div>
  );
};
