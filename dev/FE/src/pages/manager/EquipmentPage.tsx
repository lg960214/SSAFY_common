import EquipmentListSection from '@/components/manager/equiment/EquipmentListSection';
import EquipmentMatchingSection from '@/components/manager/equiment/EquipmentMatchingSection';
import ZoneChoice from '@/components/manager/equiment/ZoneChoice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Reader, Zone } from '@/types/Reader';
import { useEffect, useState } from 'react';

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
    name: '스쿼트랙',
    gym_code: 'YS1',
  },
  {
    region: 'B',
    reader: 'WW999',
    name: '덤벨',
    gym_code: 'YS1',
  },
  {
    region: 'B',
    reader: 'WW113',
    name: '풀업바',
    gym_code: 'YS1',
  },
  {
    region: 'B',
    reader: 'WW134',
    name: '런닝머신',
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
  const [wholeData, setWholeData] = useState<Reader[]>(readerDummy);
  const [selectedZoneData, setSelectedZoneData] = useState<Reader[]>([]);
  const [zoneList, setZoneList] = useState<Zone[]>(zoneDummy);

  useEffect(() => {
    const currentZone = zoneList.filter((cur) => cur.isSelected)[0].name;
    setSelectedZoneData(wholeData.filter((cur) => cur.region === currentZone));
  }, [zoneList, wholeData]);

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

  const handleEquipmentDrop = (
    readerData: Reader,
    droppedItem: { id: string },
  ) => {
    // drop이 발생 했을 때 처리할 이벤트 함수
    // readerData는 drag된 대상을 받은 리더기 정보, droppedItem.id은 drop된 기구 명
    const alreadyExistCount = wholeData.filter((cur) =>
      cur.name.includes(droppedItem.id),
    ).length;
    let equipmentOrderName = droppedItem.id;
    if (alreadyExistCount) {
      equipmentOrderName = equipmentOrderName + (alreadyExistCount + 1);
    }
    const updateMatching = wholeData.map((cur) => {
      if (readerData.reader === cur.reader) {
        return { ...cur, name: equipmentOrderName };
      }
      return cur;
    });
    setWholeData(updateMatching);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ZoneChoice
        zoneList={zoneList}
        isOnEdit={isOnEdit}
        onZoneClick={handleZoneClick}
        onAddZoneClick={handleAddZoneClick}
      />
      <div className="flex flex-row">
        <EquipmentMatchingSection
          onEquipmentDrop={handleEquipmentDrop}
          readers={selectedZoneData}
          isOnEdit={isOnEdit}
          onReaderAddClick={handleReaderAddClick}
        />
        <div>
          <EquipmentListSection />
        </div>
      </div>
    </DndProvider>
  );
};

export default EquipmentPage;
