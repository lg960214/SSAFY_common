import EquipmentMatchingSection from '@/components/manager/equiment/EquipmentMatchingSection';
import { Reader } from '@/types/Reader';
import { useState } from 'react';

const dummys = [
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

const EquipmentPage = () => {
  const [isOnEdit, setIsOnEdit] = useState<boolean>(true);
  const [readerData, setReaderData] = useState<Reader[]>(dummys);
  const handleReaderAddClick = () => {};
  return (
    <div>
      <EquipmentMatchingSection
        readers={readerData}
        isOnEdit={isOnEdit}
        onReaderAddClick={handleReaderAddClick}
      />
    </div>
  );
};

export default EquipmentPage;
