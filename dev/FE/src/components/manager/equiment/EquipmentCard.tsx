import { DragElementWrapper } from 'react-dnd';

interface EquipmentCardProps {
  title?: string;
  equipment: string | null;
  dragRef?: DragElementWrapper<any>;
  isDragging?: boolean;
}

const EquipmentCard = ({
  title,
  equipment,
  dragRef,
  isDragging,
}: EquipmentCardProps) => {
  return (
    <div
      ref={dragRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="bg-white w-24 h-28 rounded-3xl shadow-inner-deep flex flex-col justify-around items-center"
    >
      {equipment ? (
        <>
          <p>{title}</p>
          <img
            src={`../../../../public/img/equipments/${equipment}.png`}
            alt={equipment}
            width={56}
          />
        </>
      ) : (
        <div>+</div>
      )}
    </div>
  );
};

export default EquipmentCard;
