import MemberPaginatedItems from '@/components/manager/member/MemberPaginatedItems';
import { MemberInfo } from '@/types/member.type';

interface MemberTableListProps {
  checkText: string;
  memberInfoLists: MemberInfo[];
}

export const MemberTableList: React.FC<MemberTableListProps> = ({
  checkText,
  memberInfoLists,
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
    <div className="bg-black w-full h-[700px] -mt-12 text-white p-2 rounded-2xl">
      <div className="flex justify-evenly items-center h-12 basis-32 text-center">
        {tableName.map((item: string, idx: number) => {
          return (
            <span key={idx} className="basis-1/6">
              {item}
            </span>
          );
        })}
      </div>
      <div className="border-white border-b-2 h-0"></div>
      <MemberPaginatedItems
        memberInfoLists={memberInfoLists}
        checkText={checkText}
        itemsPerPage={12}
      />
    </div>
  );
};
