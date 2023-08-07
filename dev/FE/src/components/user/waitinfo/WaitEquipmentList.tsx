import { GymEquipments } from '@/types/user.type';

interface WaitEquipmentListProps {
  equipmentLists: GymEquipments[];
  handlePickEquipment: (equipment: GymEquipments) => void;
}

const WaitEquipmentList = ({
  equipmentLists,
  handlePickEquipment,
}: WaitEquipmentListProps) => {
  return (
    <div className="flex flex-wrap w-[320px]">
      {equipmentLists.map((item: GymEquipments) => {
        return (
          <EquipmentButton
            key={item.reader}
            handlePickEquipment={() => handlePickEquipment(item)}
            equipment={item}
          />
        );
      })}
    </div>
  );
};

interface EquipmentButtonProps {
  equipment: GymEquipments;
  handlePickEquipment: (equipment: GymEquipments) => void;
}

const EquipmentButton = ({
  equipment,
  handlePickEquipment,
}: EquipmentButtonProps) => {
  const name = isNaN(parseInt(equipment.name[equipment.name.length - 1]))
    ? equipment.name
    : equipment.name.slice(0, equipment.name.length - 1);
  return (
    <div
      onClick={() => handlePickEquipment(equipment)}
      className="flex flex-col justify-center items-center"
    >
      <div className="bg-white w-[76px] h-[76px] m-3 rounded-full flex justify-center items-center">
        <img src={`/img/equipments/${name}.png`} alt={name} width={52} />
      </div>
      <span>{equipment.name}</span>
    </div>
  );
};

export default WaitEquipmentList;
