import PaginatedItems from '@/components/manager/member/PaginatedItems';
// import { TagItem } from './TagItem';
// import dummy from './dummy.json';

export const TableList = () => {
  // const data = dummy.data;
  return (
    <div className="bg-black w-96 h-96 text-white p-2 rounded-2xl">
      <div className="flex justify-evenly items-center h-12 basis-32 text-center">
        <span className="basis-1/3">이름</span>
        <span className="basis-1/3">회원 번호</span>
        <span className="basis-1/3">태그 번호</span>
      </div>
      <div className="border-white border-b-2 h-0"></div>
      <div>
        <PaginatedItems itemsPerPage={7} />
        {/* {data.map((item) => {
          const tagItemProps = {
            name: item.name,
            memberNumber: item.userid,
            tagNumber: item.tag,
          };
          return <TagItem key={item.userid} {...tagItemProps} />;
        })} */}
      </div>
    </div>
  );
};
