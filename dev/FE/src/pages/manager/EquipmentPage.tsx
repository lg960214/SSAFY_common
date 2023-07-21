import EquipmentMatchingSection from '@/components/manager/equiment/EquipmentMatchingSection';
import ZoneChoice from '@/components/manager/equiment/ZoneChoice';
import { Reader } from '@/types/Reader';
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

const zoneDummy = ['A', 'B', 'C'];

const EquipmentPage = () => {
  const [isOnEdit, setIsOnEdit] = useState<boolean>(true);
  const [readerData, setReaderData] = useState<Reader[]>(readerDummy);
  const [zoneList, setZoneList] = useState<string[]>(zoneDummy);
  const handleReaderAddClick = () => {};
  return (
    <div>
      <ZoneChoice zoneList={zoneList} isOnEdit={isOnEdit} />
      <EquipmentMatchingSection
        readers={readerData}
        isOnEdit={isOnEdit}
        onReaderAddClick={handleReaderAddClick}
      />
    </div>
  );
};

export default EquipmentPage;
