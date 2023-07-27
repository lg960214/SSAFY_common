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
    { title: '이름', className: 'w-24' },
    { title: '회원 번호', className: 'w-20' },
    { title: '전화 번호', className: 'w-28' },
    { title: '성별', className: 'w-16' },
    { title: '최근 방문', className: 'w-28' },
    { title: '태그 번호', className: 'w-44' },
  ];
  return (
    <div className="bg-black w-full h-[700px] -mt-12 text-white p-2 rounded-2xl">
      <div className="flex justify-evenly items-center h-12 text-center text-lg font-bold">
        {tableName.map((item, idx: number) => {
          return (
            <span key={idx} className={item.className}>
              {item.title}
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
