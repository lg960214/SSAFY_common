import { useDroppable } from '@/hooks/dndhooks';
import EquipmentCard from './EquipmentCard';
import { Reader } from '@/types/Reader';

interface RfidCardProps {
  data: Reader;
  onEquipmentDrop: (readerData: Reader, droppedItem: { id: string }) => void;
}

const RfidCard = ({ data, onEquipmentDrop }: RfidCardProps) => {
  // pureName: '벤치프레스A', '벤치프레스B' 들을 '벤치프레스' 로 변환
  const lastIndex = data.name.length - 1;
  const pureName = isNaN(parseInt(data.name[lastIndex]))
    ? data.name
    : data.name.slice(0, lastIndex);
  const { isOver, drop } = useDroppable('equipment', onEquipmentDrop, data);
  return (
    <div
      ref={drop}
      style={{ backgroundColor: isOver ? 'red' : '#FF8000' }}
      className="m-4 bg-orange-500 w-40 h-48 rounded-3xl flex flex-col justify-around items-center"
    >
      <p className="text-white">{data.reader}</p>
      <EquipmentCard title={data.name} equipment={pureName} />
    </div>
  );
};

export default RfidCard;
