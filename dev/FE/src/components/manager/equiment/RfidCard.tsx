import { useDraggable, useDroppableForRfidCard } from '@/hooks/dndhooks';
import EquipmentCard from './EquipmentCard';
import { Reader } from '@/types/Reader';
import { useRef } from 'react';
interface RfidCardProps {
  isOnEdit: boolean;
  data: Reader;
  onEquipmentDrop: (readerData: Reader, droppedItem: { id: string }) => void;
}

const RfidCard = ({ isOnEdit, data, onEquipmentDrop }: RfidCardProps) => {
  // pureName: '벤치프레스A', '벤치프레스B' 들을 '벤치프레스' 로 변환
  const lastIndex = data.name.length - 1;
  const pureName = isNaN(parseInt(data.name[lastIndex]))
    ? data.name
    : data.name.slice(0, lastIndex);
  const ref = useRef(null);
  const { isOver, drop } = useDroppableForRfidCard(
    'equipment',
    onEquipmentDrop,
    data,
  );
  const { isDragging, getItem, drag, preview } = useDraggable(
    'reader',
    data.reader,
  );
  drag(drop(ref));

  return (
    <div
      ref={isOnEdit ? ref : null}
      style={{ backgroundColor: isOver ? 'red' : '#FF8000' }}
      className="mx-4 bg-orange-500 w-40 h-48 rounded-3xl flex flex-col justify-around items-center"
    >
      <p className="text-white">{data.reader}</p>
      <EquipmentCard title={data.name} equipment={pureName} />
    </div>
  );
};

export default RfidCard;
