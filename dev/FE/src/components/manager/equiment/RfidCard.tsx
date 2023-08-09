import { useDraggable, useDroppableForRfidCard } from '@/hooks/dndhooks';
import EquipmentCard from './EquipmentCard';
import { Reader } from '@/types/reader.type';
import { useRef } from 'react';
interface RfidCardProps {
  isOnEdit: boolean;
  data: Reader;
  onEquipmentDrop: (readerData: Reader, droppedItem: { id: string }) => void;
  deleteReader: (reader: Reader) => void;
}

const RfidCard = ({
  isOnEdit,
  data,
  onEquipmentDrop,
  deleteReader,
}: RfidCardProps) => {
  // pureName: '벤치프레스A', '벤치프레스B' 들을 '벤치프레스' 로 변환
  let pureName = null;
  if (data.name !== null) {
    const lastIndex = data.name.length - 1;
    pureName = isNaN(parseInt(data.name[lastIndex]))
      ? data.name
      : data.name.slice(0, lastIndex);
  }
  const ref = useRef(null);
  const { isOver, drop } = useDroppableForRfidCard(
    'equipment',
    onEquipmentDrop,
    data,
  );
  const { drag } = useDraggable('reader', data.reader);
  drag(drop(ref));

  return (
    <div
      ref={isOnEdit ? ref : null}
      style={{ backgroundColor: isOver ? 'red' : '#FF8000' }}
      className="mx-4 w-40 h-48 rounded-lg flex flex-col justify-around items-center"
    >
      <div className="flex">
        <span className={`text-white text-xl ml-${isOnEdit ? 8 : 0}`}>
          {data.reader}
        </span>
        {isOnEdit ? (
          <img
            onClick={() => deleteReader(data)}
            className="ml-1 pt-1 hover:cursor-pointer"
            width={24}
            src="/img/cancel.svg"
            alt="delete"
          />
        ) : null}
      </div>
      <EquipmentCard title={data.name} equipment={pureName} />
    </div>
  );
};

export default RfidCard;
