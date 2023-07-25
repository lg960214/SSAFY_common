interface TagItemProps {
  name: string;
  memberNumber: string;
  tagNumber: string | null;
}

export const TagItem = (tagItemProps: TagItemProps) => {
  return (
    <li className="flex justify-evenly items-center h-10 text-center">
      <span className="basis-1/3">{tagItemProps.name}</span>
      <span className="basis-1/3">{tagItemProps.memberNumber}</span>
      <span className="basis-1/3">{tagItemProps.tagNumber}</span>
    </li>
  );
};
