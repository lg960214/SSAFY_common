import EquipmentMatchingSection from '@/components/manager/equiment/EquipmentMatchingSection';
import ZoneChoice from '@/components/manager/equiment/ZoneChoice';
import { Reader, Zone } from '@/types/Reader';
import { useState } from 'react';

const readerDummy = [
  {
    region: 'A',
    reader: 'WW809',
    name: '벤치프레스1',
    gym_code: 'YS1',
  },
  {
    region: 'A',
    reader: 'WW333',
    name: '벤치프레스2',
    gym_code: 'YS1',
  },
  {
    region: 'A',
    reader: 'WW555',
    name: '랫풀다운',
    gym_code: 'YS1',
  },
  {
    region: 'A',
    reader: 'WW129',
    name: '레그프레스',
    gym_code: 'YS1',
  },
  {
    region: 'A',
    reader: 'WW166',
    name: '레그익스텐션',
    gym_code: 'YS1',
  },
];

const zoneDummy = [
  { name: 'A', isSelected: true },
  { name: 'B', isSelected: false },
  { name: 'C', isSelected: false },
];

const EquipmentPage = () => {
  const [isOnEdit, setIsOnEdit] = useState<boolean>(true);
  const [readerData, setReaderData] = useState<Reader[]>(readerDummy);
  const [zoneList, setZoneList] = useState<Zone[]>(zoneDummy);
  const handleReaderAddClick = () => {};
  const handleZoneClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
    // 이벤트 객체의 경우 이렇게 타입 캐스팅하면 에러가 해결된다고 함.
    const target = e?.target as HTMLButtonElement;
    const targetText = target?.textContent;
    const updatedZoneList = zoneList.map((cur) => {
      if (cur.name === targetText) {
        return { ...cur, isSelected: true };
      } else {
        return { ...cur, isSelected: false };
      }
    });
    setZoneList(updatedZoneList);
  };

  const handleAddZoneClick = () => {
    const lastAlphabet = zoneList[zoneList.length - 1].name;
    if (lastAlphabet === 'H') alert('더 이상 추가할 수 없습니다.');
    else {
      const nextAlphabet = String.fromCharCode(lastAlphabet.charCodeAt(0) + 1);
      setZoneList([...zoneList, { name: nextAlphabet, isSelected: false }]);
    }
  };
  return (
    <div>
      <ZoneChoice
        zoneList={zoneList}
        isOnEdit={isOnEdit}
        onZoneClick={handleZoneClick}
        onAddZoneClick={handleAddZoneClick}
      />
      <EquipmentMatchingSection
        readers={readerData}
        isOnEdit={isOnEdit}
        onReaderAddClick={handleReaderAddClick}
      />
    </div>
  );
};

export default EquipmentPage;
