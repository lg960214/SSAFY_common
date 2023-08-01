import { useState } from 'react';
import { TagTableList } from '@/components/manager/member/TagTableList';
import { MemberTableList } from '@/components/manager/member/MemberTableList';
import Modal from '@/components/common/Modal';
import ApproveContent from '@/components/manager/member/ApproveContent';
import { getUserLists } from '@/api/memberPageApi';
import { useQuery } from '@tanstack/react-query';
import { MemberInfo } from '@/types/member.type';

// 더미 데이터
// import dummy from '@/components/manager/member/dummy.json';

const MemberPage = () => {
  const [isApproveModalOpen, setIsApproveModal] = useState(false);
  const [isSearchText, setIsSearchText] = useState('');

  const handleInputSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearchText(e.target.value);
  };
  const openApproveModal = () => {
    setIsApproveModal(!isApproveModalOpen);
  };

  const closeModal = () => {
    if (isApproveModalOpen) {
      setIsApproveModal(false);
    }
  };

  const { data, status } = useQuery<MemberInfo[]>(
    ['memberLists'],
    getUserLists,
  );

  if (status === 'loading') return <div>로딩중</div>;
  if (status === 'error') return <div>로딩에러</div>;
  if (status === 'success') {
    console.log(data, '완료');
  }

  return (
    <div
      onClick={closeModal}
      className="flex justify-between mx-auto mt-8"
      style={{ height: '830px', width: '1440px' }}
    >
      <div className="w-[404px]">
        <TableMenu name="태그 현황" />
        <TagTableList memberInfoLists={data} />
      </div>
      <div className="w-[908px]">
        <div className="flex justify-between">
          <TableMenu name="회원 정보" />
          <div className="ml-40 float-right border-2 justify-evenly align-middle items-center border-black flex w-80 h-10 rounded-2xl px-3">
            <input
              className="h-6 border-b-2 border-black"
              type="text"
              onInput={handleInputSearchText}
            />
            검색
            <img className="w-8" src={`/img/member/loupe.png`} alt="" />
          </div>
        </div>

        <MemberTableList memberInfoLists={data} checkText={isSearchText} />
        <div>
          <Modal onClose={closeModal} isOpen={isApproveModalOpen}>
            <ApproveContent />
          </Modal>
          <button
            className="mt-2 bg-CustomOrange text-white text-lg float-right"
            onClick={openApproveModal}
          >
            승인 요청
          </button>
        </div>
      </div>
    </div>
  );
};

interface TableMenuProps {
  name: string;
}

const TableMenu = (props: TableMenuProps) => {
  return (
    <div className="w-40 h-24 p-2 bg-CustomOrange -z-10 text-white text-center rounded-2xl text-xl">
      {props.name}
    </div>
  );
};

export default MemberPage;
