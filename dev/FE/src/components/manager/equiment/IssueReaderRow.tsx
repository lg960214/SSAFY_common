import { useDraggable } from '@/hooks/dndhooks';
import { Reader } from '@/types/reader.type';

interface IssueReaderRowProps {
  isOnEdit: boolean;
  data: Reader;
}
const IssueReaderRow = ({ isOnEdit, data }: IssueReaderRowProps) => {
  const { drag } = useDraggable('issue', data.reader);
  return (
    <div
      ref={isOnEdit ? drag : null}
      className="mx-5 my-2 px-5 py-1 rounded-lg bg-CustomOrange flex justify-between"
    >
      <span>{data.reader}</span>
      <span>{data.name}</span>
    </div>
  );
};

export default IssueReaderRow;
