import { Reader } from '@/types/Reader';
import RfidCard from './RfidCard';

interface EquipmentMatchingSectionProps {
  isOnEdit: boolean;
  readers: Reader[];
}

const EquipmentMatchingSection = ({
  isOnEdit,
  readers,
}: EquipmentMatchingSectionProps) => {
  return (
    <div
      className="py-8 px-4 shadow-lg rounded-xl flex flex-wrap"
      style={{ width: 800, height: 520 }}
    >
      {readers?.map((reader) => (
        <RfidCard code={reader.reader} equipment={reader.name} />
      ))}
    </div>
  );
};

export default EquipmentMatchingSection;
