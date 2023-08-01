import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Reader, Zone } from '@/types/reader.type';
import EquipmentListSection from '@/components/manager/equiment/EquipmentListSection';
import EquipmentMatchingSection from '@/components/manager/equiment/EquipmentMatchingSection';
import ZoneChoice from '@/components/manager/equiment/ZoneChoice';
import IssueSection from '@/components/manager/equiment/IssueSection';
import EditSaveButton from '@/components/manager/equiment/editSaveButton';
import Modal from '@/components/common/Modal';
import RegisterModalChildren from '@/components/manager/equiment/RegisterModalChildren';
import ConfirmModal from '@/components/common/ConfirmModal';
import { getReaders } from '@/api/equipmentApi';
import { useQuery } from '@tanstack/react-query';

const zoneDummy = [
  { name: 'A', isSelected: true },
  { name: 'B', isSelected: false },
  { name: 'C', isSelected: false },
];

const EquipmentPage = () => {
  const [isOnEdit, setIsOnEdit] = useState<boolean>(false);
  const [wholeData, setWholeData] = useState<Reader[]>([]);
  const [selectedZoneData, setSelectedZoneData] = useState<Reader[]>([]);
  const [zoneList, setZoneList] = useState<Zone[]>(zoneDummy);
  const [issueZoneData, setIssueZoneData] = useState<Reader[]>([]);
  const [isRegisterModalOn, setIsRegisterModalOn] = useState<boolean>(false);
  const [isSaveModalOn, setIsSaveModalOn] = useState<boolean>(false);

  const { data, isLoading } = useQuery(['readers'], getReaders);

  useEffect(() => {
    if (!isLoading) {
      console.log(data);
      setWholeData(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    const currentZone = zoneList.filter((cur) => cur.isSelected)[0].name;
    setSelectedZoneData(wholeData.filter((cur) => cur.region === currentZone));
    const issueFiltering = wholeData.filter((cur) => cur.region === 'issue');
    setIssueZoneData(issueFiltering);
  }, [zoneList, wholeData]);

  const handleReaderAddClick = () => {
    setIsRegisterModalOn(true);
  };

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
      cur.name?.includes(droppedItem.id),
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
          {isOnEdit ? (
            <EditSaveButton
              title="저장"
              onClick={() => setIsSaveModalOn(true)}
            />
          ) : null}
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
              onEditClick={() => setIsOnEdit(true)}
            />
            <IssueSection
              isOnEdit={isOnEdit}
              readers={issueZoneData}
              onIssueDrop={handleIssueDrop}
            />
          </div>
        </div>
      </DndProvider>
      <Modal
        isOpen={isRegisterModalOn}
        children={
          <RegisterModalChildren
            setWholeData={setWholeData}
            currentZone={zoneList.filter((cur) => cur.isSelected)[0].name}
            readerData={wholeData}
          />
        }
        onClose={() => setIsRegisterModalOn(false)}
      />
      <Modal
        isOpen={isSaveModalOn}
        children={
          <ConfirmModal
            text={'정말 저장하시겠습니까?'}
            leftButtonTitle={'취소'}
            rightButtonTitle={'저장'}
            onLeftButtonClick={() => setIsSaveModalOn(false)}
            onRightButtonClick={handleSaveClick}
          />
        }
        onClose={() => setIsSaveModalOn(false)}
      />
    </div>
  );
};

export default EquipmentPage;
