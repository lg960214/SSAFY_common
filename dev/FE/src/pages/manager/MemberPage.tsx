import { useState } from 'react';
import { TagTableList } from '@/components/manager/member/TagTableList';
import { TableMenu } from '@/components/manager/member/TableMenu';
import { MemberTableList } from '@/components/manager/member/MemberTableList';
import Modal from '@/components/common/Modal';
import { ApproveContent } from '@/components/manager/member/ApproveContent';

export const MemberPage = () => {
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
      className="flex justify-evenly"
      style={{ height: '900px' }}
    >
      <div className="w-1/2">
        <TableMenu name="태그 현황" />
        <TagTableList />
      </div>
      <div className="w-1/2">
        <TableMenu name="회원 정보" />
        <div className="ml-40 border-2 border-black">
          <input type="text" onInput={handleInputSearchText} />
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
