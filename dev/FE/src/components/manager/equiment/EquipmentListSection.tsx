import { useDraggable } from '@/hooks/dndhooks';
import EquipmentCard from './EquipmentCard';

const EquipmentListSection = () => {
  const equipmentNames = [
    '벤치프레스',
    '데드리프트',
    '스쿼트랙',
    '덤벨',
    '랫풀다운',
    '런닝머신',
    '레그익스텐션',
    '레그프레스',
  ];

  const equipmentList = equipmentNames.map((name) => {
    const { isDragging, getItem, drag, preview } = useDraggable(
      'equipment',
      name,
    );

    return {
      name,
      isDragging,
      getItem,
      drag,
      preview,
    };
  });

  return (
    <div
      className="py-8 px-4 shadow-lg rounded-xl flex flex-wrap bg-slate-200"
      style={{ width: 520, height: 300 }}
    >
      {equipmentList.map((eq) => (
        <div key={eq.name} className="mx-3 my-2">
          <EquipmentCard
            title={eq.name}
            equipment={eq.name}
            dragRef={eq.drag}
            isDragging={eq.isDragging}
          />
        </div>
      ))}
    </div>
  );
};

export default EquipmentListSection;
