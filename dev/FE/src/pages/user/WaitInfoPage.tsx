import Modal from '@/components/common/Modal';
import TimeInput from '@/components/user/waitinfo/TimeInput';
import WaitEquipmentList from '@/components/user/waitinfo/WaitEquipmentList';
import WaitTitle from '@/components/user/waitinfo/WaitTitle';
import { useState, useEffect, ChangeEvent } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getGymEquipments,
  getGymSearch,
  getUsingGymUsers,
} from '@/api/waitInfoApi';
import FormInput from '@/components/common/FormInput';
import { registGym } from '@/api/waitInfoApi';
import { GymEquipments, SearchingData } from '@/types/user.type';
import { useLocation, useNavigate } from 'react-router-dom';
import EquipmentStatus from '@/components/user/waitinfo/EquipmentStatus';
import { setStorage } from '@/utils/storage';

const WaitInfoPage = () => {
  const token = JSON.parse(localStorage.getItem('userToken') as string);
  const [getGymName, setGetGymName] = useState(token.gymName);
  const { data: usingGymUsers } = useQuery(
    ['getUsingGymUsers'],
    getUsingGymUsers,
    { enabled: !!token?.regist },
  );

  const registGymMutation = useMutation(
    (regiGymCode: string) => registGym(regiGymCode),
    {
      onSuccess: (res) => {
        if (res.msg === '존재하지 않는 헬스장입니다.') {
          alert(res.msg);
        } else {
          alert('등록이 완료되었습니다! 헬스장 승인 후에 다시 로그인해주세요.');
          token.gymName = regiGymCode;
          setStorage('userToken', token);
          setGetGymName(regiGymCode);
        }
      },
      onError: () => {},
    },
  );
  const [checkGymApprove, setCheckGymApprove] = useState(false);
  useEffect(() => {
    if (token?.regist === 1) {
      setCheckGymApprove(true);
    }
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const [isModal, setIsModal] = useState(false);
  const handleOpenModal = () => {
    navigate('#modal');
    setIsModal(true);
  };
  const handleCloseModal = () => {
    navigate('#');
    setIsModal(false);
  };
  useEffect(() => {
    if (location.hash !== '#modal' && isModal) {
      setIsModal(false);
    }
  }, [location]);
  const [statusProps, setStatusProps] = useState({
    pickEquipment: '',
    hour: '',
    minute: '',
  });

  const [equipmentStatus, setEquipmentStatus] = useState<boolean>(false);
  // 헬스장 기구정보
  const { data } = useQuery(['getGymEquipments'], getGymEquipments, {
    enabled: !!token?.regist,
  });

  const [searchingData, setSearchingData] = useState<SearchingData>({
    now: 0,
    week: 0,
    week2: 0,
    week3: 0,
  });
  // 헬스장 기구 검색
  const gymSearchMutation = useMutation(
    () =>
      getGymSearch({
        date: `${hour.length == 1 ? '0' + hour : hour}:${
          minute.length == 1 ? '0' + minute : minute
        }`,
        reader: pickEquipment === null ? '' : pickEquipment.reader,
      }),
    {
      onSuccess: (data) => {
        setSearchingData(data);
        setEquipmentStatus(true);
        setStatusProps({
          pickEquipment: pickEquipment.name,
          hour: hour,
          minute: minute,
        });
      },
    },
  );

  const [regiGymCode, setRegiGymCode] = useState<string>('');
  const handleChangeGymCode = (event: ChangeEvent<HTMLInputElement>) => {
    setRegiGymCode(event.target.value);
  };

  const [pickEquipment, setPickEquipment] = useState<GymEquipments>({
    reader: '',
    region: '',
    name: '',
    gymCode: 1234,
  });
  const handleSetPickEquipment = (equipment: GymEquipments) => {
    setPickEquipment(equipment);
  };
  useEffect(handleCloseModal, [pickEquipment]);

  const [hour, setHour] = useState<string>('00');
  const [minute, setMinute] = useState<string>('00');

  useEffect(() => {
    const date = new Date();
    const roundedMinute = Math.ceil(date.getMinutes() / 10) * 10;
    if (roundedMinute === 60) {
      setHour(String((date.getHours() + 1) % 24));
    } else {
      setHour(String(date.getHours()));
    }
    setMinute(String(roundedMinute % 60));
  }, []);

  return (
    <div className="">
      {checkGymApprove ? (
        <div className="mb-[60px]">
          <WaitTitle text={getGymName} />
          <div className="p-4 mb-5">
            <span className="float-right">현재 {usingGymUsers}명 이용중</span>
          </div>
          {isModal && (
            <Modal isOpen={isModal} onClose={handleCloseModal}>
              <WaitEquipmentList
                equiptment={pickEquipment}
                onClose={handleCloseModal}
                equipmentLists={data}
                handlePickEquipment={handleSetPickEquipment}
              />
            </Modal>
          )}
          <div className="bg-zinc-200 py-3 rounded-lg">
            <div className="flex justify-evenly items-center my-4">
              <div className="flex justify-center">
                <div className="flex flex-col justify-center items-center">
                  <EquipmentCircle equipment={pickEquipment} />
                  <span className="w-24 text-center">
                    {pickEquipment?.name}
                  </span>
                </div>
              </div>
              <button
                className="w-[200px] h-[66px] text-xl bg-white"
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
              <button
                onClick={() => {
                  if (pickEquipment.name === '') {
                    alert('기구를 선택해 주세요!');
                  } else {
                    gymSearchMutation.mutate();
                  }
                }}
                className="w-25 h-11 bg-CustomOrange text-white"
              >
                조회
              </button>
            </div>
          </div>
          <div className="mt-4 rounded-lg mx-auto mb-[70px]">
            {equipmentStatus === false ? (
              <div className="text-center h-[120px] bg-zinc-200 p-4 rounded-lg">
                원하는 기구와 시간을 조회해주세요
              </div>
            ) : (
              <EquipmentStatus {...statusProps} searchingData={searchingData} />
            )}
          </div>
        </div>
      ) : (
        <>
          <WaitTitle text="헬스장을 등록하세요!" />
          <div className="p-0 h-16 flex justify-evenly items-center">
            <FormInput
              type="text"
              value={regiGymCode}
              placeholder="헬스장 번호"
              onChange={handleChangeGymCode}
              setValueEmpty={() => setRegiGymCode('')}
            />
            <button
              className="py-0 h-10 w-[80px] bg-CustomOrange text-white"
              onClick={() => {
                if (regiGymCode === '') {
                  alert('헬스장 번호를 입력해 주세요!');
                } else {
                  registGymMutation.mutate(regiGymCode);
                }
              }}
            >
              등록
            </button>
          </div>
          {getGymName && (
            <div>
              <p>헬스장 등록 대기중입니다.</p>
              <p>다른 헬스장을 등록하고 싶으시다면 새로 등록을 해주세요</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

interface EquipmentCircleProps {
  equipment: GymEquipments;
}

const EquipmentCircle = ({ equipment }: EquipmentCircleProps) => {
  const name =
    equipment.name === ''
      ? ''
      : isNaN(parseInt(equipment.name[equipment.name.length - 1]))
      ? equipment.name
      : equipment.name.slice(0, equipment.name.length - 1);
  return (
    <div className="bg-white w-[84px] h-[84px] m-3 rounded-full flex justify-center items-center">
      {equipment.name === '' ? (
        <span className="text-2xl text-black">?</span>
      ) : (
        <img src={`/img/equipments/${name}.png`} alt={name} width={52} />
      )}
    </div>
  );
};

export default WaitInfoPage;
