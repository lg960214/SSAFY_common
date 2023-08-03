import Modal from '@/components/common/Modal';
import TimeInput from '@/components/user/waitinfo/TimeInput';
import WaitEquitmentList from '@/components/user/waitinfo/WaitEquitmentList';
import WaitTitle from '@/components/user/waitinfo/WaitTitle';
import { useState, useEffect, ChangeEvent } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getGymEquipments, getUsingGymUsers } from '@/api/waitInfoApi';
import FormInput from '@/components/common/FormInput';
import { registGym } from '@/api/waitInfoApi';
import { GymEquipments } from '@/types/user.type';

const WaitInfoPage = () => {
  const { data: usingGymUsers, status } = useQuery(
    ['getUsingGymUsers'],
    getUsingGymUsers,
  );
  const registGymMutation = useMutation(
    (regiGymCode: string) => registGym(regiGymCode),
    {
      onSuccess: () => {},
      onError: () => {},
    },
  );
  const [checkGymApprove, setCheckGymApprove] = useState(true);

  const [isModal, setIsModal] = useState(false);
  const handleOpenModal = () => {
    setIsModal(true);
  };
  const handleCloseModal = () => {
    setIsModal(false);
  };

  // 헬스장 기구정보
  const { data, status: getGymEquipmentsStatus } = useQuery(
    ['getGymEquipments'],
    getGymEquipments,
  );
  if (getGymEquipmentsStatus === 'error') {
    console.log(data);
  }
  if (getGymEquipmentsStatus === 'success') {
    console.log(data);
  }

  const [regiGymCode, setRegiGymCode] = useState<string>('');
  const handleChangeGymCode = (event: ChangeEvent<HTMLInputElement>) => {
    setRegiGymCode(event.target.value);
  };

  const [pickEquipment, setPickEquipment] = useState<GymEquipments | null>(
    null,
  );
  const handleSetPickEquipment = (equipment: GymEquipments) => {
    setPickEquipment(equipment);
  };
  useEffect(handleCloseModal, [pickEquipment]);

  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);

  useEffect(() => {
    const date = new Date();
    const roundedMinute = Math.ceil(date.getMinutes() / 10) * 10;
    setHour(date.getHours());
    setMinute(roundedMinute);
  }, []);

  return (
    <div className="bg-[#f2f2f2]">
      {checkGymApprove ? (
        <div>
          <div className="m-2 text-black">
            <div className="float-left font-bold text-lg">나의 헬스장</div>
            <div className="float-right">현재 {usingGymUsers}명 이용중</div>
          </div>
          <WaitTitle text="킹콩 피트니스" />
          <div className="flex justify-evenly items-center my-4">
            {isModal && (
              <Modal isOpen={isModal} onClose={handleCloseModal}>
                <WaitEquitmentList
                  equipmentLists={data}
                  equipment={pickEquipment}
                  handlePickEquipment={handleSetPickEquipment}
                />
              </Modal>
            )}
            <EquipmentCircle equipment={pickEquipment} />
            <button
              className="w-[200px] h-[66px] text-xl"
              onClick={handleOpenModal}
            >
              기구 선택 하기
            </button>
          </div>
          <div className="w-[330px] mx-auto flex justify-between items-center my-4">
            <div>
              <TimeInput
                hour={hour}
                minute={minute}
                setHour={setHour}
                setMinute={setMinute}
              />
            </div>
            <button className="w-25 h-11 bg-CustomOrange">조회</button>
          </div>

          <div className="w-[360px] h-[200px] flex justify-evenly py-2 bg-CustomGray rounded-lg mx-auto">
            <div className="w-[120px] text-black border-r-2 border-black">
              <span className="font-bold text-center">실시간</span>
              <p>6명</p>
            </div>
            <div className="flex flex-col justify-evenly">
              <div className="w-[176px] h-[40px] bg-white rounded"></div>
              <div className="w-[176px] h-[40px] bg-white rounded"></div>
              <div className="w-[176px] h-[40px] bg-white rounded"></div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <WaitTitle text="헬스장을 등록하세요!" />
          <div className="p-0 h-16 flex justify-evenly items-center">
            <FormInput
              type="text"
              value={regiGymCode}
              placeholder="헬스장 번호"
              onChange={handleChangeGymCode}
            />
            <button
              className="py-0 h-10 w-[80px] border-2 border-black"
              onClick={() => registGymMutation.mutate(regiGymCode)}
            >
              등록
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface EquipmentCircleProps {
  equipment: GymEquipments | null;
}

const EquipmentCircle = ({ equipment }: EquipmentCircleProps) => {
  const name =
    equipment === null
      ? ''
      : isNaN(parseInt(equipment.name[equipment.name.length - 1]))
      ? equipment.name
      : equipment.name.slice(0, equipment.name.length - 1);
  return (
    <div className="bg-white w-[84px] h-[84px] m-3 rounded-full flex justify-center items-center">
      {equipment === null ? (
        <span className="text-2xl text-black">?</span>
      ) : (
        <img src={`/img/equipments/${name}.png`} alt={name} width={52} />
      )}
    </div>
  );
};

export default WaitInfoPage;
