import MemberPaginatedItems from '@/components/manager/member/MemberPaginatedItems';

interface MemberTableListProps {
  checkText: string;
}

export const MemberTableList: React.FC<MemberTableListProps> = ({
  checkText,
}) => {
  const tableName = [
    '이름',
    '회원 번호',
    '전화 번호',
    '성별',
    '최근 방문',
    '태그 번호',
  ];
  return (
    <div className="bg-black w-full h-[712px] -mt-12 text-white p-2 rounded-2xl">
      <div className="flex justify-evenly items-center h-12 basis-32 text-center">
        {tableName.map((item: string) => {
          return <span className="basis-1/6">{item}</span>;
        })}
      </div>
      <div className="border-white border-b-2 h-0"></div>
      <MemberPaginatedItems checkText={checkText} itemsPerPage={13} />
    </div>
  );
};
