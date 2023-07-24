import { TagTableList } from '@/components/manager/member/TagTableList';
import { TableMenu } from '@/components/manager/member/TableMenu';
import { MemberTableList } from '@/components/manager/member/MemberTableList';

export const MemberPage = () => {
  return (
    <div className="flex justify-evenly" style={{ height: '900px' }}>
      <div className="w-1/2">
        <TableMenu name="태그 현황" />
        <TagTableList />
      </div>
      <div className="w-1/2">
        <TableMenu name="회원 정보" />
        {/* <TableList /> */}
        <MemberTableList />
      </div>
    </div>
  );
};
