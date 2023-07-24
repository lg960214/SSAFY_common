import MemberPaginatedItems from '@/components/manager/member/MemberPaginatedItems';

interface MemberTableListProps {
  checkText: string;
}

export const MemberTableList: React.FC<MemberTableListProps> = ({
  checkText,
}) => {
  return (
    <div className="bg-black w-full mt-12 text-white p-2 rounded-2xl">
      <div className="flex justify-evenly items-center h-12 basis-32 text-center">
        <span className="basis-1/6">이름</span>
        <span className="basis-1/6">회원 번호</span>
        <span className="basis-1/6">전화 번호</span>
        <span className="basis-1/6">성별</span>
        <span className="basis-1/6">최근 방문</span>
        <span className="basis-1/6">태그 번호</span>
      </div>
      <div className="border-white border-b-2 h-0"></div>
      <div>
        <MemberPaginatedItems checkText={checkText} itemsPerPage={13} />
      </div>
    </div>
  );
};
