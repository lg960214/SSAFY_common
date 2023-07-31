import Modal from '@/components/common/Modal';
import WaitEquitmentList from '@/components/user/waitinfo/WaitEquitmentList';
import WaitTitle from '@/components/user/waitinfo/WaitTitle';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WaitInfoPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [checkGymApprove, setCheckGymApprove] = useState(false);
  const handleGymApproveButton = () => {
    setCheckGymApprove(true);
  };

  const [isModal, setIsModal] = useState(false);
  const handleOpenModal = () => {
    setIsModal(true);
  };
  const handleCloseModal = () => {
    setIsModal(false);
  };

  const [pickEquipment, setPickEquipment] = useState('');
  const handleSetPickEquipment = (equipment: string) => {
    setPickEquipment(equipment);
  };
  useEffect(handleCloseModal, [pickEquipment]);
  return (
    <>
      {checkGymApprove ? (
        <div>
          <div className="m-2">
            <div className="float-left font-bold text-lg">나의 헬스장</div>
            <div className="float-right">현재 20명 이용중</div>
          </div>
          <WaitTitle text="킹콩 피트니스" />
          <div className="flex justify-evenly items-center my-4">
            {isModal && (
              <Modal isOpen={isModal} onClose={handleCloseModal}>
                <WaitEquitmentList
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
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={10}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
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
          <button
            onClick={handleGymApproveButton}
            className="w-10 h-10 rounded-full mx-auto border-2 flex justify-center items-center border-white"
          >
            <span className="text-2xl">+</span>
          </button>
        </div>
      )}
    </>
  );
};

interface EquipmentCircleProps {
  equipment: string;
}

const EquipmentCircle = ({ equipment }: EquipmentCircleProps) => {
  return (
    <div className="bg-white w-[84px] h-[84px] m-3 rounded-full flex justify-center items-center">
      {equipment === '' ? (
        <span className="text-2xl text-black">?</span>
      ) : (
        <img
          src={`/img/equipments/${equipment}.png`}
          alt={equipment}
          width={52}
        />
      )}
    </div>
  );
};

export default WaitInfoPage;
