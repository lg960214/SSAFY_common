import EquipmentListSection from '@/components/manager/equiment/EquipmentListSection';
import EquipmentMatchingSection from '@/components/manager/equiment/EquipmentMatchingSection';
import ZoneChoice from '@/components/manager/equiment/ZoneChoice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Reader, Zone } from '@/types/Reader';
import { useEffect, useState } from 'react';
import IssueSection from '@/components/manager/equiment/IssueSection';
import EditSaveButton from '@/components/manager/equiment/editSaveButton';

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
    name: '런닝머신1',
    gym_code: 'YS1',
  },
  {
    region: 'issue',
    reader: 'WW837',
    name: '런닝머신2',
    gym_code: 'YS1',
  },
  {
    region: 'issue',
    reader: 'WW822',
    name: '런닝머신3',
    gym_code: 'YS1',
  },
];

const zoneDummy = [
  { name: 'A', isSelected: true },
  { name: 'B', isSelected: false },
  { name: 'C', isSelected: false },
];

const EquipmentPage = () => {
  const [isOnEdit, setIsOnEdit] = useState<boolean>(false);
  const [wholeData, setWholeData] = useState<Reader[]>(readerDummy);
  const [selectedZoneData, setSelectedZoneData] = useState<Reader[]>([]);
  const [zoneList, setZoneList] = useState<Zone[]>(zoneDummy);
  const [issueZoneData, setIssueZoneData] = useState<Reader[]>([]);

  useEffect(() => {
    const currentZone = zoneList.filter((cur) => cur.isSelected)[0].name;
    setSelectedZoneData(wholeData.filter((cur) => cur.region === currentZone));
    const issueFiltering = wholeData.filter((cur) => cur.region === 'issue');
    setIssueZoneData(issueFiltering);
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

  const handleIssueDrop = (droppedItem: { id: string }) => {
    const totalIssueNum = wholeData.filter(
      (cur) => cur.region === 'issue',
    ).length;
    if (totalIssueNum > 3) {
      alert('더이상 추가할 수 없습니다.');
      return;
    }
    const editedwholeData = wholeData.map((cur) => {
      if (cur.reader === droppedItem.id) {
        return { ...cur, region: 'issue' };
      } else return cur;
    });
    setWholeData(editedwholeData);
  };

  const handleIssueToMatchingSection = (droppedItem: { id: string }) => {
    const currentZone = zoneList.filter((cur) => cur.isSelected)[0].name;
    const editedwholeData = wholeData.map((cur) => {
      if (cur.reader === droppedItem.id) {
        return { ...cur, region: currentZone };
      } else return cur;
    });
    setWholeData(editedwholeData);
  };

  const handleEditClick = () => {
    setIsOnEdit(true);
  };

  const handleSaveClick = () => alert('저장');

  return (
    <div className="w-[1440px] mx-auto">
      <DndProvider backend={HTML5Backend}>
        <div className="flex justify-between">
          <ZoneChoice
            zoneList={zoneList}
            isOnEdit={isOnEdit}
            onZoneClick={handleZoneClick}
            onAddZoneClick={handleAddZoneClick}
          />
          <EditSaveButton title="저장" onClick={handleSaveClick} />
        </div>
        <div className="flex justify-between">
          <EquipmentMatchingSection
            onEquipmentDrop={handleEquipmentDrop}
            readers={selectedZoneData}
            isOnEdit={isOnEdit}
            onReaderAddClick={handleReaderAddClick}
            onIssueDrop={handleIssueToMatchingSection}
          />
          <div>
            <EquipmentListSection
              isOnEdit={isOnEdit}
              onEditClick={handleEditClick}
            />
            <IssueSection
              isOnEdit={isOnEdit}
              readers={issueZoneData}
              onIssueDrop={handleIssueDrop}
            />
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default EquipmentPage;
