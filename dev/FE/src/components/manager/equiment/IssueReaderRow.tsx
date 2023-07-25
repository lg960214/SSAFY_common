import { useDraggable } from '@/hooks/dndhooks';
import { Reader } from '@/types/Reader';

interface IssueReaderRowProps {
  data: Reader;
}
const IssueReaderRow = ({ data }: IssueReaderRowProps) => {
  const { isDragging, getItem, drag, preview } = useDraggable(
    'issue',
    data.reader,
  );
  return (
    <div
      ref={drag}
      className="mx-5 my-2 px-5 py-1 bg-orange-400 flex justify-between"
    >
      <span>{data.reader}</span>
      <span>{data.name}</span>
    </div>
  );
};

export default IssueReaderRow;
