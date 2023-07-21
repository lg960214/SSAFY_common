interface EquipmentCardProps {
  title?: string;
  equipment: string | null;
}

const EquipmentCard = ({ title, equipment }: EquipmentCardProps) => {
  return (
    <div className="bg-white w-24 h-28 rounded-3xl shadow-inner-deep flex flex-col justify-around items-center">
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
