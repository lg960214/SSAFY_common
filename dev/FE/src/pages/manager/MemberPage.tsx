import { useState } from 'react';
import { TagTableList } from '@/components/manager/member/TagTableList';
import { TableMenu } from '@/components/manager/member/TableMenu';
import { MemberTableList } from '@/components/manager/member/MemberTableList';
import Modal from '@/components/common/Modal';
import { ApproveContent } from '@/components/manager/member/ApproveContent';

const MemberPage = () => {
  const [isApproveModalOpen, setIsApproveModal] = useState(false);
  const [isSearchText, setIsSearchText] = useState('');

  const handleInputSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
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
  return (
    <div
      onClick={closeModal}
      className="flex justify-evenly mx-auto mt-8"
      style={{ height: '900px', width: '1440px' }}
    >
      <div className="w-1/3">
        <TableMenu name="태그 현황" />
        <TagTableList />
      </div>
      <div className="w-2/3">
        <div className="flex justify-between">
          <TableMenu name="회원 정보" />
          <div className="ml-40 float-right border-2 justify-evenly align-middle items-center border-black flex w-64 h-10 rounded-2xl px-3">
            <input
              className="h-6 border-b-2 border-black"
              type="text"
              onInput={handleInputSearchText}
            />
            <img className="w-8" src={`/img/member/loupe.png`} alt="" />
          </div>
        </div>

        <MemberTableList checkText={isSearchText} />
        <div>
          <Modal onClose={closeModal} isOpen={isApproveModalOpen}>
            <ApproveContent />
          </Modal>
          <button onClick={openApproveModal}>승인 요청</button>
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
