import TagPaginatedItems from '@/components/manager/member/TagPaginatedItems';
import { MemberInfo } from '@/types/member.type';

interface TagTablelistProps {
  memberInfoLists: MemberInfo[];
}

export const TagTableList = ({ memberInfoLists }: TagTablelistProps) => {
  const usingTagMember = memberInfoLists.filter((member: MemberInfo) => {
    return member.deviceCode !== null;
  });
  return (
    <div>
      <div className="w-40 h-12 -mt-10 rounded-lg p-1 top-0 float-right text-center text-black font-bold text-xl">
        <span>{usingTagMember.length} 명 이용중</span>
      </div>
      <div className="bg-black w-[404px] h-[700px] -mt-12 text-white p-2 rounded-2xl">
        <div className="flex justify-evenly items-center h-12 text-lg font-bold text-center">
          <span className="basis-1/3">이름</span>
          <span className="basis-1/3">회원 번호</span>
          <span className="basis-1/3">태그 번호</span>
        </div>
        <div className="border-white border-b-2 h-0"></div>
        <div>
          <TagPaginatedItems
            usingTagMember={usingTagMember}
            itemsPerPage={12}
          />
        </div>
      </div>
    </div>
  );
};
