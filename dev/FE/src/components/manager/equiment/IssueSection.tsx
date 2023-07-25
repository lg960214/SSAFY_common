import { useDroppable } from '@/hooks/dndhooks';
import { Reader } from '@/types/Reader';
import IssueReaderRow from './IssueReaderRow';

interface IssueSectionProps {
  readers: Reader[];
  onIssueDrop: (droppedItem: { id: string }) => void;
}

const IssueSection = ({ readers, onIssueDrop }: IssueSectionProps) => {
  const { isOver, drop } = useDroppable('reader', onIssueDrop);
  return (
    <div
      ref={drop}
      className="mt-4 py-2 shadow-lg rounded-xl flex flex-col bg-slate-200"
      style={{
        width: 520,
        height: 205,
        backgroundColor: isOver ? 'green' : undefined,
      }}
    >
      {readers.map((reader) => (
        <IssueReaderRow key={reader.reader} data={reader} />
      ))}
    </div>
  );
};

export default IssueSection;
