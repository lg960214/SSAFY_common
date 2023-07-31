interface WaitEquitmentListProps {
  equipment: string;
  handlePickEquipment: (equipment: string) => void;
}

const WaitEquitmentList = ({
  equipment,
  handlePickEquipment,
}: WaitEquitmentListProps) => {
  const equipmentNames = [
    '벤치프레스',
    '데드리프트',
    '스쿼트랙',
    '덤벨',
    '랫풀다운',
    '런닝머신',
    '레그익스텐션',
    '레그프레스',
    '사이클',
    '천국의계단',
    '케이블',
    '케틀벨',
    '풀업바',
  ];
  const filterEquipment = equipmentNames.filter((item) => item !== equipment);
  return (
    <div className="flex flex-wrap w-[320px]">
      {filterEquipment.map((item) => {
        return (
          <EquipmentButton
            handlePickEquipment={handlePickEquipment}
            equipment={item}
          />
        );
      })}
    </div>
  );
};

interface EquipmentButtonProps {
  equipment: string;
  handlePickEquipment: (equipment: string) => void;
}

const EquipmentButton = ({
  equipment,
  handlePickEquipment,
}: EquipmentButtonProps) => {
  return (
    <div
      onClick={() => handlePickEquipment(equipment)}
      className="flex flex-col justify-center items-center"
    >
      <div className="bg-white w-[76px] h-[76px] m-3 rounded-full flex justify-center items-center">
        <img
          src={`/img/equipments/${equipment}.png`}
          alt={equipment}
          width={52}
        />
      </div>
      <span>{equipment}</span>
    </div>
  );
};

export default WaitEquitmentList;
