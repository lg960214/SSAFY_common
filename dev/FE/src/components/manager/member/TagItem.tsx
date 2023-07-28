import { MemberInfo } from '@/types/member.type';

export const TagItem = ({ ...item }: MemberInfo) => {
  return (
    <li className="flex justify-evenly items-center h-12 text-center">
      <span className="basis-1/3">{item.name}</span>
      <span className="basis-1/3">{item.userid}</span>
      <span className="basis-1/3 font-bold">{item.tag}</span>
    </li>
  );
};
