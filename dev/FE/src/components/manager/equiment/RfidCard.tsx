import EquipmentCard from './EquipmentCard';

interface RfidCardProps {
  code: string;
  equipment: string;
}

const RfidCard = ({ code, equipment }: RfidCardProps) => {
  const lastIndex = equipment.length - 1;
  const pureName = isNaN(parseInt(equipment[lastIndex]))
    ? equipment
    : equipment.slice(0, lastIndex);
  return (
    <div className="m-4 bg-orange-500 w-40 h-48 rounded-3xl flex flex-col justify-around items-center">
      <p className="text-white">{code}</p>
      <EquipmentCard title={equipment} equipment={pureName} />
    </div>
  );
};

export default RfidCard;
